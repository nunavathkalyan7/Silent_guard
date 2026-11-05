from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Alert(Base):
    __tablename__ = "alerts"

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

    threshold = Column(
        Float,
        nullable=False
    )

    message = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="Active",
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        index=True
    )