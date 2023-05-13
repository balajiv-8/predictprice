from flask import Flask , request, jsonify
import util
from flask_cors import CORS, cross_origin
app= Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)


@app.route('/get_location_names' , methods=['GET'])
def get_location_names():
    response =jsonify({
        'locations':util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/predict_home_price', methods=['GET','POST'])
@cross_origin()
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = (request.form['location'])
    size =int(request.form['size'])
    bath = int(request.form['bath'])

    response =jsonify({
        'estimated_price': util.get_estimated_price(size,total_sqft,bath,location)
    })

    response.headers.add('Access-Control-Allow-Origin','*')

    return response




if __name__ =="__main__":
    print("Starting Python Flask Server For House Price Prediction..")
    util.load_saved_artifacts()
    app.run()