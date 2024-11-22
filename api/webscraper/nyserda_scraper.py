import requests
import json
from .utils.scraper_utils import check_status, geocode_lat_long, standardize_label
from .database_constants import renewable_energy_map, initial_kdm

"""
This scrapes data from the NYSERDA Large-scale Renewable Projects database.
We filter for specific columns from the database's API and save them to a json file.
https://data.ny.gov/Energy-Environment/Large-scale-Renewable-Projects-Reported-by-NYSERDA/dprp-55ye/about_data
"""


def solicitation_name_to_date(solicitation_name):
    if solicitation_name is None:
        return None
    if "-" not in solicitation_name:
        return None
    else:
        parts = solicitation_name.split("-")
        year = parts[0][-2::]
        return f"20{year}-01-01"


def query_nyserda_large():
    nyserda_large_response = requests.get("https://data.ny.gov/resource/dprp-55ye.json")
    if nyserda_large_response.status_code != 200:
        raise ValueError(
            "Request to NYSERDA failed. Status code: %d\n%s"
            % (nyserda_large_response.status_code, nyserda_large_response.text)
        )
    else:
        large_data = nyserda_large_response.json()
        filtered_list = []
        for item in large_data:
            item["renewable_technology"] = (
                standardize_label(item.get("renewable_technology"))
                if item.get("renewable_technology", None) is not None
                else None
            )
            if item.get("renewable_technology", None) in renewable_energy_map.keys():
                project_dict = {
                    "project_name": item.get("project_name", None),
                    "project_status": check_status(item.get("project_status", None)),
                    "renewable_energy_technology": renewable_energy_map[
                        item.get("renewable_technology")
                    ],
                    "developer": item.get("developer_name", None),
                    "county": item.get("county_province", None),
                    "region": item.get("redc", None),
                    "zipcode": item.get("zip_code", None),
                    "latitude": (
                        item.get("georeference")["coordinates"][1]
                        if item.get("georeference", None) is not None
                        else None
                    ),
                    "longitude": (
                        item.get("georeference")["coordinates"][0]
                        if item.get("georeference", None) is not None
                        else None
                    ),
                    "data_through_date": item.get("data_through_date").split("T")[0],
                    "permit_process": item.get("permit_process", None),
                    "interconnection_queue_number": item.get(
                        "interconnection_queue_number", None
                    ),
                    "size": item.get("new_renewable_capacity_mw", None),
                    "key_development_milestones": initial_kdm,
                    "project_image": None,
                    "approved": False,
                    "proposed_cod": item.get("year_of_delivery_start_date", None),
                    # used for updating the kdms
                    "nyserda_contract_date": solicitation_name_to_date(
                        item.get("solicitation_name", None)
                    ),
                }
                filtered_list.append(project_dict)
        return filtered_list


def write_large_to_json():
    nyserda_large_filtered_list = query_nyserda_large()

    with open("api/webscraper/nyserda_large.json", "w") as file:
        json.dump(nyserda_large_filtered_list, file, indent=4)
        file.write("\n")


def query_nyserda_solar(offset=0, limit=1000):
    """
    This scrapes data from the NYSERDA Statewide Distributed Solar Projects database.
    We filter for specific columns from the database's API and save them to a json file.
    https://data.ny.gov/Energy-Environment/Statewide-Distributed-Solar-Projects-Beginning-200/wgsj-jt5f/about_data

    geocode_lat_long is a helper util function that uses the google maps geocoding api to get the estimated
    latitude and longitude of a project based on the town
    """
    nyserda_small_response = requests.get(
        f"https://data.ny.gov/resource/wgsj-jt5f.json?$limit={limit}&$offset={offset}"
    )
    if nyserda_small_response.status_code != 200:
        raise ValueError(
            "Request to NYSERDA failed. Status code: %d\n%s"
            % (nyserda_small_response.status_code, nyserda_small_response.text)
        )
    else:
        small_data = nyserda_small_response.json()
        filtered_list = []

        for item in small_data:
            size_in_mw = None
            if item.get("pv_system_size_kwac", None) is not None:
                size_in_mw = float(item.get("pv_system_size_kwac")) * 0.001
            elif item.get("estimated_pv_system_size", None) is not None:
                size_in_mw = float(item.get("estimated_pv_system_size")) * 0.001

            if size_in_mw is None or size_in_mw < 2:
                continue
            if (
                item.get("project_id", None) is None
            ):  # some projects have no project_id, so we skip them
                continue

            if check_status(item.get("project_status", None)) != "Cancelled":
                project_dict = {
                    "project_name": item.get(
                        "project_id", None
                    ),  # small data set only has project_id
                    "project_status": check_status(
                        item.get("project_status", None)
                    ),  # NYSERDA small-scale solar projects do not have a project status
                    "renewable_energy_technology": "Solar",
                    "size": size_in_mw,
                    "developer": item.get("developer", None),
                    "proposed_cod": item.get("interconnection_date", None),
                    "town": item.get("city_town", None),
                    "county": item.get("county", None),
                    "region": item.get("redc", None),  # missing
                    "zipcode": item.get("zip", None),
                    "latitude": None,
                    "longitude": None,
                    "data_through_date": item.get("data_through_date").split("T")[0],
                    "key_development_milestones": initial_kdm,
                    "project_image": None,
                    "approved": False,
                }
                filtered_list.append(project_dict)
        return filtered_list


def query_nyserda_solar_repeat():
    """
    The NYSERDA Statewide Distributed Solar Projects database has 230,000 records
    However, the API has a default limit of 1,000 rows.
    This function repeatedly queries the API with different offsets to get all the records.
    """
    # TODO: get the total number of records from the database by HTML parsing
    length = 250000
    limit = 1000

    epochs = length // limit
    if length % limit != 0:
        epochs += 1

    projects = []

    for i in range(epochs):
        offset = i * limit
        result = query_nyserda_solar(offset, limit)
        projects.extend(result)

    return projects


def write_small_to_json():
    project_list = query_nyserda_solar_repeat()

    with open("api/webscraper/nyserda_small.json", "w") as file:
        json.dump(project_list, file, indent=4)
        file.write("\n")
