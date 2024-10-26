import requests
import pandas as pd
from io import BytesIO
import json
from utils.scraper_utils import clean_df_data

renewable_energy_set = {'Hydroelectric', 'Land Based Wind', 'Offshore Wind', 'Solar', 'Geothermal', 'Energy Storage', 'Pumped Storage'}

renewable_energy_map = {
  'H': 'Hydroelectric',
  'S': 'Solar',
  'ES': 'Energy Storage',
  'PS': 'Pumped Storage',
  'OSW': 'Offshore Wind',
}

def query_nyiso():
  nyiso = requests.get('https://www.nyiso.com/documents/20142/1407078/NYISO-Interconnection-Queue.xlsx')
  nyiso_data = nyiso.content
  nyiso_df = pd.read_excel(BytesIO(nyiso_data))

  # TODO: if needed later, here is the code to read the data by sheets

  # all_sheets = pd.read_excel(BytesIO(nyiso_data), sheet_name=None)

  # sheet_names = list(all_sheets.keys())
  # interconnection_queue_key = sheet_names[0]
  # cluster_projects_key = sheet_names[1]

  # interconnection_queue_df = all_sheets[interconnection_queue_key] # Interconnection Queue
  # cluster_projects_df = all_sheets[cluster_projects_key] # Cluster Projects

  # interconnection_queue_df = clean_df_data(interconnection_queue_df)
  # cluster_projects_df = clean_df_data(cluster_projects_df)

  # interconnection_queue_dict = interconnection_queue_df.to_dict(orient='records')
  # cluster_projects_dict = cluster_projects_df.to_dict(orient='records')

  nyiso_df.dropna(subset=['Project Name'], inplace=True) # drops rows of xlsx that don't correspond to project data
  nyiso_df = nyiso_df.where(pd.notna(nyiso_df), None) # replaces NaN values with None
  nyiso_df.replace(to_replace=['', 'N/A', 'n/a', 'NAN', 'n/a'], value=None, inplace=True)
  nyiso_list = nyiso_df.to_dict(orient='records')

  filtered_list = []
  for item in nyiso_list:
     if item.get('Type/ Fuel', None) not in renewable_energy_map.keys():
       continue
     project_dict = {'project_name': item.get('Project Name', None),
                      'project_status': 'Proposed', # TODO: update this based on which sheet it's from
                      'renewable_energy_technology': renewable_energy_map[item.get('Type/ Fuel')], # map abbreviations into readable string
                      'size': item.get('SP (MW)', None),
                      'developer': item.get('Developer Name', None),
                      'proposed_cod': item.get('Proposed COD', None), # note: non-serializable into JSON --> can't directly write to file
                      'county': item.get('County', None),
                      'region': None, # missing
                      'zipcode': None, # missing
                      'latitude': None,
                      'longitude': None,
                      # 'data_through_date': item.get('Last Updated Date', None),
                      'key_development_milestones': None,
                      'project_image': None,
                      'interconnection_queue_number': item.get('Queue Pos.', None),
                      'approved': False
        }
     filtered_list.append(project_dict)
        
  return filtered_list

print(query_nyiso())

def write_nyiso_to_json():
  data = query_nyiso()
  print(data)
  with open('api/webscraper/nyiso.json', 'w') as file:
      json.dump(data, file, indent=4)
      file.write('\n')

'''
For testing
'''
# write_nyiso_to_json()