from typing import Optional
from sqlalchemy.orm import Session

from src.models.database_models import Maquinas

class MaquinasRepository:

    def get_all(self, db: Session):
        return (
            db.query(Maquinas)
            .all()
        )

    def get_by_id(self, db: Session, maquina_id: int) -> Optional[Maquinas]:
        return db.query(Maquinas).filter(Maquinas.id == maquina_id).first()