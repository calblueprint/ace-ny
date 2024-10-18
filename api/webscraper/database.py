from nyserda_scraper import query_nyserda_large, query_nyserda_small
from nyiso_scraper import query_nyiso
import json

import os
from supabase import create_client, Client

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)
database = []

database.extend(query_nyserda_large()[:10])
# database.append(query_nyserda_small()[:10])

# TODO: turn proposed_cod into date?
# TODO: dict of renewable energy technologies
# TODO: get assembly district, senate district, etc.
def nyserda_to_database():
  for project in database:
    project.pop('proposed_cod', None)
    existing_project = supabase.table("Projects_duplicate").select("*").eq("project_name", project['project_name']).execute()
    if len(existing_project.data) > 0:
      # update data
      try:
        response= supabase.table("Projects_duplicate").update(project).eq("project_name", project['project_name']).execute()
        print('UPDATE', response, '\n')
      except Exception as exception:
        print(exception)
    else:
      try:
        response = supabase.table("Projects_duplicate").insert(project).execute()
        print('INSERT', response, '\n')
      except Exception as exception:
        print(exception)

res = nyserda_to_database()
print(res)

# nyiso_response = query_nyiso()

# with open('api/webscraper/database.json', 'w') as file:
#   json.dump(database, file, indent=4)
#   file.write('\n')