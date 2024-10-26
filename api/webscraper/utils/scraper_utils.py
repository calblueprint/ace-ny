import requests
import urllib
from dotenv import load_dotenv
import os
import pandas as pd

load_dotenv(".env.local")

google_maps_api_key = os.environ.get("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")


def check_status(status):
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


project_fields = [
    "project_name",
    "project_status",
    "developer",
    "county",
    "region",
    "size",
    "latitude",
    "longitude",
    "key_development_milestones",
    "project_image",
    "interconnection_queue_number",
    "approved",
]


def create_update_object(existing_project, new_project):
    update_object = {}
    for key, value in existing_project.items():
        if value is None and new_project.get(key, None) is not None:
            update_object[key] = new_project[key]
    return update_object


def clean_df_data(df):
    df.dropna(
        subset=["Project Name"], inplace=True
    )  # drops rows of xlsx that don't correspond to project data
    df = df.fillna("")
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
    print("new kdm", updated_kdm)
    return updated_kdm
