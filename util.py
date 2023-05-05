import json
import pickle

import numpy as np

__locations = None
__data_columns =None
__model =None

def get_estimated_price(size,total_sqft,bath,location):
    try:
        location_indx = __data_columns.index(location.lower())
    except:
        location_indx=-1  

    predict_x = np.zeros(len(__data_columns))
    predict_x[0] = size
    predict_x[1] = total_sqft
    predict_x[2] = bath
    if location_indx >= 0:
        predict_x[location_indx]=1
    
    return round(__model.predict([predict_x])[0],2)
    

def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __locations

    with open("./artifacts/columns.json",'r') as f :
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]
    
    global __model
    with open("./artifacts/priceprediction.pickle",'rb') as f:
        __model = pickle.load(f)
    print("loading saved artifacts...done")



if __name__ =="__main__":
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price(2,2000,2,'Rajaji nagar'))