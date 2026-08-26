from typing import Optional

from sqlalchemy import select
from sqlalchemy.orm import DeclarativeBase, Session
from src.schemas.database_schemas import Pecas
from src.repository.base_repository import BaseRepository

class PecaRepository(BaseRepository):
    def __init__(self):
        self.model = Pecas

    def get_by_code(self, db: Session, codigo_jacto: str) -> Optional[Pecas]:
        stmt = select(self.model).where(self.model.codigo_jacto == codigo_jacto)
        return db.scalar(stmt)