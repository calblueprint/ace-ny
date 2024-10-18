from nyserda_scraper import query_nyserda_large, query_nyserda_small
from nyiso_scraper import query_nyiso
import json

database = []

database.append(query_nyserda_large()[:10])
database.append(query_nyserda_small()[:10])

print(database)

nyiso_response = query_nyiso()

with open('api/webscraper/database.json', 'w') as file:
  json.dump(database, file, indent=4)
  file.write('\n')