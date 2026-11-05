from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.alert import Alert
from app.models.user import User
from app.schemas.alert import AlertResponse
from app.auth.current_user import get_current_user


router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


# ==========================================
# GET ALL ALERTS
# ==========================================

@router.get(
    "/",
    response_model=list[AlertResponse]
)
def get_alerts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    alerts = (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .all()
    )

    return alerts