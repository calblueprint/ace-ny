import requests
import json
from utils.scraper_utils import check_status, geocode_lat_long

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
      if check_status(item.get('project_status', None)) != 'Cancelled':
        project_dict = {'project_name': item.get('project_name', None),
                        'project_status': check_status(item.get('project_status', None)), 
                        'renewable_energy_technology': item.get('renewable_technology', None),
                        'size': item.get('new_renewable_capacity_mw', None),
                        'developer': item.get('developer', None),
                        'proposed_cod': item.get('year_of_delivery_start_date', None),
                        'county': item.get('county_province', None),
                        'region': item.get('redc', None),
                        'zipcode:': item.get('zip_code', None),
                        'latitude': item.get('georeference')['coordinates'][0] if item.get('georeference', None) is not None else None,
                        'longitude': item.get('georeference')['coordinates'][1] if item.get('georeference', None) is not None else None,
                        'data_through_date': item.get('data_through_date', None),
                        'interconnection_queue_number': item.get('interconnection_queue_number', None),
                        'key_development_milestones': None,
                        'project_image': None,
                        'approved': False
        }
        filtered_list.append(project_dict)
    return filtered_list

def write_large_to_json():
  nyserda_large_filtered_list = query_nyserda_large()

  with open('api/webscraper/nyserda_large.json', 'w') as file:
    json.dump(nyserda_large_filtered_list, file, indent=4)
    file.write('\n')

'''
This scrapes data from the NYSERDA Statewide Distributed Solar Projects database.
We filter for specific columns from the database's API and save them to a json file.
https://data.ny.gov/Energy-Environment/Statewide-Distributed-Solar-Projects-Beginning-200/wgsj-jt5f/about_data

geocode_lat_long is a helper util function that uses the google maps geocoding api to get the estimated
latitude and longitude of a project based on the town
'''
def query_nyserda_small():
  nyserda_small_response = requests.get('https://data.ny.gov/resource/wgsj-jt5f.json')
  if nyserda_small_response.status_code != 200:
    raise ValueError('Request to NYSERDA failed. Status code: %d\n%s' % (nyserda_small_response.status_code, nyserda_small_response.text))
  else:
    small_data = nyserda_small_response.json()
    filtered_list = []

    for item in small_data:
      if check_status(item.get('project_status', None)) != 'Cancelled':
        if item.get('city_town', None) is not None:
          lat, long = geocode_lat_long(f'{item.get('city_town')}, NY')
        else:
          lat, long = None, None
        project_dict = {'project_name': item.get('project_id', None), # small data set only has project_id
                        'project_status': check_status(item.get('project_status', None)), # missing
                        'renewable_energy_technology': 'Solar',
                        'size': item.get('pv_system_size_kw', None),
                        'developer': item.get('developer', None),
                        'proposed_cod': item.get('interconnection_date', None),
                        'county': item.get('county', None),
                        'region': item.get('redc', None), # missing
                        'zipcode:': item.get('zip', None),
                        'latitude': lat,
                        'longitude': long,
                        'data_through_date': item.get('data_through_date', None),
                        'key_development_milestones': None,
                        'project_image': None,
                        'approved': False
        }
        filtered_list.append(project_dict)
    return filtered_list
  
def write_small_to_json():
  filtered_list = query_nyserda_small() 

  with open('api/webscraper/nyserda_small.json', 'w') as file:
      json.dump(filtered_list, file, indent=4)
      file.write('\n')