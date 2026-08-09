from typing import Optional
from sqlalchemy.orm import Session

from src.models.database_models import PecaRelacionada

class PecaRelacionadaRepository:

    def get_all(self, db: Session):
        return (
            db.query(PecaRelacionada)
            .all()
        )

    def get_by_id(self, db: Session, peca_id: int) -> Optional[PecaRelacionada]:
        return db.query(PecaRelacionada).filter(PecaRelacionada.id == peca_id).first()