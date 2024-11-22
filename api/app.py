from flask import Flask
from webscraper.database import *
from webscraper.nyserda_scraper import *

app = Flask(__name__)

# flask run --port 5328 --debug


@app.route("/api/hello", methods=["GET"])
def hello_world():
    return "Hello, World!"


@app.route("/api/nyserda_large", methods=["GET"])
async def run_nyserda_large():
    nyserda_large_to_database()
    return {"message": "Hello NYSERDA Large"}


@app.route("/api/nyserda_solar", methods=["GET"])
async def run_nyserda_solar():
    nyserda_solar_to_database()
    return {"message": "Helo NYSERDA Solar"}


@app.route("/api/nyiso", methods=["GET"])
async def run_nyiso():
    nyiso_to_database()
    return {"message": "Hello NYISO"}


@app.route("/api/ores_noi", methods=["GET"])
async def run_ores_noi():
    ores_noi_to_database()
    return {"message": "Hello ORES NOI"}


@app.route("/api/ores_under_review", methods=["GET"])
async def run_ores_under_review():
    ores_under_review_to_database()
    return {"message": "Hello ORES Under Review"}


@app.route("/api/ores_permitted", methods=["GET"])
async def run_ores_permitted():
    ores_permitted_to_database()
    return {"message": "Hello ORES Permitted"}


if __name__ == "__main__":
    app.run(port=5328, debug=True)
