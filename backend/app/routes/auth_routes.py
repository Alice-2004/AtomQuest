from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import User
from ..schemas import UserCreate, UserLogin
from ..auth import (
    hash_password,
    password_exceeds_bcrypt_limit,
    verify_password,
    create_access_token
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    if password_exceeds_bcrypt_limit(user.password):
        raise HTTPException(
            status_code=400,
            detail="Password cannot be longer than 72 bytes"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )

    if password_exceeds_bcrypt_limit(user.password):
        raise HTTPException(
            status_code=400,
            detail="Password cannot be longer than 72 bytes"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "id": db_user.id,
        "role": db_user.role,
        "email": db_user.email
    })

    return {
        "access_token": token,
        "role": db_user.role,
        "name": db_user.name
    }
