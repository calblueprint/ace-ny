from fastapi import FastAPI, Response
from database import *

app = FastAPI()


@app.get("/favicon.ico")
def favicon():
    return Response(content=open("favicon.ico", "rb").read(), media_type="image/x-icon")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/nyserda_large")
async def run_nyserda_large():
    nyserda_large_to_database()
    return {"message": "Hello NYSERDA Large"}


@app.get("/nyserda_solar")
async def run_nyserda_solar():
    nyserda_solar_to_database()
    return {"message": "Hello NYSERDA Solar"}


@app.get("/nyiso")
async def run_nyiso():
    nyiso_to_database()
    return {"message": "Hello NYISO"}


@app.get("/ores_noi")
async def run_ores_noi():
    ores_noi_to_database()
    return {"message": "Hello ORES NOI"}


@app.get("/ores_under_review")
async def run_ores_under_review():
    ores_under_review_to_database()
    return {"message": "Hello ORES Under Review"}


@app.get("/ores_permitted")
async def run_ores_permitted():
    ores_permitted_to_database()
    return {"message": "Hello ORES Permitted"}
