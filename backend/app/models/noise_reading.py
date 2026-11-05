from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class NoiseReading(Base):
    __tablename__ = "noise_readings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    sensor_id = Column(
        Integer,
        ForeignKey("sensors.id"),
        nullable=False,
        index=True
    )

    noise_level = Column(
        Float,
        nullable=False
    )

    recorded_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        index=True
    )