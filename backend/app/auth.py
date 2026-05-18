from datetime import datetime, timedelta

import bcrypt
from jose import jwt

SECRET_KEY = "atomquestsecret"
ALGORITHM = "HS256"
MAX_BCRYPT_PASSWORD_BYTES = 72


def password_exceeds_bcrypt_limit(password: str):
    return len(password.encode("utf-8")) > MAX_BCRYPT_PASSWORD_BYTES


def _password_bytes(password: str):
    if password_exceeds_bcrypt_limit(password):
        raise ValueError("Password cannot be longer than 72 bytes.")

    return password.encode("utf-8")


def hash_password(password: str):
    return bcrypt.hashpw(
        _password_bytes(password),
        bcrypt.gensalt()
    ).decode("utf-8")


def verify_password(plain, hashed):
    return bcrypt.checkpw(
        _password_bytes(plain),
        hashed.encode("utf-8")
    )


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(hours=24)

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
