import pickle
from fastapi import FastAPI
import pandas as pd
from pydantic import BaseModel
from typing import Dict


class InputData(BaseModel):
    place: Dict[str, float]
    temperature: Dict[str, float]
    pH: Dict[str, float]
    DO: Dict[str, float]
    conductivity: Dict[str, float]
    alkalinity: Dict[str, float]
    no2: Dict[str, float]
    nh4: Dict[str, float]
    po4: Dict[str, float]
    h2s: Dict[str, float]
    tss: Dict[str, float]
    cod: Dict[str, float]
    aeromonas_total: Dict[str, float]
    edwardsiella_ictaluri: Dict[str, float]
    aeromonas_hydrophila: Dict[str, float]
    coliform: Dict[str, float]
    # water_quality: Dict[str, float]

with open("model_v2.pkl", 'rb') as f:
    my_model_clf = pickle.load(f)

app = FastAPI()

@app.post("/test")
def read_items(data: InputData):
    
    df = pd.DataFrame({k: list(v.values())[0] for k, v in data.dict().items()}, index=[0])
    
    
    prediction = my_model_clf.predict(df)
    

    return {"prediction": prediction.tolist()}

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
