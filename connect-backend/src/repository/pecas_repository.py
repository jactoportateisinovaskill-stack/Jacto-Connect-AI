from typing import Optional
from sqlalchemy.orm import Session

from src.models.database_models import Pecas

class PecasRepository:

    def get_all(self, db: Session):
        return (
            db.query(Pecas)
            .all()
        )

    def get_by_id(self, db: Session, peca_id: int) -> Optional[Pecas]:
        return db.query(Pecas).filter(Pecas.id == peca_id).first()