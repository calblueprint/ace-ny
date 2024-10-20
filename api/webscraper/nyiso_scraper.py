import requests
import pandas as pd
from io import BytesIO
import json

def query_nyiso():
  nyiso = requests.get('https://www.nyiso.com/documents/20142/1407078/NYISO-Interconnection-Queue.xlsx')
  nyiso_data = nyiso.content
  nyiso_df = pd.read_excel(BytesIO(nyiso_data))
  nyiso_df.dropna(subset=['Project Name'], inplace=True) # drops rows of xlsx that don't correspond to project data
  nyiso_df.fillna(None, inplace=True) # replaces NaN values with empty strings
  nyiso_df.replace(to_replace=['', 'N/A', 'n/a', 'NAN', 'n/a'], value=None, inplace=True)
  nyiso_list = nyiso_df.to_dict(orient='records')

  filtered_list = []
  for item in nyiso_list:
     project_dict = {'project_name': item.get('Project Name', None),
                      'project_status': 'Proposed', # missing
                      'renewable_energy_technology': item.get('Type/ Fuel', None),
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