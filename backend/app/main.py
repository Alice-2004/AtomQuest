from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.goal_routes import router as goal_router
from .routes.checkin_routes import router as checkin_router

from .database import engine
from .models import Base
from .routes.auth_routes import router as auth_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(goal_router)
app.include_router(checkin_router)

@app.get("/")
def home():
    return {"message": "AtomQuest Backend Running"}