from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import CheckIn
from ..schemas import CheckInCreate

router = APIRouter()

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/checkins")
def create_checkin(
    checkin: CheckInCreate,
    db: Session = Depends(get_db)
):

    new_checkin = CheckIn(

        goal_id=checkin.goal_id,

        quarter=checkin.quarter,

        actual_value=checkin.actual_value,

        progress_status=checkin.progress_status,

        comment=checkin.comment
    )

    db.add(new_checkin)

    db.commit()

    db.refresh(new_checkin)

    return {
        "message": "Check-in submitted"
    }


@router.get("/checkins")
def get_checkins(
    db: Session = Depends(get_db)
):

    return db.query(CheckIn).all()