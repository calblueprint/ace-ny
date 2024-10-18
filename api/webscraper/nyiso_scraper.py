import requests
import pandas as pd
from io import BytesIO

def query_nyiso():
  nyiso = requests.get('https://www.nyiso.com/documents/20142/1407078/NYISO-Interconnection-Queue.xlsx')
  nyiso_data = nyiso.content
  nyiso_df = pd.read_excel(BytesIO(nyiso_data))

  nyiso_list = nyiso_df.to_dict(orient='records')