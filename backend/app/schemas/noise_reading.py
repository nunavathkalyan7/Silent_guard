from datetime import datetime

from pydantic import BaseModel


class NoiseReadingCreate(BaseModel):
    sensor_id: int
    noise_level: float


class NoiseReadingResponse(BaseModel):
    id: int
    sensor_id: int
    noise_level: float
    recorded_at: datetime

    model_config = {
        "from_attributes": True
    }