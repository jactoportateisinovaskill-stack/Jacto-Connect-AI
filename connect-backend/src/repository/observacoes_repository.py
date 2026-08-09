from typing import Optional
from sqlalchemy.orm import Session

from src.models.database_models import Observacoes

class ObservacoesRepository:

    def get_all(self, db: Session):
        return (
            db.query(Observacoes)
            .all()
        )

    def get_by_id(self, db: Session, observacao_id: int) -> Optional[Observacoes]:
        return db.query(Observacoes).filter(Observacoes.id == observacao_id).first()