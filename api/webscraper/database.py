import json
import os
from datetime import datetime
from supabase import create_client, Client
from geocodio import GeocodioClient

from nyserda_scraper import query_nyserda_large, query_nyserda_solar
from nyiso_scraper import query_nyiso

renewable_energy_set = {'Hydroelectric', 'Land Based Wind', 'Offshore Wind', 'Solar', 'Geothermal', 'Energy Storage', 'Pumped Storage'}

renewable_energy_map = {
  'H': 'Hydroelectric',
  'S': 'Solar',
  'ES': 'Energy Storage',
  'PS': 'Pumped Storage',
  'OSW': 'Offshore Wind',
}

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)

geocode_api: str = os.environ.get("NEXT_PUBLIC_GEOCODIO_API_KEY")
geocodio = GeocodioClient(geocode_api)

# TODO: dict of renewable energy technologies
def nyserda_large_to_database():
  database = []
  database.extend(query_nyserda_large())
  for project in database:
    if project.get('proposed_cod', None) is not None:
      ymd = datetime.strptime(project.get('proposed_cod'), '%Y').strftime('%Y-%m-%d')
      project['proposed_cod'] = ymd
    existing_project = supabase.table("Projects_duplicate").select("*").eq("project_name", project['project_name']).execute()
    if len(existing_project.data) > 0:
      try:
        response= supabase.table("Projects_duplicate").update(project).eq("project_name", project['project_name']).execute()
        print('UPDATE', response, '\n')
      except Exception as exception:
        print(exception)
    else:
      geocodio_result = geocodio.reverse((project.get('latitude'), project.get('longitude')), fields=['cd', 'stateleg']).get('results', None)
      if geocodio_result is not None:
        location = geocodio_result[0]
        state_senate_district = int(location['fields']['state_legislative_districts']['senate'][0]['district_number'])
        assembly_district = int(location['fields']['state_legislative_districts']['house'][0]['district_number'])
        town = location['address_components']['city']

        project['state_senate_district'] = state_senate_district
        project['assembly_district'] = assembly_district
        project['town'] = town
      try:
        response = supabase.table("Projects_duplicate").insert(project).execute()
        print('INSERT', response, '\n')
      except Exception as exception:
        print(exception)

def nyserda_solar_to_database():
  database = []
  database.extend(query_nyserda_solar())
  for project in database:
    if project.get('proposed_cod', None) is not None:
      ymd = datetime.fromisoformat(project.get('proposed_cod')).strftime('%Y-%m-%d')
      project['proposed_cod'] = ymd
    existing_project = supabase.table("Projects_duplicate").select("*").eq("project_name", project['project_name']).execute()
    if len(existing_project.data) > 0:
      try:
        response= supabase.table("Projects_duplicate").update(project).eq("project_name", project['project_name']).execute()
        print('UPDATE', response, '\n')
      except Exception as exception:
        print(exception)
    else:
      geocodio_result = geocodio.reverse((project.get('latitude'), project.get('longitude')), fields=['cd', 'stateleg']).get('results', None)
      if geocodio_result is not None:
        location = geocodio_result[0]
        state_senate_district = int(location['fields']['state_legislative_districts']['senate'][0]['district_number'])
        assembly_district = int(location['fields']['state_legislative_districts']['house'][0]['district_number'])
        town = location['address_components']['city']

        project['state_senate_district'] = state_senate_district
        project['assembly_district'] = assembly_district
        project['town'] = town
      try:
        response = supabase.table("Projects_duplicate").insert(project).execute()
        print('INSERT', response, '\n')
      except Exception as exception:
        print(exception)

'''
For testing
'''
# nyserda_large_to_database()
# nyserda_solar_to_database()

# # nyiso_response = query_nyiso()

# # with open('api/webscraper/database.json', 'w') as file:
# #   json.dump(database, file, indent=4)
# #   file.write('\n')