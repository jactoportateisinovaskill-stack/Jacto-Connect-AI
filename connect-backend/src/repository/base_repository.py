from sqlalchemy.orm import DeclarativeBase, Session
from pydantic import BaseModel
from typing import Optional

class BaseRepository():
    def __init__(self, model: DeclarativeBase):
        self.model: DeclarativeBase = model

    def get_all(self, db: Session) -> list[DeclarativeBase]:
        return db.query(self.model).all()

    def get_by_id(self, db: Session, id: int) -> Optional[DeclarativeBase]:
        return db.query(self.model).get(id)

    def create(self, db: Session, entity: BaseModel) -> DeclarativeBase:

        try:
            new_entity = self.model(**entity.model_dump())

            db.add(new_entity)
            db.flush()
            db.refresh(new_entity)

            return new_entity

        except Exception:
            db.rollback()
            raise