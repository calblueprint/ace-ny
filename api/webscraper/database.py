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

def nyserda_large_to_database():
  database = []
  database.extend(query_nyserda_large()[0:10])
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
      if (project.get('latitude', None) is not None) and (project.get('longitude', None) is not None):
        geocodio_result = geocodio.reverse((project.get('latitude'), project.get('longitude')), fields=['stateleg']).get('results', None)
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
      if (project.get('latitude', None) is not None) and (project.get('longitude', None) is not None):
        geocodio_result = geocodio.reverse((project.get('latitude'), project.get('longitude')), fields=['stateleg']).get('results', None)
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

def nyiso_to_database():
  database = []
  database.extend(query_nyiso())
  for project in database:
    if project.get('proposed_cod', None) is not None:
      try:
        ymd = datetime.strptime(project.get('proposed_cod'), '%m-%Y').strftime('%Y-%m-%d')
      except Exception as exception:
        ymd = datetime.strptime(project.get('proposed_cod'), '%m/%Y').strftime('%Y-%m-%d')
      except Exception as exception:
        print(exception)
      project['proposed_cod'] = ymd
    if project.get('renewable_energy_technology', None) in renewable_energy_map.keys():
      project['renewable_energy_technology'] = renewable_energy_map[project.get('renewable_energy_technology')] # maps NYISO acronym to readable renewable energy tech
    existing_project = supabase.table("Projects_duplicate").select("*").eq("interconnection_queue_number", project['interconnection_queue_number']).execute()
    if len(existing_project.data) > 0:
      # TODO: define what fields we want to update
      try:
        response= supabase.table("Projects_duplicate").update(project).eq("interconnection_queue_number", project['interconnection_queue_number']).execute()
        print('UPDATE', response, '\n')
      except Exception as exception:
        print(exception)
    else:
      try:
        response = supabase.table("Projects_duplicate").insert(project).execute()
        print('INSERT', response, '\n')
      except Exception as exception:
        print(exception)

'''
For testing
'''
nyserda_large_to_database()
# nyserda_solar_to_database()
# nyiso_to_database()