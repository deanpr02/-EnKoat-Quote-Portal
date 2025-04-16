import json
import random
from faker import Faker
from datetime import datetime, timedelta
import pandas as pd

fake = Faker()
roof_types = ['Foam', 'Tile', 'TPO', 'Wood', 'Composite', 'Metal']
states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

def random_date():
    start_date = datetime.now() - timedelta(days=5*365)
    random_days = random.randint(0, 5*365)
    date = start_date + timedelta(days=random_days)
    return date.strftime("%m/%d/%Y")

"""
Extract city and bounds data from our csv files
"""
def extract_csv_data():
    cities_df = pd.read_csv('./src/api/uscities.csv')
    bounds_df = pd.read_csv('./src/api/US_State_Bounding_Boxes.csv')

    #dictionary to hold our state data such as: cities, bound information
    states_obj = {}

    for state in states:
        states_obj[state] = {}

        state_cities = cities_df[cities_df['state_id'] == state]
        bounding_box = bounds_df[bounds_df['STUSPS'] == state]

        top_cities = state_cities.sort_values(by='population',ascending=False).head(15)

        states_obj[state]['cities'] = {}
        for idx, city_obj in top_cities.iterrows():
            city_name = city_obj['city']

            states_obj[state]['cities'][city_name] = {}
            states_obj[state]['cities'][city_name]['long'] = city_obj['lng']
            states_obj[state]['cities'][city_name]['lat'] = city_obj['lat']

        for idx, bounds_obj in bounding_box.iterrows():
            states_obj[state]['left'] = bounds_obj['xmin']
            states_obj[state]['right'] = bounds_obj['xmax']
            states_obj[state]['top'] = bounds_obj['ymax']
            states_obj[state]['bottom'] = bounds_obj['ymin']

    with open('states.json','w') as f:
        f.write(json.dumps(states_obj))

    return states_obj

def generate_random_quotes(states_obj):
    data = []
    for _ in range(1000):
        random_state = random.choice(states)
        state_cities = states_obj[random_state]['cities']
        random_key = random.choice(list(state_cities.keys()))

        obj = {
            "contractor_name": fake.name(),
            "company_name": fake.company(),
            "roof_size": random.randint(1000, 10000),
            "roof_type": random.choice(roof_types),
            "city": random_key,
            "state": random_state,
            "date": random_date()
        }
        data.append(obj)

    with open('contractors.json', 'w') as f:
        json.dump(data, f, indent=2)



if __name__ == '__main__':
    obj = extract_csv_data()
    generate_random_quotes(obj)

