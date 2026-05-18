from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class UserLogin(BaseModel):
    email: str
    password: str
class GoalCreate(BaseModel):

    thrust_area: str

    title: str

    description: str

    uom_type: str

    target: float

    weightage: int
class CheckInCreate(BaseModel):

    goal_id: int

    quarter: str

    actual_value: float

    progress_status: str

    comment: str