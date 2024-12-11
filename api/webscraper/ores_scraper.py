from collections import defaultdict
import requests
from bs4 import BeautifulSoup
import pandas as pd
from io import StringIO
import re
from .utils.scraper_utils import geocode_lat_long
from .database_constants import initial_kdm

# url = "https://dps.ny.gov/ores-permit-applications"
# page = requests.get(url)

# soup = BeautifulSoup(page.content, "html.parser")
# tables = soup.find_all("table")

# notices_of_intent = pd.read_html(StringIO(tables[0].prettify()))[0]
# noi_dict = notices_of_intent.to_dict(orient="records")

# # Complete Applications Under Review
# under_review = pd.read_html(StringIO(tables[3].prettify()))[0]
# under_review_dict = under_review.to_dict(orient="records")

# # Permitted Applications
# permitted = pd.read_html(StringIO(tables[4].prettify()))[0]
# permitted_dict = permitted.to_dict(orient="records")

"""
All the descriptions of the ORES data describe the location of the project in the following format:
... Located in the Towns of ALTONA, CLINTON, ELLENBURG, and MOOERS, CLINTON COUNTY.
"""


def parse_for_locations(description):
    locations = []  # list of tuples (town, county)
    towns = []

    # Change description to lowercase
    description = description.lower()

    # Case 1: Multiple towns in the same county
    if "towns" in description:
        town_index = description.find("towns")
        town_string = description[town_index:-1]
        town_split = town_string.split(", ")
        # Case 1a: 3+ towns
        if len(town_split) > 3:
            towns = re.findall(r"\b(?!towns|of|and)[a-z]+\b", town_string)
            county_index = towns.index("county")
            towns = towns[: county_index - 1]
        # Case 1b: 2 towns
        else:
            towns = list(re.findall(r"towns of (.+?) and (.+?),", town_string)[0])
        county = re.findall(r"\b([a-z .\-]+ county)\b", town_string)[0]
        for town in towns:
            locations.append((town.title(), county.title()))

    # Case 2: Multiple towns in different counties
    elif description.count("town") > 1:
        town_index = description.find("town")
        town_string = description[town_index:-1]
        town_split = town_string.split(" and ")
        county_to_town = defaultdict(list)
        for potential_town in town_split:
            town = re.findall(r"town of (.+?),", potential_town)
            county = re.findall(r", (.+?) county", potential_town)[0] + " county"
            county_to_town[county] += town
        for county, towns in county_to_town.items():
            for town in towns:
                locations.append((town.title(), county.title()))

    # Case 3: Single town
    else:
        town_index = description.find("town")
        town_string = description[town_index:-1]
        town_split = town_string.split(", ")
        towns += re.findall(r"town of (.+?),", town_string)
        if "and" in towns[0]:
            and_index = towns[0].index("and")
            towns[0] = towns[0][: and_index - 1]
        county = re.findall(r", (.+?) county", town_string)[0] + " county"
        for town in towns:
            locations.append((town.title(), county.title()))

    return locations


def parse_for_project_size(description):
    # Change description to lowercase
    description = description.lower()

    match = re.search(r"(\d+[.,]?\d*)[-\s]?megawatt", description)
    project_size = match.group(1) if match else None

    return project_size


# TODO: Fix this to account for all renewable energy types (only looks for solar and wind)
def parse_for_renewable_energy_technology(description):
    # Change description to lowercase
    description = description.lower()
    if "solar" in description:
        return "Solar PV"
    if "wind" in description:
        return "Land-Based Wind"
    return None


def has_energy_storage(description):
    # Change description to lowercase
    description = description.lower()

    return "energy storage" in description


def has_pumped_storage(description):
    # Change description to lowercase
    description = description.lower()

    return "pumped storage" in description


def parse_for_storage_size(description):
    # Change description to lowercase
    description = description.lower()

    if has_energy_storage(description) or has_pumped_storage(description):
        including_index = description.index(
            "including"
        )  # finds size based on the word "including"
        temp = description[including_index:].split(", ")

        # Search for the megawatt number in the lowercase text
        match = re.search(r"(\d+)[-\s]?megawatt", temp[0])
        storage_size = match.group(1) if match else None
        return storage_size
    return None


# ORES notice of intent
def filter_noi(data: list) -> list:
    """
    params: data - list of dictionaries representing rows in the ORES Notices of Intent table
    Parses description to find town, county of project
    Reverse Geocodes for latitude and longitude
    Returns list of projects with data filtered to include the desired fields
    """
    filtered_list = []
    for row in data:
        locations = parse_for_locations(row["Description"])
        project_dict = {
            "permit_application_number": row.get("Permit Application Number", None),
            "project_name": row.get("Project Name", None),
            "town": (
                list(set([town for town, county in locations])) if locations else None
            ),
            "county": (
                list(set([county for town, county in locations])) if locations else None
            ),
            "latitude": None,  # geocoding for lat/long is handled when inserting into database
            "longitude": None,
            "key_development_milestones": initial_kdm,
            "size": parse_for_project_size(row["Description"]),
            "has_energy_storage": has_energy_storage(row["Description"]),
            "has_pumped_storage": has_pumped_storage(row["Description"]),
            "storage_size": parse_for_storage_size(row["Description"]),
            "renewable_energy_technology": parse_for_renewable_energy_technology(
                row["Description"]
            ),
        }
        filtered_list.append(project_dict)
    return filtered_list


def filter_under_review(data: list) -> list:
    """
    params: data - list of dictionaries representing rows in the ORES Completed Projects Under Review table
    Parses description to find town, county of project
    Reverse Geocodes for latitude and longitude
    Returns list of projects with data filtered to include the desired fields
    """
    filtered_list = []
    for row in data:
        locations = parse_for_locations(row["Description"])
        project_dict = {
            "permit_application_number": row.get("Permit Application Number", None),
            "project_name": row.get("Project Name", None),
            "town": (
                list(set([town for town, county in locations])) if locations else None
            ),
            "county": (
                list(set([county for town, county in locations])) if locations else None
            ),
            "latitude": None,  # geocoding for lat/long is handled when inserting into database
            "longitude": None,
            "key_development_milestones": initial_kdm,  # updating kdm for projects under review is handled in database.py
            "size": parse_for_project_size(row["Description"]),
            "has_energy_storage": has_energy_storage(row["Description"]),
            "has_pumped_storage": has_pumped_storage(row["Description"]),
            "storage_size": parse_for_storage_size(row["Description"]),
            "renewable_energy_technology": parse_for_renewable_energy_technology(
                row["Description"]
            ),
        }
        filtered_list.append(project_dict)
    return filtered_list


def filter_permitted(data):
    """
    params: data - list of dictionaries representing rows in the ORES Permitted Applications table
    Parses description to find town, county of project
    Reverse Geocodes for latitude and longitude
    Returns list of projects with data filtered to include the desired fields
    """
    filtered_list = []
    for row in data:
        locations = parse_for_locations(row["Description"])
        project_dict = {
            "permit_application_number": row.get("Permit Application Number", None),
            "project_name": row.get("Project Name", None),
            "town": (
                list(set([town for town, county in locations])) if locations else None
            ),
            "county": (
                list(set([county for town, county in locations])) if locations else None
            ),
            "latitude": None,  # geocoding for lat/long is handled when inserting into database
            "longitude": None,
            "key_development_milestones": initial_kdm,  # updating kdm for permitted projects is handled in database.py
            "size": parse_for_project_size(row["Description"]),
            "has_energy_storage": has_energy_storage(row["Description"]),
            "has_pumped_storage": has_pumped_storage(row["Description"]),
            "storage_size": parse_for_storage_size(row["Description"]),
            "renewable_energy_technology": parse_for_renewable_energy_technology(
                row["Description"]
            ),
        }
        filtered_list.append(project_dict)
    return filtered_list


# ORES notice of review
def query_ores_noi():
    url = "https://dps.ny.gov/ores-permit-applications"
    page = requests.get(url)

    soup = BeautifulSoup(page.content, "html.parser")
    tables = soup.find_all("table")

    notices_of_intent = pd.read_html(StringIO(tables[0].prettify()))[0]
    noi_dict = notices_of_intent.to_dict(orient="records")
    response = filter_noi(noi_dict)
    return response


def query_ores_under_review():
    url = "https://dps.ny.gov/ores-permit-applications"
    page = requests.get(url)

    soup = BeautifulSoup(page.content, "html.parser")
    tables = soup.find_all("table")

    under_review = pd.read_html(StringIO(tables[3].prettify()))[0]
    under_review_dict = under_review.to_dict(orient="records")
    response = filter_under_review(under_review_dict)
    return response


def query_ores_permitted():
    url = "https://dps.ny.gov/ores-permit-applications"
    page = requests.get(url)

    soup = BeautifulSoup(page.content, "html.parser")
    tables = soup.find_all("table")

    permitted = pd.read_html(StringIO(tables[4].prettify()))[0]
    permitted_dict = permitted.to_dict(orient="records")
    response = filter_under_review(permitted_dict)
    return response
