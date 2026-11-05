from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Sensor(Base):
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    location = Column(String(200), nullable=False)

    latitude = Column(Float, nullable=False)

    longitude = Column(Float, nullable=False)

    status = Column(String(20), default="Offline")

    current_noise = Column(Float, default=0)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    noise_threshold = Column(
    Float,
    default=85.0,
    nullable=False
)