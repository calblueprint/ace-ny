import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json
from get_data import query_county_locations, query_town_locations, query_region_locations, query_utility_locations, query_state_senate_locations, query_assembly_locations

load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env.local"))

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase_client: Client = create_client(url, key)

def update_location_data():
  county_data = query_county_locations()

  if not county_data:
        print("No county data found.")
        return
  
  updates = []

  for county in county_data:
      name = county["attributes"]["NAME"]
      coordinates = county["geometry"]["rings"]
      
      coordinates_json = json.dumps(coordinates)
      
      updates.append({
          "county": name,
          "coordinates": coordinates_json
      })
  
  try:
      response = supabase_client.table("Counties").upsert(updates, on_conflict=["county"]).execute()
      if response.data:
          print("Successfully updated county coordinates")
      else:
          print("Failed to update county coordinates")
  except Exception as e:
      print("HII")
      print(f"Failed to update county coordinates: {e}")
      return

  # town_data = query_town_locations()
  # region_data = query_region_locations()
  # utility_data = query_utility_locations()
  # state_data = query_state_senate_locations()
  # assembly_data = query_assembly_locations()



if __name__ == "__main__":
  update_location_data()
