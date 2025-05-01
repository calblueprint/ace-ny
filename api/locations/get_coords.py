import requests
from typing import List, Optional
from constants import COUNTY_COORDS_URL, TOWN_COORDS_URL, REGION_COORDS_URL, UTILITY_COORDS_URL, STATE_SENATE_COORDS_URL, ASSEMBLY_COORDS_URL

def query_county_locations() -> Optional[List[dict]]:
    url = COUNTY_COORDS_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching county location data at URL: {url}")
        print("Error:", e)
    return []

def query_town_locations() -> Optional[List[dict]]:
    url = TOWN_COORDS_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching town location data at URL: {url}")
        print("Error:", e)
    return []

def query_region_locations() -> Optional[List[dict]]:
    url = REGION_COORDS_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching region location data at URL: {url}")
        print("Error:", e)
    return []

def query_utility_locations() -> Optional[List[dict]]:
    url = UTILITY_COORDS_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data
    except Exception as e:
        print(f"Error fetching utility location data at URL: {url}")
        print("Error:", e)
    return []

def query_state_senate_locations() -> Optional[List[dict]]:
    url = STATE_SENATE_COORDS_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching state senate location data at URL: {url}")
        print("Error:", e)
    return []

def query_assembly_locations() -> Optional[List[dict]]:
    url = ASSEMBLY_COORDS_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching assembly location data at URL: {url}")
        print("Error:", e)
    return []
