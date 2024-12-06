import os
from dotenv import load_dotenv
from flask import Flask
from webscraper.database import *
from webscraper.nyserda_scraper import *
import smtplib
from email.message import EmailMessage

app = Flask(__name__)

# flask run --port 5328 --debug

load_dotenv(os.path.join(os.path.dirname(__file__), "../.env.local"))
aceny_app_password = os.environ.get("NEXT_PUBLIC_ACENY_APP_PASSWORD")
aceny_email = os.environ.get("NEXT_PUBLIC_ACENY_EMAIL")
retool_link = os.environ.get(
    "NEXT_PUBLIC_RETOOL_LINK"
)  # TODO: update this to be the right retool link


@app.route("/api/hello", methods=["GET"])
def hello_world():
    return "Hello, World!"


@app.route("/api/nyserda_large", methods=["GET"])
async def run_nyserda_large():
    result = nyserda_large_to_database()
    print("result", result)
    return {"message": "Hello NYSERDA Large"}


@app.route("/api/nyserda_solar", methods=["GET"])
async def run_nyserda_solar():
    result = nyserda_solar_to_database()
    return {"message": "Helo NYSERDA Solar"}


@app.route("/api/nyiso", methods=["GET"])
async def run_nyiso():
    result = nyiso_to_database()
    return {"message": "Hello NYISO"}


@app.route("/api/ores_noi", methods=["GET"])
async def run_ores_noi():
    result = ores_noi_to_database()
    return {"message": "Hello ORES NOI"}


@app.route("/api/ores_under_review", methods=["GET"])
async def run_ores_under_review():
    result = ores_under_review_to_database()
    return {"message": "Hello ORES Under Review"}


@app.route("/api/ores_permitted", methods=["GET"])
async def run_ores_permitted():
    result = ores_permitted_to_database()
    return {"message": "Hello ORES Permitted"}


@app.route("/api/merge", methods=["GET"])
async def run_merge():
    result = merge_projects()
    return {"message": "Hello Merge"}


@app.route("/api/run", methods=["GET"])
async def run_webscraper():
    inserted_ids = set()
    updated_ids = set()

    # TODO: uncomment out for testing
    nyserda_result = nyserda_large_to_database()
    inserted_ids.update(nyserda_result["inserted_ids"])
    updated_ids.update(nyserda_result["updated_ids"])

    # nyserda_solar_result = nyserda_solar_to_database()
    # inserted_ids.update(nyserda_solar_result["inserted_ids"])
    # updated_ids.update(nyserda_solar_result["updated_ids"])

    # nyiso_result = nyiso_to_database()
    # inserted_ids.update(nyiso_result["inserted_ids"])
    # updated_ids.update(nyiso_result["updated_ids"])

    ores_noi_result = ores_noi_to_database()
    inserted_ids.update(ores_noi_result["inserted_ids"])
    updated_ids.update(ores_noi_result["updated_ids"])

    # ores_under_review_result = ores_under_review_to_database()
    # inserted_ids.update(ores_under_review_result["inserted_ids"])
    # updated_ids.update(ores_under_review_result["updated_ids"])

    # ores_permitted_result = ores_permitted_to_database()
    # inserted_ids.update(ores_permitted_result["inserted_ids"])
    # updated_ids.update(ores_permitted_result["updated_ids"])

    merge_results = merge_projects()
    for deleted_id in merge_results["deleted_ids"]:
        # remove the deleted id from the sets. discard will not raise an error if the deleted_id isn't in the set
        inserted_ids.discard(deleted_id)
        updated_ids.discard(deleted_id)

    mail_id = aceny_email
    password = aceny_app_password
    address_to = "deenasun@berkeley.edu"
    msg = EmailMessage()
    content = f"""
Dear ACE NY Staff,

This is an automated email to inform you that the webscraper for the Renewable Energy Projects Database has just been run. There are currently {len(updated_ids)} updated projects and {len(inserted_ids)} new projects pending approval in the administrative dashboard here {retool_link}

Please make any necessary amendments and approve the projects at this link: {retool_link}
    """
    msg.set_content(content)
    msg["Subject"] = (
        f"[IMPORTANT] {len(updated_ids) + len(inserted_ids)} Projects Pending Approval"
    )
    msg["From"] = mail_id
    msg["To"] = address_to
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(mail_id, password)
    server.send_message(msg)
    server.quit()
    return {"message": "Hello Webscraper"}


if __name__ == "__main__":
    app.run(port=5328, debug=True)
