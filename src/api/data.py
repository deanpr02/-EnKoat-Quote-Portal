import json
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()
roof_types = ['Foam', 'Tile', 'TPO', 'Wood', 'Composite', 'Metal']
states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

def random_date():
    start_date = datetime.now() - timedelta(days=5*365)
    random_days = random.randint(0, 5*365)
    date = start_date + timedelta(days=random_days)
    return date.strftime("%m/%d/%Y")

data = []
for _ in range(1000):
    obj = {
        "contractor_name": fake.name(),
        "company_name": fake.company(),
        "roof_size": random.randint(1000, 10000),
        "roof_type": random.choice(roof_types),
        "city": fake.city(),
        "state": random.choice(states),
        "date": random_date()
    }
    data.append(obj)

with open('contractors.json', 'w') as f:
    json.dump(data, f, indent=2)