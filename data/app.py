from flask import Flask, json, jsonify, request
from Algorithm import algorithm
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/selector', methods=['GET', 'POST'])
def selector():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'Missing input parameters'}), 400
    
    essential_modules = data.get('essential_modules')
    optional_modules = data.get('optional_modules')
    schools = data.get('schools')
    countries = data.get('countries')
    continents = data.get('continents')

    return jsonify(algorithm(essential_modules, optional_modules, schools, countries, continents))

@app.route('/hello', methods=['GET', 'POST'])
def hello():
    return "HELLO WORLD FROM FLASK"