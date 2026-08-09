from typing import Optional
from sqlalchemy.orm import Session

from src.models.database_models import Avaliacoes

class AvaliacoesRepository:

    def get_all(self, db: Session):
        return (
            db.query(Avaliacoes)
            .order_by(Avaliacoes.data_avaliacao.desc())
            .all()
        )

    def get_by_id(self, db: Session, avaliacao_id: int) -> Optional[Avaliacoes]:
        return db.query(Avaliacoes).filter(Avaliacoes.id == avaliacao_id).first()