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


if __name__ == "__main__":
    app.run(port=5328, debug=True)
