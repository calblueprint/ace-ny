import requests
from bs4 import BeautifulSoup
import pandas as pd
from io import StringIO
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


def parse_for_location(description):
    # finds index in the description where the phrase "Town of..." appears
    town_index = description.lower().find("town")
    town_string = description[town_index:]
    # splits town_string by the comma
    town_split = town_string.split(",")
    # town is the second to last word before the comma
    town = town_split[-2].split(" ")[-1].strip()
    # county is the last word when the location string is split by commas
    county = town_split[-1].strip()

    # removes the period from the end of county if it exists
    index = county.find(".")
    if index != -1:
        while county.find(".", index + 1) != -1:
            index = county.find(".", index + 1)
        county = county[:index]

    # capitalize first letter of each word in town/county name
    if town:
        town = " ".join([word.capitalize() for word in town.split(" ")])
    if county:
        county = " ".join([word.capitalize() for word in county.split(" ")])
    return (town, county)


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
        town, county = parse_for_location(row["Description"])
        project_dict = {
            "permit_application_number": row.get("Permit Application Number", None),
            "project_name": row.get("Project Name", None),
            "town": town if town else None,
            "county": county if county else None,
            "latitude": None,  # geocoding for lat/long is handled when inserting into database
            "longitude": None,
            "key_development_milestones": initial_kdm,
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
        town, county = parse_for_location(row["Description"])
        project_dict = {
            "permit_application_number": row.get("Permit Application Number", None),
            "project_name": row.get("Project Name", None),
            "town": town if town else None,
            "county": county if county else None,
            "latitude": None,  # geocoding for lat/long is handled when inserting into database
            "longitude": None,
            "key_development_milestones": initial_kdm,  # updating kdm for projects under review is handled in database.py
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
        town, county = parse_for_location(row["Description"])
        project_dict = {
            "permit_application_number": row.get("Permit Application Number", None),
            "project_name": row.get("Project Name", None),
            "town": town if town else None,
            "county": county if county else None,
            "latitude": None,  # geocoding for lat/long is handled when inserting into database
            "longitude": None,
            "key_development_milestones": initial_kdm,  # updating kdm for permitted projects is handled in database.py
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
