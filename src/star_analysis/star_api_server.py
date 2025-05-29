from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .weather_api_model_prediction import get_7day_stargazing_forecast

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all. Restrict in production.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/stargazing-forecast")
def stargazing_forecast():
    return get_7day_stargazing_forecast()
