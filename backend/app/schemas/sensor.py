from pydantic import BaseModel
from datetime import datetime


class SensorCreate(BaseModel):
    name: str
    location: str
    latitude: float
    longitude: float


class SensorUpdate(BaseModel):
    name: str
    location: str
    latitude: float
    longitude: float
    status: str
    current_noise: float


class SensorResponse(BaseModel):
    id: int
    name: str
    location: str
    latitude: float
    longitude: float
    status: str
    current_noise: float
    created_at: datetime

    model_config = {
        "from_attributes": True
    }