from sqlalchemy.orm import DeclarativeBase, Session
from typing import Optional

class BaseRepository():
    def __init__(self, model: DeclarativeBase):
        self.model: DeclarativeBase = model

    def get_all(self, db: Session) -> list[DeclarativeBase]:
        return db.query(self.model).all()

    def get_by_id(self, db: Session, id: int) -> Optional[DeclarativeBase]:
        return db.query(self.model).get(id)