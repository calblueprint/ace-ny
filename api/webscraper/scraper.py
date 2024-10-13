import requests
import json

def check_status(status):
    if status.lower() == 'cancelled':
        return 'Cancelled'
    elif status.lower() == 'operational' or status.lower() == 'completed':
        return 'Operational'
    else:
        return 'Proposed'

'''
This scrapes data from the NYSERDA Large-scale Renewable Projects database.
We filter for specific columns from the database's API and save them to a json file.
https://data.ny.gov/Energy-Environment/Large-scale-Renewable-Projects-Reported-by-NYSERDA/dprp-55ye/about_data
'''
nyserda_large_response = requests.get('https://data.ny.gov/resource/dprp-55ye.json')
large_data = nyserda_large_response.json()
filtered_large = [{'project_name': item.get('project_name', None), 
                'project_status': check_status(item.get('project_status', None)),
                'renewable_energy_technology': item.get('renewable_technology', None),
                # 'size': item.get('bid_quantity_mwh', None),
                'developer': item.get('developer', None),
                'proposed_cod': item.get('year_of_delivery_start_date', None),
                'county': item.get('county_province', None),
                'region': item.get('redc', None),
                'zipcode:': item.get('zip_code', None),
                'latitude': item.get('georeference')['coordinates'][0] if item.get('georeference', None) is not None else None,
                'longitude': item.get('georeference')['coordinates'][1] if item.get('georeference', None) is not None else None,
                'data_through_date': item.get('data_through_date', None),
                } for item in large_data if check_status(item.get('project_status', None)) != 'Cancelled']
with open('api/webscraper/nyserda_large.json', 'w') as file:
    json.dump(filtered_large, file, indent=4)


'''
This scrapes data from the NYSERDA Statewide Distributed Solar Projects database.
We filter for specific columns from the database's API and save them to a json file.
https://data.ny.gov/Energy-Environment/Statewide-Distributed-Solar-Projects-Beginning-200/wgsj-jt5f/about_data
'''
nyserda_small_response = requests.get('https://data.ny.gov/resource/wgsj-jt5f.json')
small_data = nyserda_small_response.json()

filtered_small = [{'project_name': item.get('project_id', ''), # small data set only has project_id
                'project_status': item.get('project_status', ''), # missing
                'renewable_energy_technology': 'Solar',
                # 'size': item.get('bid_quantity_mwh', None), # what to use for small solar data?
                'developer': item.get('developer', ''),
                'proposed_cod': item.get('interconnection_date', ''),
                'county': item.get('county', ''),
                'region': item.get('redc', ''), # missing
                'zipcode:': item.get('zip', ''),
                'latitude': item.get('georeference')['coordinates'][0] if item.get('georeference', None) is not None else None, # missing
                'longitude': item.get('georeference')['coordinates'][1] if item.get('georeference', None) is not None else None, # missing
                'data_through_date': item.get('data_through_date', ''),
                } for item in small_data if check_status(item.get('project_status', None)) != 'Cancelled']

with open('api/webscraper/nyserda_small.json', 'w') as file:
    json.dump(filtered_small, file, indent=4)

def query_nyserda_large():
  response = requests.get('https://data.ny.gov/resource/dprp-55ye.json')
  data = response.json()
  filtered_data = [{'project_name': item.get('project_name', None),
                  'project_status': check_status(item.get('project_status', None)),
                  'renewable_energy_technology': item.get('renewable_technology', None),
                  # 'size': item['bid_quantity_mwh'],
                  'developer': item.get('developer_name', None),
                  'proposed_cod': item.get('year_of_delivery_start_date', None),
                  'county': item.get('county_province', None),
                  'region': item.get('redc', None),
                  'zipcode:': item.get('zip_code', None),
                  'data_through_date': item.get('data_through_date', None),
                  'latitude': item.get('georeference')['coordinates'][0] if item.get('georeference', None) is not None else None,
                  'longitude': item.get('georeference')['coordinates'][1] if item.get('georeference', None) is not None else None,
                  } for item in data if check_status(item.get('project_status', None)) != 'Cancelled']
  return filtered_data