import json
import os
import pandas as pd
from datetime import datetime
from supabase import create_client, Client
from geocodio import GeocodioClient

from nyserda_scraper import query_nyserda_large, query_nyserda_solar
from nyiso_scraper import (
    query_nyiso,
    filter_nyiso_iq_sheet,
    filter_nyiso_cluster_sheet,
    filter_nyiso_in_service_sheet,
)
from ores_scraper import query_ores_noi, query_ores_under_review, query_ores_permitted
from utils.scraper_utils import (
    create_update_object,
    update_kdm,
)
from database_constants import (
    initial_kdm_dict,
)

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)

geocode_api: str = os.environ.get("NEXT_PUBLIC_GEOCODIO_API_KEY")
geocodio = GeocodioClient(geocode_api)


def nyserda_large_to_database():
    database = []
    database.extend(query_nyserda_large())
    for project in database:
        if project.get("proposed_cod", None) is not None:
            ymd = datetime.strptime(project.get("proposed_cod"), "%Y").strftime(
                "%Y-%m-%d"
            )
            project["proposed_cod"] = ymd
        existing_data = (
            supabase.table("Projects_duplicate")
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[0]
            update_object = create_update_object(existing_project, project)
            if (
                existing_project["key_development_milestones"] is None
                or len(existing_project["key_development_milestones"]) < 0
            ):
                update_object["key_development_milestones"] = initial_kdm_dict
            else:
                update_object["key_development_milestones"] = existing_project[
                    "key_development_milestones"
                ]

            # update key development milestones
            if project.get("year_of_delivery_start_date", None) is not None:
                nyserda_contract_date = datetime.strptime(
                    project.get("year_of_delivery_start_date"), "%Y"
                )
                completed = nyserda_contract_date < datetime.now()
                nyserda_contract_date = nyserda_contract_date.strftime("%Y-%m-%d")
                update_object["key_development_milestones"] = update_kdm(
                    "Winning a contract award from NYSERDA",
                    date=nyserda_contract_date,
                    completed=completed,
                    kdm=update_object["key_development_milestones"],
                )

            try:
                response = (
                    supabase.table("Projects_duplicate")
                    .update(update_object)
                    .eq("project_name", project["project_name"])
                    .execute()
                )
                print("UPDATE", response, "\n")
            except Exception as exception:
                print(exception)
        else:
            if (project.get("latitude", None) is not None) and (
                project.get("longitude", None) is not None
            ):
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
            if project.get("year_of_delivery_start_date", None) is not None:
                nyserda_contract_date = datetime.strptime(
                    project.get("year_of_delivery_start_date"), "%Y"
                )
                completed = nyserda_contract_date < datetime.now()
                nyserda_contract_date = nyserda_contract_date.strftime("%Y-%m-%d")
                project["key_development_milestones"] = update_kdm(
                    "Winning a contract award from NYSERDA",
                    date=nyserda_contract_date,
                    completed=False,
                    kdm=initial_kdm_dict,
                )
            if "year_of_delivery_start_date" in project:
                del project["year_of_delivery_start_date"]
            try:
                response = (
                    supabase.table("Projects_duplicate").insert(project).execute()
                )
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def nyserda_solar_to_database():
    database = []
    database.extend(query_nyserda_solar())
    for project in database:
        if project.get("proposed_cod", None) is not None:
            ymd = datetime.fromisoformat(project.get("proposed_cod")).strftime(
                "%Y-%m-%d"
            )
            project["proposed_cod"] = ymd
        existing_project = (
            supabase.table("Projects_duplicate")
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_project.data) > 0:
            try:
                response = (
                    supabase.table("Projects_duplicate")
                    .update(project)
                    .eq("project_name", project["project_name"])
                    .execute()
                )
                print("UPDATE", response, "\n")
            except Exception as exception:
                print(exception)
        else:
            if (project.get("latitude", None) is not None) and (
                project.get("longitude", None) is not None
            ):
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
            try:
                response = (
                    supabase.table("Projects_duplicate").insert(project).execute()
                )
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def nyiso_to_database():
    database = []
    database.extend(filter_nyiso_iq_sheet())
    database.extend(filter_nyiso_cluster_sheet())
    for project in database:
        if project.get("proposed_cod", None) is not None:
            try:
                ymd = datetime.strptime(project.get("proposed_cod"), "%m-%Y").strftime(
                    "%Y-%m-%d"
                )
            except Exception as exception:
                ymd = datetime.strptime(project.get("proposed_cod"), "%m/%Y").strftime(
                    "%Y-%m-%d"
                )
            except Exception as exception:
                print(exception)
            project["proposed_cod"] = ymd
        existing_data = (
            supabase.table("Projects_duplicate")
            .select("*")
            .eq("interconnection_queue_number", project["interconnection_queue_number"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[0]

            # This helper function creates a dict of only fields that the existing project is missing
            # but the NYISO data has
            update_object = create_update_object(existing_project, project)
            if (
                existing_project["key_development_milestones"] is None
                or len(existing_project["key_development_milestones"]) < 0
            ):
                update_object["key_development_milestones"] = initial_kdm_dict
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
                    milestoneTitle="Execution of an Interconnection Agreement (IA)",
                    completed=completed,
                    date=ia_date,
                    kdm=update_object["key_development_milestones"],
                )
            try:
                response = (
                    supabase.table("Projects_duplicate")
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
            # appending kdms
            project["key_development_milestones"] = initial_kdm_dict
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
                    milestoneTitle="Execution of an Interconnection Agreement (IA)",
                    completed=completed,
                    date=ia_date,
                    kdm=project["key_development_milestones"],
                )
            if "date_of_ir" in project:
                del project["date_of_ir"]
            if "ia_tender_date" in project:
                del project["ia_tender_date"]
            try:
                response = (
                    supabase.table("Projects_duplicate").insert(project).execute()
                )
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def nyiso_in_service_to_database():
    database = []
    database.extend(filter_nyiso_in_service_sheet())
    for project in database:
        if project.get("proposed_cod", None) is not None:
            try:
                ymd = datetime.strptime(project.get("proposed_cod"), "%m-%Y").strftime(
                    "%Y-%m-%d"
                )
            except Exception as exception:
                ymd = datetime.strptime(project.get("proposed_cod"), "%m/%Y").strftime(
                    "%Y-%m-%d"
                )
            except Exception as exception:
                print(exception)
            project["proposed_cod"] = ymd
        existing_data = (
            supabase.table("Projects_duplicate")
            .select("*")
            .eq("interconnection_queue_number", project["interconnection_queue_number"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[0]

            # This helper function creates a dict of only fields that the existing project is missing
            # but the NYISO data has
            update_object = create_update_object(existing_project, project)
            if (
                existing_project["key_development_milestones"] is None
                or len(existing_project["key_development_milestones"]) < 0
            ):
                update_object["key_development_milestones"] = initial_kdm_dict
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
                    milestoneTitle="Execution of an Interconnection Agreement (IA)",
                    completed=completed,
                    date=ia_date,
                    kdm=update_object["key_development_milestones"],
                )
            try:
                response = (
                    supabase.table("Projects_duplicate")
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
            # appending key development milestones
            project["key_development_milestones"] = initial_kdm_dict
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
                    milestoneTitle="Execution of an Interconnection Agreement (IA)",
                    completed=completed,
                    date=ia_date,
                    kdm=project["key_development_milestones"],
                )
            project["key_development_milestones"] = update_kdm(
                milestoneTitle="Start of operations",
                completed=True,
                date=project.get("proposed_cod", None),
                kdm=project["key_development_milestones"],
            )
            if "date_of_ir" in project:
                del project["date_of_ir"]
            if "ia_tender_date" in project:
                del project["ia_tender_date"]
            try:
                response = (
                    supabase.table("Projects_duplicate").insert(project).execute()
                )
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def ores_noi_to_database():
    database = []
    database.extend(query_ores_noi())
    for project in database:
        existing_data = (
            supabase.table("Projects_duplicate")
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[0]
            update_object = create_update_object(existing_project, project)
            try:
                response = (
                    supabase.table("Projects_duplicate")
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
            try:
                response = (
                    supabase.table("Projects_duplicate").insert(project).execute()
                )
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def ores_under_review_to_database():
    database = []
    database.extend(query_ores_under_review())
    for project in database:
        existing_data = (
            supabase.table("Projects_duplicate")
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[0]
            update_object = create_update_object(existing_project, project)
            # if the existing project has no kdms, add the dict first
            if (
                existing_project["key_development_milestones"] is None
                or len(existing_project["key_development_milestones"]) < 0
            ):
                update_object["key_development_milestones"] = initial_kdm_dict
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
            try:
                response = (
                    supabase.table("Projects_duplicate")
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
            project["key_development_milestones"] = update_kdm(
                milestoneTitle="Application for permit to ORES",
                completed=True,
                date=None,
                kdm=project["key_development_milestones"],
            )
            try:
                response = (
                    supabase.table("Projects_duplicate").insert(project).execute()
                )
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


def ores_permitted_to_database():
    database = []
    database.extend(query_ores_permitted())
    for project in database:
        existing_data = (
            supabase.table("Projects_duplicate")
            .select("*")
            .eq("project_name", project["project_name"])
            .execute()
        )
        if len(existing_data.data) > 0:
            existing_project = existing_data.data[0]
            update_object = create_update_object(existing_project, project)
            # if the existing project has no kdms, add the dict first
            if (
                existing_project["key_development_milestones"] is None
                or len(existing_project["key_development_milestones"]) < 0
            ):
                update_object["key_development_milestones"] = initial_kdm_dict
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
            try:
                response = (
                    supabase.table("Projects_duplicate")
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
            project["key_development_milestones"] = update_kdm(
                milestoneTitle="Issuance of permit from ORES",
                completed=True,
                date=None,
                kdm=project["key_development_milestones"],
            )
            try:
                response = (
                    supabase.table("Projects_duplicate").insert(project).execute()
                )
                print("INSERT", response, "\n")
            except Exception as exception:
                print(exception)


"""
For testing
"""
# nyserda_large_to_database()
# nyserda_solar_to_database()
# nyiso_to_database()
# nyiso_in_service_to_database()
# ores_noi_to_database()
ores_under_review_to_database()
# ores_permitted_to_database()
