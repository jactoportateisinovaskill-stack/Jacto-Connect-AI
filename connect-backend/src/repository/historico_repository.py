from typing import Optional
from sqlalchemy.orm import Session

from src.models.database_models import Historico

class HistoricoRepository:

    def get_all(self, db: Session):
        return (
            db.query(Historico)
            .order_by(Historico.data_identificacao.desc())
            .all()
        )

    def get_by_id(self, db: Session, historico_id: int) -> Optional[Historico]:
        return db.query(Historico).filter(Historico.id == historico_id).first()