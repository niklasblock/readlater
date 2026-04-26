from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text, Date, Boolean
from api.database import Base
from datetime import datetime, date


class Link(Base):
    """Table for saved links"""
    __tablename__ = "links"

    id: Mapped[int] = mapped_column(primary_key=True)
    url: Mapped[str] = mapped_column(String)
    title: Mapped[str | None] = mapped_column(String, nullable=True)
    note: Mapped[str | None] = mapped_column(Text, nullable=True)
    tags: Mapped[str | None] = mapped_column(String, nullable=True)  # kommagetrennt: "python,api"
    saved_at: Mapped[date] = mapped_column(Date)
    read: Mapped[bool] = mapped_column(Boolean, default=False)