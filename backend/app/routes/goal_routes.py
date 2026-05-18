from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from ..database import SessionLocal
from ..models import Goal
from ..schemas import GoalCreate

router = APIRouter()

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# -----------------------------
# Approval Schema
# -----------------------------

class ApprovalRequest(BaseModel):

    status: str

    manager_comment: str


# -----------------------------
# Create Goals
# -----------------------------

@router.post("/goals")
def create_goals(
    goals: list[GoalCreate],
    db: Session = Depends(get_db)
):

    if len(goals) > 8:

        raise HTTPException(
            status_code=400,
            detail="Maximum 8 goals allowed"
        )

    total_weightage = sum(
        goal.weightage for goal in goals
    )

    if total_weightage != 100:

        raise HTTPException(
            status_code=400,
            detail="Total weightage must equal 100"
        )

    for goal in goals:

        if goal.weightage < 10:

            raise HTTPException(
                status_code=400,
                detail="Minimum weightage per goal is 10"
            )

        new_goal = Goal(

            employee_id=1,

            thrust_area=goal.thrust_area,

            title=goal.title,

            description=goal.description,

            uom_type=goal.uom_type,

            target=goal.target,

            weightage=goal.weightage,

            status="submitted"
        )

        db.add(new_goal)

    db.commit()

    return {
        "message": "Goals submitted successfully"
    }


# -----------------------------
# Get Goals
# -----------------------------

@router.get("/goals")
def get_goals(db: Session = Depends(get_db)):

    goals = db.query(Goal).all()

    return goals


# -----------------------------
# Update Goal
# -----------------------------

@router.put("/goals/{goal_id}")
def update_goal(
    goal_id: int,
    updated_goal: GoalCreate,
    db: Session = Depends(get_db)
):

    goal = db.query(Goal).filter(
        Goal.id == goal_id
    ).first()

    if not goal:

        raise HTTPException(
            status_code=404,
            detail="Goal not found"
        )

    if goal.status != "submitted":

        raise HTTPException(
            status_code=400,
            detail="Goal can no longer be edited"
        )

    if updated_goal.weightage < 10:

        raise HTTPException(
            status_code=400,
            detail="Minimum weightage per goal is 10"
        )

    goal.thrust_area = updated_goal.thrust_area
    goal.title = updated_goal.title
    goal.description = updated_goal.description
    goal.uom_type = updated_goal.uom_type
    goal.target = updated_goal.target
    goal.weightage = updated_goal.weightage

    db.commit()
    db.refresh(goal)

    return goal


# -----------------------------
# Delete Goal
# -----------------------------

@router.delete("/goals/{goal_id}")
def delete_goal(
    goal_id: int,
    db: Session = Depends(get_db)
):

    goal = db.query(Goal).filter(
        Goal.id == goal_id
    ).first()

    if not goal:

        raise HTTPException(
            status_code=404,
            detail="Goal not found"
        )

    if goal.status != "submitted":

        raise HTTPException(
            status_code=400,
            detail="Goal can no longer be deleted"
        )

    db.delete(goal)

    db.commit()

    return {
        "message": "Goal deleted successfully"
    }


# -----------------------------
# Manager Approval / Rejection
# -----------------------------

@router.put("/goals/approve/{goal_id}")
def approve_or_reject_goal(
    goal_id: int,
    approval: ApprovalRequest,
    db: Session = Depends(get_db)
):

    goal = db.query(Goal).filter(
        Goal.id == goal_id
    ).first()

    if not goal:

        raise HTTPException(
            status_code=404,
            detail="Goal not found"
        )

    goal.status = approval.status

    goal.manager_comment = approval.manager_comment

    db.commit()

    db.refresh(goal)

    return {
        "message": f"Goal {approval.status}"
    }