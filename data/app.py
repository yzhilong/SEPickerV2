from flask import Flask, json, jsonify, request
from flask.helpers import send_from_directory
from Algorithm import algorithm
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="../build", static_url_path="")
# app = Flask(__name__)

CORS(app)

@app.route('/backend', methods=['GET', 'POST'])
@cross_origin()
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
@cross_origin()
def hello():
    return "HELLO WORLD FROM FLASK"

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/favourites')
@cross_origin()
def serve_favourites():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run()