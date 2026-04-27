from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import SessionLocal 
from api.models import Link
from datetime import date


class LinkCreate(BaseModel):
    url: str
    title: str | None = None
    note: str | None = None
    tags: str | None = None

router = APIRouter()

def get_db():
    """Returns session of the Database"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/links")
def create_links(data: LinkCreate, db: Session = Depends(get_db)):
    """Create a new Link"""
    link = Link(**data.model_dump(), saved_at=date.today())

    db.add(link)

    db.commit()

    db.refresh(link) 

    return link 

@router.get("/links") 
def get_links(tag: str | None = None, db: Session = Depends(get_db)): 
    """Get all Links"""
    if tag:
        return db.query(Link).filter(Link.tags.contains(tag)).all()
    return db.query(Link).all()

@router.patch("/links/{link_id}/read") 
def mark_as_read(link_id: int, db: Session = Depends(get_db)):
    """Sets the status of the link to “read” """
    link = db.query(Link)\
            .filter(Link.id == link_id)\
            .first() 
    
    if not link: 
        raise HTTPException(status_code=404, detail= "Link not found")
    
    link.read = not link.read
    db.commit()
    db.refresh(link)

    return link 

@router.delete("/links/{link_id}")
def delete_link(link_id: int, db: Session = Depends(get_db)): 
    """Delete link by id"""
    link = db.query(Link).filter(Link.id == link_id).first()

    if not link: 
        raise HTTPException(status_code=404, detail="Link not found")
    
    db.delete(link)
    db.commit()

    return {"message": "deleted"}