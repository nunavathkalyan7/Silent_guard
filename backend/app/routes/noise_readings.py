from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.noise_reading import NoiseReading
from app.models.sensor import Sensor
from app.models.alert import Alert
from app.models.user import User

from app.schemas.noise_reading import (
    NoiseReadingCreate,
    NoiseReadingResponse
)

from app.auth.current_user import get_current_user


router = APIRouter(
    prefix="/readings",
    tags=["Noise Readings"]
)


# ==========================================
# CREATE NOISE READING
# ==========================================

@router.post(
    "/",
    response_model=NoiseReadingResponse,
    status_code=201
)
def create_reading(
    reading: NoiseReadingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Find sensor

    sensor = db.query(Sensor).filter(
        Sensor.id == reading.sensor_id
    ).first()

    if not sensor:
        raise HTTPException(
            status_code=404,
            detail="Sensor not found"
        )


    # Create reading

    new_reading = NoiseReading(
        sensor_id=reading.sensor_id,
        noise_level=reading.noise_level
    )

    db.add(new_reading)


    # Update current sensor noise

    sensor.current_noise = reading.noise_level


    # ==========================================
    # CHECK NOISE THRESHOLD
    # ==========================================

    if reading.noise_level > sensor.noise_threshold:

        alert = Alert(
            sensor_id=sensor.id,
            noise_level=reading.noise_level,
            threshold=sensor.noise_threshold,
            message=(
                f"Noise level {reading.noise_level} dB "
                f"exceeded threshold of "
                f"{sensor.noise_threshold} dB"
            ),
            status="Active"
        )

        db.add(alert)


    # Save everything

    db.commit()

    db.refresh(new_reading)

    return new_reading


# ==========================================
# GET READINGS FOR SENSOR
# ==========================================

@router.get(
    "/{sensor_id}",
    response_model=list[NoiseReadingResponse]
)
def get_readings(
    sensor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Check sensor exists

    sensor = db.query(Sensor).filter(
        Sensor.id == sensor_id
    ).first()

    if not sensor:
        raise HTTPException(
            status_code=404,
            detail="Sensor not found"
        )


    # Get readings

    readings = (
        db.query(NoiseReading)
        .filter(
            NoiseReading.sensor_id == sensor_id
        )
        .order_by(
            NoiseReading.recorded_at.asc()
        )
        .all()
    )

    return readings