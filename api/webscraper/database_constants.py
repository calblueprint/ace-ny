# maps renewable energy strings to our app's renewable energy names
renewable_energy_map = {
    "Hydroelectric": "Hydroelectric",
    "Land Based Wind": "Land-Based Wind",
    "Offshore Wind": "Offshore Wind",
    "Solar": "Solar PV",
    "Geothermal": "Geothermal",
    "Energy Storage": "Energy Storage",
    "Pumped Storage": "Pumped Storage",
}

# maps NYISO abbreviations to renewable energy strings
renewable_energy_abbreviations = {
    "H": "Hydroelectric",
    "S": "Solar PV",
    "ES": "Energy Storage",
    "PS": "Pumped Storage",
    "W": "Land-Based Wind",
    "OSW": "Offshore Wind",
}

initial_kdm = [
    {"milestoneTitle": "Entry to NYISO Queue", "completed": False, "date": None},
    {
        "milestoneTitle": "Application for permit",
        "completed": False,
        "date": None,
    },
    {
        "milestoneTitle": "Issuance of permit",
        "completed": False,
        "date": None,
    },
    {
        "milestoneTitle": "Winning a contract award from NYSERDA",
        "completed": False,
        "date": None,
    },
    {
        "milestoneTitle": "Tendering of an Interconnection Agreement (IA)",
        "completed": False,
        "date": None,
    },
    {"milestoneTitle": "Start of operations", "completed": False, "date": None},
]

project_fields = [
    "project_name",
    "renewable_energy_technology",
    "project_status",
    "developer",
    "town",
    "county",
    "region",
    "size",
    "latitude",
    "longitude",
    "key_development_milestones",
    "project_image",
    "interconnection_queue_number",
    "approved",
    "state_senate_district",
    "assembly_district",
    "zipcode",
    "proposed_cod",
    "permit_process",
    "permit_application_number",
    "last_updated",
]
