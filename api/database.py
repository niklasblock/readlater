from sqlalchemy import create_engine, Engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from pathlib import Path

DB_PATH = Path.home() / "readlater" / "links.db"

def get_engine() -> Engine:
    """Create engine and ensure directory exists"""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    return create_engine(f"sqlite:///{DB_PATH}")

class Base(DeclarativeBase):
    """Base class for all models"""
    pass

engine = get_engine()
SessionLocal = sessionmaker(bind=engine)