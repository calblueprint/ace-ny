# to update the location data, simply run this file (`python update_location.py`)

import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json
from get_data import query_county_locations, query_town_locations, query_region_locations, query_utility_locations, query_state_senate_locations, query_assembly_locations

load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env.local"))

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase_client: Client = create_client(url, key)

def update_table_data(data, table_name, column_name, batch_size=100):
    """
    Updates the location data of table_name.

    data: output of one of the query functions in get_data.py
    table_name: name of the table to update
    column_name: name of the column to match for upsert
    """
    if not data:
        print(f"No data found to update: {table_name}")
        return
  
    updates = []
    if table_name in ["Counties", "Counties Test"]:
      for i, item in enumerate(data):
          id = i+1
          name = item["attributes"]["NAME"]
          coordinates = item["geometry"]["rings"]
          coordinates_json = json.dumps(coordinates)
          updates.append({
              "id": id,
              column_name: name,
              "coordinates": coordinates_json,
          })
    
    # need to check for duplicate town names
    # if the previous name is the same as the current name, add the county name to the current name
    # ex. "Albion" -> "Albion (Oswego)"
    if table_name in ["Towns", "Towns Test"]:
        town_to_county = {} # maps from town name to county name
        count_names = {} # maps from name to number of times it was seen
        for i, item in enumerate(data):
            id = i + 1
            name = item["attributes"]["NAME"]
            county = item["attributes"]["COUNTY"]
            coordinates = item["geometry"]["rings"]
            coordinates_json = json.dumps(coordinates)

            # Check if we've already seen this name
            if name in town_to_county:
                # if first time seeing this duplicate name, need to modify the previous instance
                if count_names[name] == 1:
                    prev_county = town_to_county[name]
                    updates[-1][column_name] = f"{updates[-1][column_name]} ({prev_county})"

                # modify the current name
                updated_name = f"{name} ({county})"
            else:
                # first time seeing this name
                updated_name = name
                town_to_county[name] = county

            # Add the update (with the right name)
            updates.append({
                "id": id,
                column_name: updated_name,
                "coordinates": coordinates_json,
            })

            # Increment the count for this name
            count_names[name] = count_names.get(name, 0) + 1
    
    if table_name in ["State Senate Districts", "State Senate Districts Test", "Assembly Districts", "Assembly Districts Test"]:
        for i, item in enumerate(data):
            id = i+1
            name = item["attributes"]["DISTRICT"]
            coordinates = item["geometry"]["rings"]
            coordinates_json = json.dumps(coordinates)
            updates.append({
                "id": id,
                column_name: name,
                "coordinates": coordinates_json,
            })

    if table_name in ["Regions", "Regions Test"]:
      for i, item in enumerate(data):
          id = i+1
          name = item["attributes"]["REDC"]
          coordinates = item["geometry"]["rings"]
          coordinates_json = json.dumps(coordinates)
          updates.append({
              "id": id,
              column_name: name,
              "coordinates": coordinates_json,
          })
    
    if table_name in ["Utility Service Territories", "Utility Service Territories Test"]:
        for i, item in enumerate(data):
          id = i+1
          name = item["comp_full"]
          coordinates = item['the_geom']['coordinates']
          coordinates_json = json.dumps(coordinates)
          updates.append({
              "id": id,
              column_name: name,
              "coordinates": coordinates_json,
          })
    
    for i in range(0, len(updates), batch_size):
      batch = updates[i:i+batch_size]

      try:
        response = supabase_client.table(table_name).upsert(batch, on_conflict=['id']).execute()
        if response.data:
            print(f"Batch {i//batch_size + 1}: Successfully updated {len(batch)} rows in {table_name}")
        else:
            print(f"Batch {i//batch_size + 1}: No data returned for {table_name}")
      except Exception as e:
        print(f"Batch {i//batch_size + 1}: Failed to update {table_name} coordinates: {e}")
        return
    
def update_location_data():
    """
    Updates the coordinates of all location data in the database
    """
    county_data = query_county_locations()
    town_data = query_town_locations()
    region_data = query_region_locations()
    utility_data = query_utility_locations()
    state_senate_data = query_state_senate_locations()
    assembly_data = query_assembly_locations()

    update_table_data(county_data, "Counties Test", "county")
    update_table_data(town_data, "Towns Test", "town")
    update_table_data(region_data, "Regions Test", "region")
    update_table_data(utility_data, "Utilities Service Territories Test", "utility_service_territories")
    update_table_data(state_senate_data, "State Senate Districts Test", "state_senate_district")
    update_table_data(assembly_data, "Assembly Districts Test", "assembly_district")
    print("All location data updated successfully")

if __name__ == "__main__":
  update_location_data()
