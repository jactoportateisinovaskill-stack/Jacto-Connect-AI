from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.models.api_models import (
    PecaResponse
)

from src.repository.pecas_repository import PecasRepository
from src.repository.avaliacoes_repository import AvaliacoesRepository
from src.repository.historico_repository import HistoricoRepository
from src.repository.maquinas_repository import MaquinasRepository
from src.repository.observacoes_repository import ObservacoesRepository
from src.repository.peca_relacionada_repository import PecaRelacionadaRepository

from src.database.database_dependencies import get_db


router = APIRouter()

pecas_repository: PecasRepository = PecasRepository()
avaliacoes_repository: AvaliacoesRepository = AvaliacoesRepository()
historico_repository: HistoricoRepository = HistoricoRepository()
maquinas_repository: MaquinasRepository = MaquinasRepository()
observacoes_repository: ObservacoesRepository = ObservacoesRepository()
peca_relacionada_repository: PecaRelacionadaRepository = PecaRelacionadaRepository()


@router.get("/api/database/pecas", response_model=list[PecaResponse])
async def get_all_pecas(db: Session = Depends(get_db)):
    return pecas_repository.get_all(db)

@router.get("/api/database/pecas/{peca_id}", response_model=PecaResponse)
async def get_peca_id(peca_id: int, db: Session = Depends(get_db)):
    peca = pecas_repository.get_by_id(db, peca_id)
    if not peca:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Peça não encontrada")
    return peca