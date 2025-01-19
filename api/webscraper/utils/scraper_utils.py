import requests
import urllib
import copy
from dotenv import load_dotenv
import os
import pandas as pd
from datetime import datetime

load_dotenv(".env.local")

google_maps_api_key = os.environ.get("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")


def check_status(status: str):
    """
    params: a string representing the status of a project, or possibly None
    This function is used to check the status of NYSERDA projects and return them in a consistent format
    """
    if status is None:
        return None
    # Want to return proposed even if project is cancelled for NYSERDA
    if status.lower() == "cancelled":
        return "Proposed"
    elif status.lower() == "operational" or status.lower() == "completed":
        return "Operational"
    elif status.lower() == "under development":
        return "Proposed"
    else:
        return status


def geocode_lat_long(address):
    """
    params: a string in the form "City, NY" representing a city in New York state
    This function uses the google maps geocoding api to get the estimated latitude and longitude of a city
    returns a tuple of the form (latitude, longitude)
    """
    parameters = urllib.parse.quote_plus(address)
    response = requests.get(
        f"https://maps.googleapis.com/maps/api/geocode/json?address={parameters}&key={google_maps_api_key}"
    )
    if response.status_code != 200:
        raise ValueError(
            "Request to NYSERDA failed. Status code: %d\n%s"
            % (response.status_code, response.text)
        )
    if response.status_code == 200:
        geocode_info = response.json()
        latitude = geocode_info["results"][0]["geometry"]["location"]["lat"]
        longitude = geocode_info["results"][0]["geometry"]["location"]["lng"]
    return latitude, longitude


def create_update_object(
    existing_project: dict, new_project: dict, source: str = "NYSERDA"
) -> dict:
    """
    params: existing project is a dict, new project is a dict representing the new data
    Assumes that the new project has more recent data than the existing project
    because this function only gets called by database.py after new_project's last_updated
    field is checked against existing_project's last_updated field
    """
    update_object = {}
    for key, value in existing_project.items():
        # ensure ORES takes priority in setting "town" and "county" field
        if key == "town" or key == "county" and source == "ORES":
            if new_project.get(key, None) is not None:
                update_object[key] = new_project[key]
                continue
        # add field if existing project doesn't have it but new project does
        if value is None and new_project.get(key, None) is not None:
            update_object[key] = new_project[key]
        # add field if existing project's value differs from new project's value
        elif (
            value != new_project.get(key, None)
            and new_project.get(key, None) is not None
        ):
            update_object[key] = new_project[key]
    return update_object


def clean_df_data(df):
    """
    params: a pandas dataframe object
    Helper function that cleans a dataframe of data representing NYISO data
    First, we drop any rows that don't contain project data
    Then, we replace NaN, NaT, or any other non-valid cells with None
    """
    df = df.copy()
    df.dropna(
        subset=["Project Name"], inplace=True
    )  # drops rows of xlsx that don't correspond to project data
    with pd.option_context("future.no_silent_downcasting", True):
        df = df.fillna("").infer_objects(copy=False)
    df = df.where(pd.notna(df), None)  # replaces NaN values with None
    df = df.replace({pd.NaT: None})
    df.replace(to_replace=["", "N/A", "n/a", "NAN", "n/a"], value=None, inplace=True)
    return df


def standardize_label(renewable_energy_technology):
    substrings = renewable_energy_technology.split("-")
    if len(substrings) == 1:
        return renewable_energy_technology
    else:
        label = (
            substrings[0].strip()
            + " "
            + substrings[1][0].upper()
            + substrings[1][1:].strip()
        )
        return label


def update_kdm(milestoneTitle: str, completed: bool, date: str, kdm: dict) -> dict:
    """
    params: milestoneTitle is a string representing which milestone is being updated
    completed is a boolean
    date should be a string of the form "YYYY-MM-DD"
    kdm is a dictionary representing the current state of the Key Development Milestones
    returns a dictionary representing KDMs after updating
    """
    milestone = {"milestoneTitle": milestoneTitle, "completed": completed, "date": date}

    updated_kdm = [
        milestone if m["milestoneTitle"] == milestoneTitle else m for m in kdm
    ]

    return updated_kdm


def update_last_updated(source: str, date: datetime, last_updated: dict):
    """
    params: source is a string reprsenting which datasource the updated data was from
    date is a datetime object representing when this project was updated
    last_updated is a dictionary representing the current state of when this project was updated by each datasource
    """
    date_string = date.strftime("%Y-%m-%dT%H:%M:%S.%f%z")
    last_updated[source] = date_string
    return last_updated


def turn_timestamp_to_string(timestamp):
    """
    returns a string of the form "YYYY-MM-DD"
    """
    return timestamp.to_pydatetime().strftime("%Y-%m-%d")


# TODO: update this to also work with NYSERDA solar project names which are mostly all numbers
def find_keyword(project_name):
    if " " not in project_name:
        return project_name
    if "*" in project_name:
        i = project_name.find("*")
        return project_name[:i].strip()
    elif "solar" in project_name.lower():
        i = project_name.lower().find("solar")
        return project_name[:i].strip()
    elif "wind" in project_name.lower():
        i = project_name.lower().find("wind")
        return project_name[:i].strip()
    else:
        last_non_digit_index = len(project_name) - 1
        while last_non_digit_index > 0 and project_name[last_non_digit_index].isdigit():
            last_non_digit_index -= 1

        # return the substring up to but not including the last non-digit
        # if there are no non-digit characters, return the whole project name
        return (
            project_name[: last_non_digit_index + 1].strip()
            if last_non_digit_index < len(project_name) - 1
            else project_name.strip()
        )


def combine_projects(existing_project: dict, new_project: dict) -> dict:
    """
    params: existing project is a dict, new project is a dict representing the new data
    Adds any data that the new_project has but that the existing project is missing
    """
    for key, value in existing_project.items():
        # add field if existing project doesn't have it but new project does
        if value is None and new_project.get(key, None) is not None:
            existing_project[key] = new_project[key]
    return existing_project


def pass_all_kdms(kdm: dict) -> dict:
    for milestone in kdm:
        milestone["completed"] = True
    return kdm


# commands for creating requirements.txt file
# python -m pipreqs.pipreqs --savepath=requirements.in && pip-compile
# python -m piptools compile requirements.in
