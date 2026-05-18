from sqlalchemy import Column, Float, ForeignKey, Integer, String, Text

from .database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)


class Goal(Base):

    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("users.id"))
    thrust_area = Column(String)
    title = Column(String)
    description = Column(Text)
    uom_type = Column(String)
    target = Column(Float)
    weightage = Column(Integer)
    status = Column(String, default="pending")
    manager_comment = Column(String, nullable=True)
class CheckIn(Base):

    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True)

    goal_id = Column(Integer, ForeignKey("goals.id"))

    quarter = Column(String)

    actual_value = Column(Float)

    progress_status = Column(String)

    comment = Column(Text)