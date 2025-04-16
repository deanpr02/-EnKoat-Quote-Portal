from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contractor_name = db.Column(db.String(50), nullable=False, unique=False)
    company_name = db.Column(db.String(50), nullable=False, unique=False)
    roof_size = db.Column(db.Integer, nullable=False, unique=False)
    roof_type = db.Column(db.String(20), nullable=False, unique=False)
    city = db.Column(db.String(20), nullable=False, unique=False)
    state = db.Column(db.String(20), nullable=False, unique=False)
    date = db.Column(db.String(10), nullable=False, unique=False)

    def __repr__(self):
        return f'Company name: {self.company_name} Contractor: {self.company_name} in {self.city}, {self.state}'