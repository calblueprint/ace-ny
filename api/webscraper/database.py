import os
from dotenv import load_dotenv
from datetime import datetime
from dateutil import tz
from supabase import create_client, Client
from geocodio import GeocodioClient

from .nyserda_scraper import query_nyserda_large, query_nyserda_solar_repeat
from .nyiso_scraper import (
    filter_nyiso_iq_sheet,
    filter_nyiso_cluster_sheet,
    filter_nyiso_in_service_sheet,
    filter_nyiso_withdrawn_sheets,
)
from .ores_scraper import query_ores_noi, query_ores_under_review, query_ores_permitted
from .utils.scraper_utils import (
    geocode_lat_long,
    create_update_object,
    update_kdm,
    update_last_updated,
)
from .database_constants import (
    initial_kdm,
)

load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env.local"))

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)
supabase_table: str = (
    "Projects_duplicate"  # TODO: modify based on which table in supabase we want to edit
)

geocode_api: str = os.environ.get("NEXT_PUBLIC_GEOCODIO_API_KEY")
geocodio = GeocodioClient(geocode_api)

# constant used for the New York Timezone used when comparing datetime objects
nyt = tz.gettz("America/New_York")

# NOTE: Supabase date objects follow the format YYYY-MM-DD


def nyserda_large_to_database() -> None:
    """
    This function pushes all the projects quered from the NYSERDA large-scale renewable energy projects
    database to the Supabase database.
    First, we check if there is an existing project in the Supabase database with a matching name.
    If so, we only update the project if the new project has newer data.
    Otherwise, we push the new project to the Supabase database.
    In the case that the project is cancelled, we delete the project from the Supabase database.
    """
    database = []
    database.extend(query_nyserda_large()[:10])
    for project in database:
        if project.get("proposed_cod", None) is not None:
            ymd = datetime.strptime(project.get("proposed_cod"), "%Y").strftime(
                "%Y-%m-%d"
            )
            project["proposed_cod"] = ymd
        existing_data = (
            supabase.table(supabase_table)
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[0]
            if (
                existing_project.get("last_updated", {}).get("NYSERDA_large_scale")
                is not None
            ):
                last_nyserda_update = datetime.fromisoformat(
                    existing_project["last_updated"]["NYSERDA_large_scale"]
                )
            else:
                last_nyserda_update = None
            # only update project if new project has newer data
            if (
                last_nyserda_update is None
                or datetime.strptime(
                    project.get("data_through_date"), "%Y-%m-%d"
                ).replace(tzinfo=nyt)
                < last_nyserda_update
            ):
                if (
                    project.get("project_status", None) is None
                    or project.get("project_status", None) == "Cancelled"
                ):
                    # NOTE: not deleting any Cancelled projects for now
                    # # Delete existing projects from the database if they've been cancelled
                    # response = (
                    #     supabase.table(supabase_table)
                    #     .delete()
                    #     .eq("project_name", project["project_name"])
                    #     .execute()
                    # )
                    # print("DELETE", response, "\n")
                    continue
                update_object = create_update_object(existing_project, project)
                if (
                    existing_project["key_development_milestones"] is None
                    or len(existing_project["key_development_milestones"]) < 0
                ):
                    update_object["key_development_milestones"] = initial_kdm
                else:
                    update_object["key_development_milestones"] = existing_project[
                        "key_development_milestones"
                    ]
                # update key development milestones
                update_object["key_development_milestones"] = update_kdm(
                    "Winning a contract award from NYSERDA",
                    date=(
                        datetime.strptime(
                            project.get("nyserda_contract_date"), "%Y-%m-%d"
                        ).isoformat()
                        if project.get("nyserda_contract_date", None)
                        else None
                    ),
                    completed=True,
                    kdm=update_object["key_development_milestones"],
                )
                # delete nyserda_contract_date used for KDMs before pushing to Supabase
                if "nyserda_contract_date" in project:
                    del project["nyserda_contract_date"]
                # if project status is operational, also update "Start of operations" key development milestone
                update_object["key_development_milestones"] = update_kdm(
                    "Start of operations",
                    date=project.get("proposed_cod"),
                    completed=True,
                    kdm=update_object["key_development_milestones"],
                )
                # set last updated for NYSERDA field to current date/time in est
                # datestring will be in the format "YYYYMMDDTHH:MM:SS.SSSZ"
                update_object["last_updated"] = update_last_updated(
                    "NYSERDA_large_scale",
                    datetime.now(tz=nyt),
                    existing_project.get("last_updated", {}),
                )
                # delete data_through_date before pushing to supabase
                if "data_through_date" in project:
                    del project["data_through_date"]
                try:
                    response = (
                        supabase.table(supabase_table)
                        .update(update_object)
                        .eq("project_name", project["project_name"])
                        .execute()
                    )
                    print("UPDATE", response, "\n")
                except Exception as exception:
                    print(exception)
            # print statement in case project does not have newer data than what the database already has
            else:
                print(
                    f"No updates since last update on {last_nyserda_update} for {project["project_name"]}"
                )
        else:
            # skip any projects that have been cancelled
            if (
                project.get("project_status", None) is None
                or project.get("project_status", None) == "Cancelled"
            ):
                continue
            if (project.get("latitude", None) is not None) and (
                project.get("longitude", None) is not None
            ):
                # reverse geocode for town, senate district, and assmebly district based on latitude and longitude
                geocodio_result = geocodio.reverse(
                    (project.get("latitude"), project.get("longitude")),
                    fields=["stateleg"],
                ).get("results", None)
                if geocodio_result is not None:
                    location = geocodio_result[0]
                    state_senate_district = int(
                        location["fields"]["state_legislative_districts"]["senate"][0][
                            "district_number"
                        ]
                    )
                    assembly_district = int(
                        location["fields"]["state_legislative_districts"]["house"][0][
                            "district_number"
                        ]
                    )
                    town = location["address_components"]["city"]

                    project["state_senate_district"] = state_senate_district
                    project["assembly_district"] = assembly_district
                    project["town"] = town

            # append key development milestones
            project["key_development_milestones"] = update_kdm(
                "Winning a contract award from NYSERDA",
                date=project.get(
                    "nyserda_contract_date", None
                ),  # small-scale solar projects don't have anything for this yet
                completed=True,
                kdm=initial_kdm,
            )
            # delete nyserda_contract_date used for updating KDMs before pushing to Supabase
            if "nyserda_contract_date" in project:
                del project["nyserda_contract_date"]

            # mark when this project was last updated with NYSERDA data
            project["last_updated"] = update_last_updated(
                "NYSERDA_large_scale", datetime.now(tz=nyt), {}
            )
            # delete data_through_date before pushing to supabase
            if "data_through_date" in project:
                del project["data_through_date"]
            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def nyserda_solar_to_database() -> None:
    """
    This function pushes all the projects quered from the NYSERDA small-scale solar projects
    database to the Supabase database.
    First, we check if there is an existing project in the Supabase database with a matching name.
    If so, we only update the project if the new project has newer data.
    Otherwise, we push the new project to the Supabase database.
    """
    database = []
    database.extend(query_nyserda_solar_repeat())
    for project in database:
        if project.get("proposed_cod", None) is not None:
            ymd = datetime.fromisoformat(project.get("proposed_cod")).strftime(
                "%Y-%m-%d"
            )
            project["proposed_cod"] = ymd
        existing_data = (
            supabase.table(supabase_table)
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[0]
            if (
                existing_project.get("last_updated", {}).get("NYSERDA_solar")
                is not None
            ):
                # get the last time this project was updated by turning the string into a datetime object
                last_nyserda_solar_update = datetime.fromisoformat(
                    existing_project["last_updated"]["NYSERDA_solar"]
                )
            else:
                last_nyserda_solar_update = None
                # only update project if new project has newer data
            if (
                last_nyserda_solar_update is None
                or datetime.strptime(
                    project.get("data_through_date"), "%Y-%m-%d"
                ).replace(tzinfo=nyt)
                < last_nyserda_solar_update
            ):
                update_object = create_update_object(existing_project, project)
                if (
                    existing_project["key_development_milestones"] is None
                    or len(existing_project["key_development_milestones"]) < 0
                ):
                    update_object["key_development_milestones"] = initial_kdm
                else:
                    update_object["key_development_milestones"] = existing_project[
                        "key_development_milestones"
                    ]
                # update key development milestones
                update_object["key_development_milestones"] = update_kdm(
                    "Winning a contract award from NYSERDA",
                    date=None,
                    completed=True,
                    kdm=update_object["key_development_milestones"],
                )
                # set last updated for NYSERDA field to current date/time in est
                # datestring will be in the format "YYYYMMDDTHH:MM:SS.SSSZ"
                update_object["last_updated"] = update_last_updated(
                    "NYSERDA_solar",
                    datetime.now(tz=nyt),
                    existing_project.get("last_updated", {}),
                )
                # delete data_through_date before pushing to supabase
                if "data_through_date" in project:
                    del project["data_through_date"]
                try:
                    response = (
                        supabase.table(supabase_table)
                        .update(project)
                        .eq("project_name", project["project_name"])
                        .execute()
                    )
                    print("UPDATE", response, "\n")
                except Exception as exception:
                    print(exception)
            # print statement in case project does not have newer data than what the database already has
            else:
                print(
                    f"No updates since last update on {last_nyserda_solar_update} for {project["project_name"]}"
                )
        else:
            # reverse geocoding for latitude and longitude
            if project.get("town", None) is not None:
                lat, long = geocode_lat_long(f"{project['town']}, NY")
            if lat is not None and long is not None:
                project["latitude"] = lat
                project["longitude"] = long
                geocodio_result = geocodio.reverse(
                    (project.get("latitude"), project.get("longitude")),
                    fields=["stateleg"],
                ).get("results", None)
                if geocodio_result is not None:
                    location = geocodio_result[0]
                    state_senate_district = int(
                        location["fields"]["state_legislative_districts"]["senate"][0][
                            "district_number"
                        ]
                    )
                    assembly_district = int(
                        location["fields"]["state_legislative_districts"]["house"][0][
                            "district_number"
                        ]
                    )
                    town = location["address_components"]["city"]

                    project["state_senate_district"] = state_senate_district
                    project["assembly_district"] = assembly_district
                    project["town"] = town

            # update key development milestones
            project["key_development_milestones"] = update_kdm(
                "Winning a contract award from NYSERDA",
                date=None,
                completed=True,
                kdm=project["key_development_milestones"],
            )
            # mark when this project was last updated with NYSERDA data
            project["last_updated"] = update_last_updated(
                "NYSERDA_solar", datetime.now(tz=nyt), {}
            )
            # delete data_through_date before pushing to supabase
            if "data_through_date" in project:
                del project["data_through_date"]
            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def nyiso_to_database() -> None:
    """
    This function takes the data from the NYISO website and pushes it to Supabase.
    The helper function first checks if an existing project with a matching name exists in Supabase.
    If so, the existing project is updated if it has newer data (or if any of the last_updated date information is missing).
    Otherwise, the new project is pushed to Supabase.
    This helper function is called for all three sheets in the NYISO xlsx spreadsheet: Interconnection Queue, Cluster Projects, and In Service
    """

    # helper function to handle different actions based on which sheet the data is from
    def nyiso_to_database_helper(projects, sheet_name):
        for project in projects:
            # turns the proposed_cod Datetime objects in datetime strings
            if project.get("proposed_cod", None) is not None:
                try:
                    ymd = datetime.strptime(
                        project.get("proposed_cod"), "%m-%Y"
                    ).strftime("%Y-%m-%d")
                except Exception as exception:
                    ymd = datetime.strptime(
                        project.get("proposed_cod"), "%m/%Y"
                    ).strftime("%Y-%m-%d")
                except Exception as exception:
                    print(exception)
                project["proposed_cod"] = ymd

            existing_data = (
                supabase.table(supabase_table)
                .select("*")
                .eq(
                    "interconnection_queue_number",
                    project["interconnection_queue_number"],
                )
                .execute()
            )
            if len(existing_data.data) > 0:
                existing_project = existing_data.data[0]
                if existing_project.get("last_updated", {}).get("NYISO") is not None:
                    last_nyiso_update = datetime.fromisoformat(
                        existing_project["last_updated"]["NYISO"]
                    )
                else:
                    last_nyiso_update = None
                if (
                    last_nyiso_update is None
                    or project.get("nyiso_last_updated", None) is None
                    or project.get("nyiso_last_updated")
                    .to_pydatetime()
                    .replace(tzinfo=nyt)
                    > last_nyiso_update
                ):
                    # delete nyiso_last_updated Timestamp object
                    if "nyiso_last_updated" in project:
                        del project["nyiso_last_updated"]
                    # This helper function creates a dict of only fields that the existing project is missing
                    # but the NYISO data has
                    update_object = create_update_object(existing_project, project)
                    if (
                        existing_project["key_development_milestones"] is None
                        or len(existing_project["key_development_milestones"]) < 0
                    ):
                        update_object["key_development_milestones"] = initial_kdm
                    else:
                        update_object["key_development_milestones"] = existing_project[
                            "key_development_milestones"
                        ]

                    # updating key development milestones
                    if project.get("date_of_ir", None) is not None:
                        entry_date = project.get("date_of_ir")
                        entry_date = entry_date.strftime("%Y-%m-%d")
                        update_object["key_development_milestones"] = update_kdm(
                            milestoneTitle="Entry to NYISO Queue",
                            completed=True,
                            date=entry_date,
                            kdm=update_object["key_development_milestones"],
                        )
                    if project.get("ia_tender_date", None) is not None:
                        ia_date = project.get("ia_tender_date")
                        current_date = datetime.now()
                        completed = ia_date < current_date
                        ia_date = ia_date.strftime("%Y-%m-%d")
                        update_object["key_development_milestones"] = update_kdm(
                            milestoneTitle="Tendering of an Interconnection Agreement (IA)",
                            completed=completed,
                            date=ia_date,
                            kdm=update_object["key_development_milestones"],
                        )
                    if sheet_name == "In Service":
                        update_object["key_development_milestones"] = update_kdm(
                            milestoneTitle="Start of operations",
                            date=None,
                            completed=True,
                            kdm=update_object["key_development_milestones"],
                        )
                    project["last_updated"] = update_last_updated(
                        "NYISO",
                        datetime.now(tz=nyt),
                        existing_project.get("last_updated", {}),
                    )
                    try:
                        response = (
                            supabase.table(supabase_table)
                            .update(update_object)
                            .eq(
                                "interconnection_queue_number",
                                project["interconnection_queue_number"],
                            )
                            .execute()
                        )
                        print("UPDATE", response, "\n")
                    except Exception as exception:
                        print(exception)
                else:
                    print(
                        f"No updates since last update on {last_nyiso_update} for {project["project_name"]}"
                    )
            else:
                # appending key development milestones
                project["key_development_milestones"] = initial_kdm
                if project.get("date_of_ir", None) is not None:
                    entry_date = project.get("date_of_ir")
                    entry_date = entry_date.strftime("%Y-%m-%d")
                    project["key_development_milestones"] = update_kdm(
                        milestoneTitle="Entry to NYISO Queue",
                        completed=True,
                        date=entry_date,
                        kdm=project["key_development_milestones"],
                    )
                if project.get("ia_tender_date", None) is not None:
                    ia_date = project.get("ia_tender_date")
                    current_date = datetime.now()
                    completed = ia_date < current_date
                    ia_date = ia_date.strftime("%Y-%m-%d")
                    project["key_development_milestones"] = update_kdm(
                        milestoneTitle="Tendering of an Interconnection Agreement (IA)",
                        completed=completed,
                        date=ia_date,
                        kdm=project["key_development_milestones"],
                    )
                if "date_of_ir" in project:
                    del project["date_of_ir"]
                if "ia_tender_date" in project:
                    del project["ia_tender_date"]
                if "nyiso_last_updated" in project:
                    del project["nyiso_last_updated"]
                # update last_updated field of project to be current time before pushing
                project["last_updated"] = update_last_updated(
                    "NYISO",
                    datetime.now(tz=nyt),
                    project.get("last_updated", {}),
                )
                try:
                    response = supabase.table(supabase_table).insert(project).execute()
                    print("INSERT", response, "\n")
                except Exception as exception:
                    print(exception)

    # call helper function for each sheet with the corresponding sheet name
    nyiso_to_database_helper(filter_nyiso_iq_sheet()[:10], "Interconnection Queue")
    nyiso_to_database_helper(filter_nyiso_cluster_sheet()[:10], "Cluster Projects")
    nyiso_to_database_helper(filter_nyiso_in_service_sheet()[:10], "In Service")


# NOTE: currently commenting out function to delete withdrawn projects for now
# def check_withdrawn_nyiso_in_database() -> None:
#     """
#     This function uses projects queried from the Withdrawn and Cluster Projects-Withdrawn sheet of NYISO
#     to delete any currently stored projects in the databasethat have been withdrawn.
#     """
#     withdrawn_projects = filter_nyiso_withdrawn_sheets()
#     for project in withdrawn_projects:
#         existing_data = (
#             supabase.table(supabase_table)
#             .select("*")
#             .eq("project_name", project["project_name"])
#             .execute()
#         )
#         if len(existing_data.data) > 0:
#             try:
#                 response = (
#                     supabase.table(supabase_table)
#                     .delete()
#                     .eq("project_name", project["project_name"])
#                     .execute()
#                 )
#                 print("DELETE", response, "\n")
#             except Exception as exception:
#                 print(exception)


def ores_noi_to_database():
    database = []
    database.extend(query_ores_noi())
    for project in database:
        existing_data = (
            supabase.table(supabase_table)
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[
                0
            ]  # NOTE: ORES data does not have a data_through_date kind of field
            update_object = create_update_object(existing_project, project)

            # update last_updated field of project to be current time before pushing
            project["last_updated"] = update_last_updated(
                "ORES",
                datetime.now(tz=nyt),
                existing_project.get("last_updated", {}),
            )
            try:
                response = (
                    supabase.table(supabase_table)
                    .update(update_object)
                    .eq(
                        "project_name",
                        project["project_name"],
                    )
                    .execute()
                )
                print("UPDATE", response, "\n")
            except Exception as exception:
                print(exception)
        else:
            if project.get("town", None) is not None:
                lat, long = geocode_lat_long(f"{project['town']}, NY")
                project["latitude"] = lat
                project["longitude"] = long

            # update last_updated field of project to be current time before pushing
            project["last_updated"] = update_last_updated(
                "ORES",
                datetime.now(tz=nyt),
                project.get("last_updated", {}),
            )
            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def ores_under_review_to_database() -> None:
    database = []
    database.extend(query_ores_under_review())
    for project in database:
        existing_data = (
            supabase.table(supabase_table)
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[
                0
            ]  # NOTE: ORES data does not have a data_through_date kind of field
            update_object = create_update_object(existing_project, project)
            # if the existing project has no kdms, add the dict first
            if (
                existing_project["key_development_milestones"] is None
                or len(existing_project["key_development_milestones"]) < 0
            ):
                update_object["key_development_milestones"] = initial_kdm
            else:
                update_object["key_development_milestones"] = existing_project[
                    "key_development_milestones"
                ]

            # update kdm for ores projects under review
            update_object["key_development_milestones"] = update_kdm(
                milestoneTitle="Application for permit to ORES",
                completed=True,
                date=None,
                kdm=update_object["key_development_milestones"],
            )

            # update last_updated field of project to be current time before pushing
            project["last_updated"] = update_last_updated(
                "ORES",
                datetime.now(tz=nyt),
                existing_project.get("last_updated", {}),
            )
            try:
                response = (
                    supabase.table(supabase_table)
                    .update(update_object)
                    .eq(
                        "project_name",
                        project["project_name"],
                    )
                    .execute()
                )
                print("UPDATE", response, "\n")
            except Exception as exception:
                print(exception)
        else:
            if project.get("town", None) is not None:
                lat, long = geocode_lat_long(f"{project['town']}, NY")
                project["latitude"] = lat
                project["longitude"] = long

            project["key_development_milestones"] = update_kdm(
                milestoneTitle="Application for permit to ORES",
                completed=True,
                date=None,
                kdm=project["key_development_milestones"],
            )

            # update last_updated field of project to be current time before pushing
            project["last_updated"] = update_last_updated(
                "ORES",
                datetime.now(tz=nyt),
                project.get("last_updated", {}),
            )
            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def ores_permitted_to_database() -> None:
    database = []
    database.extend(query_ores_permitted())
    for project in database:
        existing_data = (
            supabase.table(supabase_table)
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[
                0
            ]  # NOTE: ORES data does not have a data_through_date kind of field
            update_object = create_update_object(existing_project, project)
            # if the existing project has no kdms, add the dict first
            if (
                existing_project["key_development_milestones"] is None
                or len(existing_project["key_development_milestones"]) < 0
            ):
                update_object["key_development_milestones"] = initial_kdm
            else:
                update_object["key_development_milestones"] = existing_project[
                    "key_development_milestones"
                ]

            # update kdm for ores projects under review
            update_object["key_development_milestones"] = update_kdm(
                milestoneTitle="Issuance of permit from ORES",
                completed=True,
                date=None,
                kdm=update_object["key_development_milestones"],
            )

            # update last_updated field of project to be current time before pushing
            project["last_updated"] = update_last_updated(
                "ORES",
                datetime.now(tz=nyt),
                existing_project.get("last_updated", {}),
            )
            try:
                response = (
                    supabase.table(supabase_table)
                    .update(update_object)
                    .eq(
                        "project_name",
                        project["project_name"],
                    )
                    .execute()
                )
                print("UPDATE", response, "\n")
            except Exception as exception:
                print(exception)
        else:
            if project.get("town", None) is not None:
                lat, long = geocode_lat_long(f"{project['town']}, NY")
                project["latitude"] = lat
                project["longitude"] = long

            project["key_development_milestones"] = update_kdm(
                milestoneTitle="Issuance of permit from ORES",
                completed=True,
                date=None,
                kdm=project["key_development_milestones"],
            )

            # update last_updated field of project to be current time before pushing
            project["last_updated"] = update_last_updated(
                "ORES",
                datetime.now(tz=nyt),
                project.get("last_updated", {}),
            )
            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


"""
For testing
"""
# nyserda_large_to_database()
# nyserda_solar_to_database()
# nyiso_to_database()
# ores_noi_to_database()
# ores_under_review_to_database()
# ores_permitted_to_database()
# check_withdrawn_nyiso_in_database()
