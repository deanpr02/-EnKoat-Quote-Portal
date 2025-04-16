from flask import Flask, render_template, request, redirect, jsonify
from flask_cors import CORS
from database import db, Quote
import config

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config.from_object(config)

db.init_app(app)

@app.route('/api/add_data',methods=['POST'])
def add_quote():
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True,port=5000)
