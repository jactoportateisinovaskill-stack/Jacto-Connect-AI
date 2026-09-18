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
        
    def search_by_embedding(self, db: Session, query_embedding: list[float], limit: int = 3) -> list:
        # 1 - (distance) = cosine similarity in pgvector
        # Or using max_inner_product for colibri, but cosine is a good default.
        # the `<=>` operator in postgres corresponds to cosine distance
        stmt = (
            select(
                self.model.id,
                self.model.nome,
                self.model.codigo_jacto,
                self.model.url_foto_principal,
                self.model.url_compra,
                self.model.url_video,
                self.model.embedding.cosine_distance(query_embedding).label("distance")
            )
            .where(self.model.embedding != None)
            .order_by(self.model.embedding.cosine_distance(query_embedding))
            .limit(limit)
        )
        results = db.execute(stmt).all()
        return results