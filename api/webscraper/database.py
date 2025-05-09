import os
import copy
from dotenv import load_dotenv
from datetime import datetime, timezone
from supabase import create_client, Client
from geocodio import GeocodioClient

from .nyserda_scraper import query_nyserda_large, query_nyserda_solar_repeat
from .nyiso_scraper import (
    # filter_nyiso_iq_sheet, ** NO LONGER NEEDED **
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
    find_keyword,
    combine_projects,
    pass_all_kdms,
)
from .database_constants import (
    initial_kdm,
)

load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env.local"))

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)
supabase_table: str = (
    "Projects_test_deena_1"  # TODO: modify based on which table in supabase we want to edit
)

geocode_api: str = os.environ.get("NEXT_PUBLIC_GEOCODIO_API_KEY")
geocodio = GeocodioClient(geocode_api)

# constant used for the New York Timezone used when comparing datetime objects
nyt = timezone(datetime.now(timezone.utc).astimezone().utcoffset())

# NOTE: Supabase date objects follow the format YYYY-MM-DD


def offset_lat_long(lat, long):
    """
    params: lat and long are floats representing the latitude and longitude of a project
    If the project does not have a defined latitude or longitude yet, return None
    Checks if there is a project within 0.005 degrees of the latitude and longitude and offsets the latitude and longitude if it overlaps with other projects
    returns: newly offset latitude and longitude
    """
    if lat is None or long is None:
        return (None, None)
    overlapping_projects = (
        supabase.table(supabase_table)
        .select("*")
        .lte("latitude", float(lat) + 0.005)
        .gte("latitude", float(lat) - 0.005)
        .lte("longitude", float(lat) + 0.005)
        .gte("longitude", float(lat) - 0.005)
        .execute()
    )
    while len(overlapping_projects.data) > 0:
        # casting in case lat and long aren't floats yet
        lat = float(lat) + 0.01  # offset latitude and longitude by about 1111 meters
        long = float(long) + 0.01
        overlapping_projects = (
            supabase.table(supabase_table)
            .select("*")
            .lte("latitude", float(lat) + 0.005)
            .gte("latitude", float(lat) - 0.005)
            .lte("longitude", float(lat) + 0.005)
            .gte("longitude", float(lat) - 0.005)
            .execute()
        )
    return lat, long


def nyserda_large_to_database() -> dict:
    """
    This function pushes all the projects quered from the NYSERDA large-scale renewable energy projects
    database to the Supabase database.
    First, we check if there is an existing project in the Supabase database with a matching name.
    If so, we only update the project if the new project has newer data.
    Otherwise, we push the new project to the Supabase database.
    In the case that the project is cancelled, we delete the project from the Supabase database.
    """
    updated_ids = set()
    inserted_ids = set()
    database = []
    database.extend(query_nyserda_large())  # TODO: update slice for testing
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
                existing_project.get("last_updated", {}).get(
                    "NYSERDA_large_scale", None
                )
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
                update_object = create_update_object(
                    existing_project, project, "NYSERDA"
                )
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
                # if project status is operational, mark all other kdms as completed
                update_object["key_development_milestones"] = pass_all_kdms(
                    update_object["key_development_milestones"]
                )
                # set last updated for NYSERDA field to current date/time in est
                # datestring will be in the format "YYYYMMDDTHH:MM:SS.SSSZ"
                update_object["last_updated"] = update_last_updated(
                    "NYSERDA_large_scale",
                    datetime.now(tz=nyt),
                    existing_project.get("last_updated", {}),
                )
                if "id" in update_object:
                    del update_object["id"]

                # update last_updated_display field to reflect when when the webscraper last ran
                update_object["last_updated_display"] = datetime.now(tz=nyt).strftime(
                    "%Y-%m-%dT%H:%M:%S.%f%z"
                )
                try:
                    response = (
                        supabase.table(supabase_table)
                        .update(update_object)
                        .eq("project_name", project["project_name"])
                        .execute()
                    )
                    print("UPDATE", response, "\n")
                    updated_ids.add(response.data[0]["id"])
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
                    project["town"] = [town] if town else None

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
            # because the data_through_date field doesn't exist in supabase schema, first delete data_through_date before pushing to supabase
            if "data_through_date" in project:
                del project["data_through_date"]

            # offset latitude and longitude to avoid overlaps
            project["latitude"], project["longitude"] = offset_lat_long(
                project.get("latitude", None), project.get("longitude", None)
            )

            # update last_updated_display field to reflect when when the webscraper last ran
            project["last_updated_display"] = datetime.now(tz=nyt).strftime(
                "%Y-%m-%dT%H:%M:%S.%f%z"
            )

            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
                inserted_ids.add(response.data[0]["id"])
            except Exception as exception:
                print(exception)
    return {"updated_ids": updated_ids, "inserted_ids": inserted_ids}


def nyserda_solar_to_database() -> dict:
    """
    This function pushes all the projects quered from the NYSERDA small-scale solar projects
    database to the Supabase database.
    First, we check if there is an existing project in the Supabase database with a matching name.
    If so, we only update the project if the new project has newer data.
    Otherwise, we push the new project to the Supabase database.
    """
    updated_ids = set()
    inserted_ids = set()
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
                existing_project.get("last_updated", {}).get("NYSERDA_solar", None)
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
                update_object = create_update_object(
                    existing_project, project, "NYSERDA"
                )
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
                if "id" in update_object:
                    del update_object["id"]
                if "data_through_date" in update_object:
                    del update_object["data_through_date"]
                # update last_updated_display field to reflect when when the webscraper last ran
                update_object["last_updated_display"] = datetime.now(tz=nyt).strftime(
                    "%Y-%m-%dT%H:%M:%S.%f%z"
                )
                try:
                    response = (
                        supabase.table(supabase_table)
                        .update(project)
                        .eq("project_name", project["project_name"])
                        .execute()
                    )
                    print("UPDATE", response, "\n")
                    updated_ids.add(response.data[0]["id"])
                except Exception as exception:
                    print(exception)
            # print statement in case project does not have newer data than what the database already has
            else:
                print(
                    f"No updates since last update on {last_nyserda_solar_update} for {project["project_name"]}"
                )
        else:
            # reverse geocoding for latitude and longitude
            if len(project.get("town", [])) > 0:
                lat, long = geocode_lat_long(f"{project['town'][0]}, NY")
            if lat is not None and long is not None:
                project["latitude"] = lat
                project["longitude"] = long
                try:
                    geocodio_result = geocodio.reverse(
                        (project.get("latitude"), project.get("longitude")),
                        fields=["stateleg"],
                    ).get("results", None)
                except Exception as exception:
                    print(exception)
                    geocodio_result = None
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
                    project["town"] = [town] if town else None

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
            # because the data_through_date field doesn't exist in supabase schema, first delete data_through_date before pushing to supabase
            if "data_through_date" in project:
                del project["data_through_date"]

            # offset latitude and longitude to avoid overlaps
            project["latitude"], project["longitude"] = offset_lat_long(
                project.get("latitude", None), project.get("longitude", None)
            )

            # update last_updated_display field to reflect when when the webscraper last ran
            project["last_updated_display"] = datetime.now(tz=nyt).strftime(
                "%Y-%m-%dT%H:%M:%S.%f%z"
            )
            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
                inserted_ids.add(response.data[0]["id"])
            except Exception as exception:
                print(exception)
    return {"updated_ids": updated_ids, "inserted_ids": inserted_ids}


def nyiso_to_database() -> dict:
    """
    This function takes the data from the NYISO website and pushes it to Supabase.
    The helper function first checks if an existing project with a matching name exists in Supabase.
    If so, the existing project is updated if it has newer data (or if any of the last_updated date information is missing).
    Otherwise, the new project is pushed to Supabase.
    This helper function is called for two sheets in the NYISO xlsx spreadsheet: Cluster Projects and In Service
    """
    updated_ids = set()
    inserted_ids = set()

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
                if (
                    existing_project.get("last_updated", {}).get("NYISO", None)
                    is not None
                ):
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
                    update_object = create_update_object(
                        existing_project, project, "NYISO"
                    )
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
                        # if project status is operational, mark all other kdms as completed
                        update_object["key_development_milestones"] = pass_all_kdms(
                            update_object["key_development_milestones"]
                        )
                    update_object["last_updated"] = update_last_updated(
                        "NYISO",
                        datetime.now(tz=nyt),
                        existing_project.get("last_updated", {}),
                    )
                    # delete project id primary key before pushing to supabase
                    if "id" in update_object:
                        del update_object["id"]
                    # update last_updated_display field to reflect when when the webscraper last ran
                    update_object["last_updated_display"] = datetime.now(
                        tz=nyt
                    ).strftime("%Y-%m-%dT%H:%M:%S.%f%z")
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
                        updated_ids.add(response.data[0]["id"])
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

                # offset latitude and longitude to avoid overlaps
                project["latitude"], project["longitude"] = offset_lat_long(
                    project.get("latitude", None), project.get("longitude", None)
                )

                # update last_updated_display field to reflect when when the webscraper last ran
                project["last_updated_display"] = datetime.now(tz=nyt).strftime(
                    "%Y-%m-%dT%H:%M:%S.%f%z"
                )
                try:
                    response = supabase.table(supabase_table).insert(project).execute()
                    print("INSERT", response, "\n")
                    inserted_ids.add(response.data[0]["id"])
                except Exception as exception:
                    print(exception)

    # TODO: update slicing for testing vs development
    # call helper function for each sheet with the corresponding sheet name
    # nyiso_to_database_helper(filter_nyiso_iq_sheet(), "Interconnection Queue") ** NO LONGER NEEDED **
    nyiso_to_database_helper(filter_nyiso_cluster_sheet(), "Cluster Projects")
    nyiso_to_database_helper(filter_nyiso_in_service_sheet(), "In Service")

    return {"updated_ids": updated_ids, "inserted_ids": inserted_ids}


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
    updated_ids = set()
    inserted_ids = set()
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
            update_object = create_update_object(existing_project, project, "ORES")

            # update last_updated field of project to be current time before pushing
            project["last_updated"] = update_last_updated(
                "ORES",
                datetime.now(tz=nyt),
                existing_project.get("last_updated", {}),
            )
            if "id" in update_object:
                del update_object["id"]
            # update last_updated_display field to reflect when when the webscraper last ran
            update_object["last_updated_display"] = datetime.now(tz=nyt).strftime(
                "%Y-%m-%dT%H:%M:%S.%f%z"
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
                updated_ids.add(response.data[0]["id"])
            except Exception as exception:
                print(exception)
        else:
            if len(project.get("town", [])) > 0:
                lat, long = geocode_lat_long(f"{project['town'][0]}, NY")
                project["latitude"] = lat
                project["longitude"] = long

            # update last_updated field of project to be current time before pushing
            project["last_updated"] = update_last_updated(
                "ORES",
                datetime.now(tz=nyt),
                project.get("last_updated", {}),
            )

            # offset latitude and longitude to avoid overlaps
            project["latitude"], project["longitude"] = offset_lat_long(
                project.get("latitude", None), project.get("longitude", None)
            )

            # update last_updated_display field to reflect when when the webscraper last ran
            project["last_updated_display"] = datetime.now(tz=nyt).strftime(
                "%Y-%m-%dT%H:%M:%S.%f%z"
            )
            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
                inserted_ids.add(response.data[0]["id"])
            except Exception as exception:
                print(exception)
    return {"updated_ids": updated_ids, "inserted_ids": inserted_ids}


def ores_under_review_to_database() -> dict:
    updated_ids = set()
    inserted_ids = set()
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
            update_object = create_update_object(existing_project, project, "ORES")
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
            if "id" in update_object:
                del update_object["id"]
            # update last_updated_display field to reflect when when the webscraper last ran
            update_object["last_updated_display"] = datetime.now(tz=nyt).strftime(
                "%Y-%m-%dT%H:%M:%S.%f%z"
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
                updated_ids.add(response.data[0]["id"])
            except Exception as exception:
                print(exception)
        else:
            if len(project.get("town", [])) > 0:
                lat, long = geocode_lat_long(f"{project['town'][0]}, NY")
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

            # offset latitude and longitude to avoid overlaps
            project["latitude"], project["longitude"] = offset_lat_long(
                project.get("latitude", None), project.get("longitude", None)
            )

            # update last_updated_display field to reflect when when the webscraper last ran
            project["last_updated_display"] = datetime.now(tz=nyt).strftime(
                "%Y-%m-%dT%H:%M:%S.%f%z"
            )
            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
                inserted_ids.add(response.data[0]["id"])
            except Exception as exception:
                print(exception)
    return {"inserted_ids": inserted_ids, "updated_ids": updated_ids}


def ores_permitted_to_database() -> dict:
    updated_ids = set()
    inserted_ids = set()
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
            update_object = create_update_object(existing_project, project, "ORES")
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
            if "id" in update_object:
                del update_object["id"]
            # update last_updated_display field to reflect when when the webscraper last ran
            update_object["last_updated_display"] = datetime.now(tz=nyt).strftime(
                "%Y-%m-%dT%H:%M:%S.%f%z"
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
                updated_ids.add(response.data[0]["id"])
            except Exception as exception:
                print(exception)
        else:
            if len(project.get("town", [])) > 0:
                lat, long = geocode_lat_long(f"{project['town'][0]}, NY")
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

            # offset latitude and longitude to avoid overlaps
            project["latitude"], project["longitude"] = offset_lat_long(
                project.get("latitude", None), project.get("longitude", None)
            )

            # update last_updated_display field to reflect when when the webscraper last ran
            project["last_updated_display"] = datetime.now(tz=nyt).strftime(
                "%Y-%m-%dT%H:%M:%S.%f%z"
            )
            try:
                response = supabase.table(supabase_table).insert(project).execute()
                print("INSERT", response, "\n")
                inserted_ids.add(response.data[0]["id"])
            except Exception as exception:
                print(exception)
    return {"updated_ids": updated_ids, "inserted_ids": inserted_ids}


def merge_projects():
    """
    This function finds all duplicate projects and merges them together.
    It identifies duplicate projects by looking for keywords in the project name (any part of the name before numbers, asterisks, or energy technology labels).
    Next, it creates an update object that aggregates all information fields and kdms.
    The update object adds together the sizes of any matching duplicate projects.
    Any duplicate projects that get processed are added to a list of duplicates to delete so that the function doesn't reprocess them.
    At the end, the function deletes any duplicates from the database.
    """
    all_projects = supabase.table(supabase_table).select("*").execute().data
    duplicates_to_delete = []  # list of ids of duplicate projects to delete

    for project in all_projects:
        if project["id"] in duplicates_to_delete:
            continue  # skip any duplicate projects that have already been processed and marked for deletion
        if project.get("last_updated", {}).get("NYSERDA_solar", None) is not None:
            continue  # skip looking for keywords in project names for NYSERDA solar projects because their names are their project_ids from the data source
        else:
            update = copy.deepcopy(project)
            keyword = find_keyword(project["project_name"])
            # find all duplicate projects
            matching_projects = (
                supabase.table(supabase_table)
                .select("*")
                .ilike("project_name", f"%{keyword}%")
                .execute()
                .data
            )
            if len(matching_projects) <= 1:
                continue

            # process each duplicate project
            for matching_project in matching_projects:

                # skip matching project if it is the same as the current project
                if matching_project["id"] == project["id"]:
                    continue

                # otherwise, combine fields of current project with duplicate's data
                update = combine_projects(update, matching_project)

                # add sizes of duplicate projects together
                if (
                    update.get("size", None) is not None
                    and matching_project.get("size", None) is not None
                ):
                    update["size"] = float(update["size"]) + float(
                        matching_project["size"]
                    )

                # update kdm to include all milestones collected by all matching projects
                for milestone in matching_project.get("key_development_milestones", []):
                    if milestone["completed"]:
                        update["key_development_milestones"] = update_kdm(
                            milestoneTitle=milestone["milestoneTitle"],
                            completed=milestone["completed"],
                            date=milestone["date"],
                            kdm=update["key_development_milestones"],
                        )
                # mark the current duplicate for deletion
                duplicates_to_delete.append(matching_project["id"])

            start_of_operations = [
                milestone
                for milestone in update["key_development_milestones"]
                if milestone["milestoneTitle"] == "Start of operations"
            ][0]
            if start_of_operations.get(
                "completed", False
            ):  # if start of operations is True, mark all other milestones as True
                update["key_development_milestones"] = pass_all_kdms(
                    update["key_development_milestones"]
                )

            # delete id from update object because supabase uses id as the primary key
            del update["id"]
            # update data pushed to Supabase to include the first project name
            update["project_name"] = project["project_name"]
            # update last_updated_display field to reflect when when the webscraper last ran
            update["last_updated_display"] = datetime.now(tz=nyt).strftime(
                "%Y-%m-%dT%H:%M:%S.%f%z"
            )
            try:
                response = (
                    supabase.table(supabase_table)
                    .update(update)
                    .eq(
                        "project_name",
                        project["project_name"],
                    )
                    .execute()
                )
                print("UPDATE", response, "\n")
            except Exception as exception:
                print(exception)

    # after merging all duplicates, delete any duplicate projects from database
    for duplicate_id in duplicates_to_delete:
        try:
            response = (
                supabase.table(supabase_table).delete().eq("id", duplicate_id).execute()
            )
            print("DELETE", response, "\n")
        except Exception as exception:
            print(exception)
    return {"deleted_ids": set(duplicates_to_delete)}


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
