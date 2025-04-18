import json
import os
from data import create_json_data
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db, Quote
import config
from sqlalchemy import func

#constant data
STATES = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
MONTHS = {
    '01': 'Jan.',
    '02': 'Feb.',
    '03': 'Mar.',
    '04': 'Apr.',
    '05': 'May',
    '06': 'Jun.',
    '07': 'Jul.',
    '08': 'Aug.',
    '09': 'Sep.',
    '10': 'Oct.',
    '11': 'Nov.',
    '12': 'Dec.'
}


app = Flask(__name__)
CORS(app)

app.config.from_object(config)

db.init_app(app)


@app.route('/api/add_data',methods=['POST'])
def add_quote():
    """
    Adds a quote to the database
    """
    data = request.get_json()
    contractor_name = data['contractorName']
    company_name = data['companyName']
    roof_size = data['roofSize']
    roof_type = data['roofType']
    city = data['city']
    state = data['state']
    date = data['date']

    try:
        q = Quote(contractor_name=contractor_name,company_name=company_name,roof_size=roof_size,roof_type=roof_type,city=city,state=state,date=date)
        db.session.add(q)
        db.session.commit()
        return jsonify({'status':'success'},201)
    except:
        return {'failed'},400
    


@app.route('/api/get_quotes',methods=['GET'])
def get_database():
    """
    Fetches all the quotes from the database
    """
    quotes = Quote.query.all()

    quotes_list = []
    for q in quotes:
        quotes_list.append(
            {
                'id': q.id,
                'contractor_name': q.contractor_name,
                'company_name': q.company_name,
                'roof_size': q.roof_size,
                'roof_type': q.roof_type,
                'city': q.city,
                'state': q.state,
                'date': q.date
            }
        )
        
    return jsonify(quotes_list)


@app.route('/api/state_totals',methods=['GET'])
def get_state_totals():
    """
    Calculates the amount of quotes for each state in the U.S.

    Return:
    JSON -> [{'x':str,'y':int},...]
    """
    state_totals = []
    for state in STATES:
        state_quotes = Quote.query.filter_by(state=state).all()
        state_totals.append({'x':state,'y':len(state_quotes)})
    
    return jsonify(state_totals)


@app.route('/api/roof_types',methods=['GET'])
def get_roof_types():
    """
    Calculates the number of quotes with each roof type

    Return:
    JSON -> [{'value':int,'label':str},...]
    """
    roof_types = ['Foam', 'Tile', 'TPO', 'Wood', 'Composite', 'Metal']
    roof_obj = []
    for roof_type in roof_types:
        type_q = Quote.query.filter_by(roof_type=roof_type).all()
        roof_obj.append({'value':len(type_q),'label':roof_type})
    
    return jsonify(roof_obj)


@app.route('/api/month_totals',methods=['GET'])
def get_month_totals():
    """
    Calculates how many quotes are in the database for each month in the year

    Return:
    JSON -> [{'month':str,'count':int},...]
    """
    monthly_totals = db.session.query(
        func.substr(Quote.date, 1, 2).label('month'),
        func.count(Quote.id).label('count')
    ).group_by('month').all()

    month_totals = [{'month': MONTHS[row.month],'count':row.count} for row in monthly_totals]

    return jsonify(month_totals)


@app.route('/api/all_city_totals', methods=['GET'])
def get_all_city_totals():
    """
    Gets quote counts for all cities in all states
    
    Returns:
    JSON -> {
        "CA": [{"city": "Los Angeles", "count": 42}, ...],
        "AZ": [{"city": "Phoenix", "count": 15}, ...],
        ...
    }
    """
    city_counts = db.session.query(
        Quote.state,
        Quote.city,
        func.count(Quote.id).label('count')
    ).group_by(Quote.state, Quote.city).all()

    result = {}
    for state, city, count in city_counts:
        if state not in result:
            result[state] = {}
        result[state].update({city: count})
    
    return jsonify(result)


def preload_database():
    """
    Preloads our database with randomly generated quote data in the contractors.json file
    """
    with open('./contractors.json','r') as f:
        data = json.load(f)
    
    for item in data:
        q = Quote(contractor_name=item['contractor_name'],company_name=item['company_name'],roof_size=item['roof_size'],roof_type=item['roof_type'],city=item['city'],state=item['state'],date=item['date'])
        db.session.add(q)
    db.session.commit()
    print('Database successfully loaded')


if __name__ == '__main__':
    #generate our random quotes to fill in our database
    if not os.path.exists('./contractors.json') or not os.path.exists('./states.json'):
        create_json_data()

    with app.app_context():
        db.create_all()
        
        is_empty = db.session.query(Quote.id).first() is None
        if(is_empty):
            print('Database is empty, initializing database with 1000 random values')
            preload_database()
    app.run(debug=True,port=5000)
