from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.sensor import Sensor
from app.schemas.sensor import (
    SensorCreate,
    SensorUpdate,
    SensorResponse
)
from app.auth.current_user import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/sensors",
    tags=["Sensors"]
)


# ==========================================
# CREATE SENSOR
# ==========================================

@router.post(
    "/",
    response_model=SensorResponse,
    status_code=201
)
def create_sensor(
    sensor: SensorCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_sensor = Sensor(
        name=sensor.name,
        location=sensor.location,
        latitude=sensor.latitude,
        longitude=sensor.longitude,
        status="Offline",
        current_noise=0
    )

    db.add(new_sensor)
    db.commit()
    db.refresh(new_sensor)

    return new_sensor


# ==========================================
# GET ALL SENSORS
# ==========================================

@router.get(
    "/",
    response_model=list[SensorResponse]
)
def get_sensors(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sensors = db.query(Sensor).all()

    return sensors


# ==========================================
# GET ONE SENSOR
# ==========================================

@router.get(
    "/{sensor_id}",
    response_model=SensorResponse
)
def get_sensor(
    sensor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sensor = db.query(Sensor).filter(
        Sensor.id == sensor_id
    ).first()

    if not sensor:
        raise HTTPException(
            status_code=404,
            detail="Sensor not found"
        )

    return sensor
# ==========================================
# UPDATE SENSOR
# ==========================================

@router.put(
    "/{sensor_id}",
    response_model=SensorResponse
)
def update_sensor(
    sensor_id: int,
    sensor_data: SensorUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sensor = db.query(Sensor).filter(
        Sensor.id == sensor_id
    ).first()

    if not sensor:
        raise HTTPException(
            status_code=404,
            detail="Sensor not found"
        )

    sensor.name = sensor_data.name
    sensor.location = sensor_data.location
    sensor.latitude = sensor_data.latitude
    sensor.longitude = sensor_data.longitude
    sensor.status = sensor_data.status
    sensor.current_noise = sensor_data.current_noise

    db.commit()
    db.refresh(sensor)

    return sensor

# ==========================================
# DELETE SENSOR
# ==========================================

@router.delete(
    "/{sensor_id}"
)
def delete_sensor(
    sensor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sensor = db.query(Sensor).filter(
        Sensor.id == sensor_id
    ).first()

    if not sensor:
        raise HTTPException(
            status_code=404,
            detail="Sensor not found"
        )

    db.delete(sensor)
    db.commit()

    return {
        "message": "Sensor deleted successfully"
    }