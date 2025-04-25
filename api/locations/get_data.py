import requests
from typing import List, Optional
from constants import COUNTY_DATA_URL, TOWN_DATA_URL, REGION_DATA_URL, UTILITY_DATA_URL, STATE_SENATE_DATA_URL, ASSEMBLY_DATA_URL

def query_county_locations() -> Optional[List[dict]]:
    url = COUNTY_DATA_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching location data at URL: {url}")
        print("Error:", e)
    return []

def query_town_locations() -> Optional[List[dict]]:
    url = TOWN_DATA_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching location data at URL: {url}")
        print("Error:", e)
    return []

def query_region_locations() -> Optional[List[dict]]:
    url = REGION_DATA_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching location data at URL: {url}")
        print("Error:", e)
    return []

def query_utility_locations() -> Optional[List[dict]]:
    url = UTILITY_DATA_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data
    except Exception as e:
        print(f"Error fetching location data at URL: {url}")
        print("Error:", e)
    return []

def query_state_senate_locations() -> Optional[List[dict]]:
    url = STATE_SENATE_DATA_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching location data at URL: {url}")
        print("Error:", e)
    return []

def query_assembly_locations() -> Optional[List[dict]]:
    url = ASSEMBLY_DATA_URL
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        features = data.get('features', [])
        return features
    except Exception as e:
        print(f"Error fetching location data at URL: {url}")
        print("Error:", e)
    return []

if __name__ == "__main__":
    data = query_state_senate_locations()
    print(len(data))
    print(data[0].keys())
    
