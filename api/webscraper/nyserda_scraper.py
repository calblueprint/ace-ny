import requests
import json
from utils.scraper_utils import check_status, geocode_lat_long, standardize_label

renewable_energy_set = {'Hydroelectric', 'Land Based Wind', 'Offshore Wind', 'Solar', 'Geothermal', 'Energy Storage', 'Pumped Storage'}

renewable_energy_map = {
  'H': 'Hydroelectric',
  'S': 'Solar',
  'ES': 'Energy Storage',
  'PS': 'Pumped Storage',
  'OSW': 'Offshore Wind',
}

'''
This scrapes data from the NYSERDA Large-scale Renewable Projects database.
We filter for specific columns from the database's API and save them to a json file.
https://data.ny.gov/Energy-Environment/Large-scale-Renewable-Projects-Reported-by-NYSERDA/dprp-55ye/about_data
'''
def query_nyserda_large():
  nyserda_large_response = requests.get('https://data.ny.gov/resource/dprp-55ye.json')
  if nyserda_large_response.status_code != 200:
    raise ValueError('Request to NYSERDA failed. Status code: %d\n%s' % (nyserda_large_response.status_code, nyserda_large_response.text))
  else:
    large_data = nyserda_large_response.json()
    filtered_list = []
    for item in large_data:
      item['renewable_technology'] = (standardize_label(item.get('renewable_technology')) if item.get('renewable_technology', None) is not None else None)
      if check_status(item.get('project_status', None)) != 'Cancelled' and item.get('renewable_technology', None) in renewable_energy_set:
        project_dict = {'project_name': item.get('project_name', None),
                        'project_status': check_status(item.get('project_status', None)), 
                        'renewable_energy_technology': item.get('renewable_technology', None),
                        'developer': item.get('developer_name', None),
                        'proposed_cod': item.get('year_of_delivery_start_date', None),
                        'county': item.get('county_province', None),
                        'region': item.get('redc', None),
                        'zipcode': item.get('zip_code', None),
                        'latitude': item.get('georeference')['coordinates'][1] if item.get('georeference', None) is not None else None,
                        'longitude': item.get('georeference')['coordinates'][0] if item.get('georeference', None) is not None else None,
                        # 'data_through_date': item.get('data_through_date', None),
                        'permit_process': item.get('permit_process', None),
                        'interconnection_queue_number': item.get('interconnection_queue_number', None),
                        'key_development_milestones': None,
                        'project_image': None,
                        'approved': False
        }
        filtered_list.append(project_dict)
    return filtered_list

def write_large_to_json():
  nyserda_large_filtered_list = query_nyserda_large()
  print(nyserda_large_filtered_list)

  with open('api/webscraper/nyserda_large.json', 'w') as file:
    json.dump(nyserda_large_filtered_list, file, indent=4)
    file.write('\n')

write_large_to_json()
'''
This scrapes data from the NYSERDA Statewide Distributed Solar Projects database.
We filter for specific columns from the database's API and save them to a json file.
https://data.ny.gov/Energy-Environment/Statewide-Distributed-Solar-Projects-Beginning-200/wgsj-jt5f/about_data

geocode_lat_long is a helper util function that uses the google maps geocoding api to get the estimated
latitude and longitude of a project based on the town
'''
def query_nyserda_solar(offset=0, limit=1000):
  nyserda_small_response = requests.get(f'https://data.ny.gov/resource/wgsj-jt5f.json?$limit={limit}&$offset={offset}')
  if nyserda_small_response.status_code != 200:
    raise ValueError('Request to NYSERDA failed. Status code: %d\n%s' % (nyserda_small_response.status_code, nyserda_small_response.text))
  else:
    small_data = nyserda_small_response.json()
    filtered_list = []

    for item in small_data:
      size_in_mw = None
      if item.get('pv_system_size_kwac', None) is not None:
        size_in_mw = float(item.get('pv_system_size_kwac')) * 0.001
      elif item.get('estimated_pv_system_size', None) is not None:
        size_in_mw = float(item.get('estimated_pv_system_size')) * 0.001
      
      if size_in_mw is None or size_in_mw < 2:
        continue

      if check_status(item.get('project_status', None)) != 'Cancelled':
        if item.get('city_town', None) is not None:
          lat, long = geocode_lat_long(f'{item.get('city_town')}, NY')
        else:
          lat, long = None, None
        project_dict = {'project_name': item.get('project_id', None), # small data set only has project_id
                        'project_status': check_status(item.get('project_status', None)), # missing
                        'renewable_energy_technology': 'Solar',
                        'size': size_in_mw,
                        'developer': item.get('developer', None),
                        'proposed_cod': item.get('interconnection_date', None),
                        'county': item.get('county', None),
                        'region': item.get('redc', None), # missing
                        'zipcode': item.get('zip', None),
                        'latitude': lat,
                        'longitude': long,
                        # 'data_through_date': item.get('data_through_date', None),
                        'key_development_milestones': None,
                        'project_image': None,
                        'approved': False
        }
        filtered_list.append(project_dict)
    return filtered_list
  
'''
The NYSERDA Statewide Distributed Solar Projects database has 230,000 records
However, the API has a default limit of 1,000 rows.
This function repeatedly queries the API with different offsets to get all the records.
'''
def query_nyserda_solar_repeat():
  # TODO: get the total number of records from the database by HTML parsing
  length = 250000
  limit = 1000

  epochs = length // limit
  if length % limit != 0:
    epochs += 1

  projects = []

  for i in range(epochs):
    offset = i * limit
    result = query_nyserda_solar(offset, limit)
    projects.extend(result)

  return projects
    
def write_small_to_json():
  project_list = query_nyserda_solar_repeat() 

  with open('api/webscraper/nyserda_small.json', 'w') as file:
      json.dump(project_list, file, indent=4)
      file.write('\n')
