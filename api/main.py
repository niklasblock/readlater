from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.database import engine, Base
from api import models

app = FastAPI()

# CORS — damit die Browser Extension zugreifen darf
app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://*"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    """Create tables on startup"""
    Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    """Health check"""
    return {"status": "ok"}