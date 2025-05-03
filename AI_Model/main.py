import pickle
from fastapi import FastAPI
import pandas as pd
from pydantic import BaseModel
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
import json
from sqlalchemy import create_engine, text, Table, MetaData, update
import pymysql

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

with open("model_v2.pkl", 'rb') as f:
    my_model_clf = pickle.load(f)

app = FastAPI()

# Cấu hình CORS
origins = [
    "http://localhost:3000",  # Địa chỉ React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Cho phép chỉ từ React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức (GET, POST, PUT...)
    allow_headers=["*"],  # Cho phép tất cả các header
)

DB_URI = "mysql+pymysql://root:IKSzaRZEQpcOoUNdzTVgHzibDYptqDip@ballast.proxy.rlwy.net:50205/railway"

def get_data_count(engine):
    with engine.connect() as conn:
        result = conn.execute(text("SELECT COUNT(*) FROM alldata"))
        count = result.scalar()
        return count

def train_model(df):
    xgboost = XGBRegressor()
    model = xgboost.fit(df.drop(columns=["wqi", 'water_quality', 'id', 'province', 'district', 'observation_point', 'date', 'coordinate']), df["wqi"])
    return model

def save_model(model, path="./model_v2.pkl"):
    with open(path, "wb") as f:
        pickle.dump(model, f)
    print(f"Model saved to {path}")

def retrain_model(df, model_path="./model_v2.pkl"):
    model = train_model(df)
    save_model(model, model_path)

@app.post("/test")
def read_items(data: InputData):
    engine = create_engine(DB_URI)
    c = pd.read_sql("SELECT * FROM retrain", engine)["count"][0]
    data_count = get_data_count(engine)

    if data_count *0.05 < c:
        dfr = pd.read_sql("SELECT * FROM alldata", engine)
        retrain_model(dfr)
        metadata = MetaData()
        metadata.reflect(bind=engine)

        # Load bảng
        retrain = Table("retrain", metadata, autoload_with=engine)

        # Update bản ghi có id = 1
        stmt = (
            update(retrain)
            .where(retrain.c.id == 1)
            .values(count=0)
        )

        with engine.connect() as conn:
            conn.execute(stmt)
            conn.commit()
    df = pd.DataFrame({k: list(v.values())[0] for k, v in data.dict().items()}, index=[0])
    prediction = my_model_clf.predict(df)
    return {"prediction": prediction.tolist()}

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
