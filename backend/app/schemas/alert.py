from datetime import datetime

from pydantic import BaseModel


class AlertResponse(BaseModel):
    id: int
    sensor_id: int
    noise_level: float
    threshold: float
    message: str
    status: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }