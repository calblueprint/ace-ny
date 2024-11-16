import requests
import urllib
from dotenv import load_dotenv
import os
import pandas as pd
from datetime import datetime

load_dotenv(".env.local")

google_maps_api_key = os.environ.get("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")


def check_status(status):
    if status is None:
        return None
    if status.lower() == "cancelled":
        return "Cancelled"
    elif status.lower() == "operational" or status.lower() == "completed":
        return "Operational"
    elif status.lower() == "under development":
        return "Proposed"
    else:
        return status


def geocode_lat_long(address):
    parameters = urllib.parse.quote_plus(address)
    response = requests.get(
        f"https://maps.googleapis.com/maps/api/geocode/json?address={parameters}&key={google_maps_api_key}"
    )
    if response.status_code == 200:
        geocode_info = response.json()
        latitude = geocode_info["results"][0]["geometry"]["location"]["lat"]
        longitude = geocode_info["results"][0]["geometry"]["location"]["lng"]
    return latitude, longitude


def create_update_object(existing_project, new_project):
    """
    Assumes that the new project has more recent data than the existing project
    because this function only gets called by database.py after new_project's last_updated
    field is checked against existing_project's last_updated field
    """
    update_object = {}
    for key, value in existing_project.items():
        # add field if existing project doesn't have it but new project does
        if value is None and new_project.get(key, None) is not None:
            update_object[key] = new_project[key]
        # add field if existing project's value differs from new project's value
        elif value != new_project[key] and new_project.get(key, None) is not None:
            update_object[key] = new_project[key]
    return update_object


def clean_df_data(df):
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


def update_kdm(milestoneTitle, completed, date, kdm):
    milestone = {"milestoneTitle": milestoneTitle, "completed": completed, "date": date}

    updated_kdm = [
        milestone if m["milestoneTitle"] == milestoneTitle else m for m in kdm
    ]

    return updated_kdm


def turn_timestamp_to_string(timestamp):
    return timestamp.to_pydatetime().strftime("%Y-%m-%d")


# commands for creating requirements.txt file
# python -m pipreqs.pipreqs --savepath=requirements.in && pip-compile
# python -m piptools compile requirements.in
