import requests
import pandas as pd
from io import BytesIO
import json
from .utils.scraper_utils import clean_df_data
from .database_constants import (
    renewable_energy_abbreviations,
)

from bs4 import BeautifulSoup

url = "https://www.nyiso.com/connecting-to-the-grid"
page = requests.get(url)

soup = BeautifulSoup(page.content, "html.parser")
interconnection_link = soup.find("a", string="View the Interconnection Queue")
if interconnection_link is not None:
    nyiso_xlsx_href = interconnection_link.get("href")


def query_nyiso_excel():
    if nyiso_xlsx_href is None:
        print('ERROR: "View the Interconnection Queue" link not found')
        return
    else:
        nyiso = requests.get(nyiso_xlsx_href)
        nyiso_data = nyiso.content
        all_sheets = pd.read_excel(BytesIO(nyiso_data), sheet_name=None)
        return all_sheets


def query_nyiso():
    """
    Queries for all the projects in the NYISO sheet and filters
    Outdated - does not modify behavior based on which sheet the project is from (Interconnection Queue, Cluster Projects, In Service)
    returns: list of dictionaries representing the projects
    """
    if nyiso_xlsx_href is None:
        print('ERROR: "View the Interconnection Queue" link not found')
        return
    else:
        nyiso = requests.get(nyiso_xlsx_href)
        nyiso_data = nyiso.content
        nyiso_df = pd.read_excel(BytesIO(nyiso_data))

        nyiso_df = clean_df_data(nyiso_df)
        nyiso_list = nyiso_df.to_dict(orient="records")

        filtered_list = []
        for item in nyiso_list:
            if (
                item.get("Type/ Fuel", None)
                not in renewable_energy_abbreviations.keys()
            ):
                continue
            project_dict = {
                "project_name": item.get("Project Name", None),
                "project_status": "Proposed",
                "renewable_energy_technology": renewable_energy_abbreviations[
                    item.get("Type/ Fuel")
                ],  # map abbreviations into readable string
                "size": item.get("SP (MW)", None),
                "developer": item.get("Developer Name", None),
                "proposed_cod": item.get(
                    "Proposed COD", None
                ),  # note: non-serializable into JSON --> can't directly write to file
                "county": item.get("County", None),
                "region": None,  # missing
                "zipcode": None,  # missing
                "latitude": None,
                "longitude": None,
                # 'data_through_date': item.get('Last Updated Date', None),
                "key_development_milestones": None,
                "project_image": None,
                "interconnection_queue_number": item.get("Queue Pos.", None),
                "approved": False,
                # the following fields are used for updating kdms when updating the database
                "date_of_ir": item.get("Date of IR", None),  # already a datetime object
                "ia_tender_date": item.get("IA Tender Date", None),
            }
            filtered_list.append(project_dict)

        return filtered_list


def write_nyiso_to_json():
    data = query_nyiso()
    # print(data)
    with open("api/webscraper/nyiso.json", "w") as file:
        json.dump(data, file, indent=4)
        file.write("\n")


def filter_nyiso_list(project_list, sheet_name):
    filtered_list = []
    if sheet_name == "In Service":
        project_status = "Operational"
    else:
        project_status = "Proposed"
    for item in project_list:
        if sheet_name == "Interconnection Queue" and item.get("State") != "NY":
            continue
        elif sheet_name == "Cluster Projects" and not (
            item.get("State", None) == "New York" or item.get("State", None) == "NY"
        ):
            continue
        elif sheet_name == "In Service" and item.get("State", None) != "NY":
            continue
        if item.get("Type/ Fuel", None) not in renewable_energy_abbreviations.keys():
            continue
        project_dict = {
            "project_name": item.get("Project Name", None),
            "project_status": project_status,
            "renewable_energy_technology": renewable_energy_abbreviations[
                item.get("Type/ Fuel")
            ],  # map abbreviations into readable string
            "size": item.get("SP (MW)", None),
            "developer": item.get("Developer Name", None),
            "proposed_cod": item.get(
                "Proposed COD", None
            ),  # NOTE: non-serializable into JSON --> can't directly write to file
            "county": item.get("County", None),
            "region": None,  # missing
            "zipcode": None,  # missing
            "latitude": None,
            "longitude": None,
            "nyiso_last_updated": (
                item.get("Last Updated Date", None)  # NOTE: non-serializable into JSON
                if (
                    sheet_name == "Interconnection Queue"
                    or sheet_name == "Cluster Projects"
                )
                else item.get(
                    "Last Update NaT", None
                )  # NOTE: the column header for the in-service sheet is called "Last Update NaT"
            ),
            "key_development_milestones": None,
            "project_image": None,
            "interconnection_queue_number": item.get("Queue Pos.", None),
            "approved": False,
            # the following fields are used for updating kdms when updating the database
            "date_of_ir": item.get("Date of IR", None),  # datetime object
            "ia_tender_date": item.get("IA Tender Date", None),  # timestamp object
        }
        if sheet_name == "In Service":
            project_dict["developer"] = item.get("Owner/Developer", None)
        filtered_list.append(project_dict)

    return filtered_list


def filter_nyiso_iq_sheet():
    all_sheets = query_nyiso_excel()
    sheet_names = list(all_sheets.keys())
    iq_key = sheet_names[0]

    iq_df = all_sheets[iq_key]  # Interconnection Queue
    iq_df = clean_df_data(iq_df)
    iq_list = iq_df.to_dict(orient="records")

    filtered_list = filter_nyiso_list(iq_list, "Interconnection Queue")
    return filtered_list


def filter_nyiso_cluster_sheet():
    all_sheets = query_nyiso_excel()
    sheet_names = list(all_sheets.keys())
    cluster_projects_key = sheet_names[1]

    cluster_projects_df = all_sheets[cluster_projects_key]  # Cluster Projects
    cluster_projects_df = clean_df_data(cluster_projects_df)
    cluster_projects_list = cluster_projects_df.to_dict(orient="records")

    filtered_list = filter_nyiso_list(cluster_projects_list, "Cluster Projects")
    return filtered_list


def filter_nyiso_in_service_sheet():
    all_sheets = query_nyiso_excel()
    sheet_names = list(all_sheets.keys())
    in_service_key = sheet_names[-1]

    in_service_df = all_sheets[in_service_key]  # In Service

    # These functions clean and parse the headers from the In Service Sheet
    # The In Service sheet has headers on both row 1 and row 2
    in_service_df.columns = [
        (
            f"{col} {in_service_df.iloc[0].iloc[i]}"
            if col.find("Unnamed") == -1
            else in_service_df.iloc[0].iloc[i]
        )
        for i, col in enumerate(in_service_df.columns)
    ]
    in_service_df = in_service_df[1:]

    in_service_df = clean_df_data(in_service_df)
    in_service_dict = in_service_df.to_dict(orient="records")
    filtered_list = filter_nyiso_list(in_service_dict, "In Service")
    return filtered_list


def filter_nyiso_withdrawn_sheets():
    """
    Returns a list of objects containing the key: "project_name" of withdrawn projects
    """
    all_sheets = query_nyiso_excel()
    sheet_names = list(all_sheets.keys())
    withdrawn_key = sheet_names[2]  # gets the sheet named "Withdrawn"
    cluster_withdrawn_key = sheet_names[3]  # gets the sheet named "Cluster Withdrawn"

    withdrawn_df = all_sheets[withdrawn_key]
    withdrawn_df = clean_df_data(withdrawn_df)
    withdrawn_list = withdrawn_df.to_dict(orient="records")

    cluster_withdrawn_df = all_sheets[cluster_withdrawn_key]
    cluster_withdrawn_df = clean_df_data(cluster_withdrawn_df)
    cluster_withdrawn_list = cluster_withdrawn_df.to_dict(orient="records")

    withdrawn_list = withdrawn_list + cluster_withdrawn_list
    filtered_list = [
        {"project_name": item.get("Project Name", None)}
        for item in withdrawn_list
        if item.get("Project Name", None) is not None
    ]
    return filtered_list


"""
For testing
"""
# write_nyiso_to_json()
# print(filter_nyiso_iq_sheet())
# print(filter_nyiso_in_service_sheet())
# print(filter_nyiso_cluster_sheet())
# print(filter_nyiso_withdrawn_sheets())
