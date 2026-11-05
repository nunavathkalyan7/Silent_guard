from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.sensor import Sensor
from app.routes.sensors import router as sensor_router
from app.models.noise_reading import NoiseReading
from app.routes.noise_readings import router as noise_readings_router
from app.models.alert import Alert
from app.routes.alerts import router as alerts_router

from app.database import Base, engine
from app.models.user import User

from app.routes.home import router as home_router
from app.routes.auth import router as auth_router

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="SilentGuard API",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(home_router)
app.include_router(auth_router)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.home import router as home_router
from app.routes.auth import router as auth_router
from app.routes.sensors import router as sensor_router

app = FastAPI(
    title="SilentGuard API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home_router)
app.include_router(auth_router)
app.include_router(sensor_router)
app.include_router(noise_readings_router)
app.include_router(alerts_router)