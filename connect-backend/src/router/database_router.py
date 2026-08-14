from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.models.api_models import (
    PecaResponse, MaquinaResponse, HistoricoResponse,
    AvaliacoesResponse, ObservacoesResponse, PecaRelacionadaResponse 
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
historicos_repository: HistoricoRepository = HistoricoRepository()
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


@router.get("/api/database/maquinas", response_model=list[MaquinaResponse])
async def get_all_maquinas(db: Session = Depends(get_db)):
    return maquinas_repository.get_all(db)

@router.get("/api/database/maquinas/{maquina_id}", response_model=MaquinaResponse)
async def get_maquina_id(maquina_id: int, db: Session = Depends(get_db)):
    maquina = maquinas_repository.get_by_id(db, maquina_id)
    if not maquina:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Maquina não encontrada")
    return maquina


@router.get("/api/database/historicos", response_model=list[HistoricoResponse])
async def get_all_historicos(db: Session = Depends(get_db)):
    return historicos_repository.get_all(db)

@router.get("/api/database/historicos/{historico_id}", response_model=HistoricoResponse)
async def get_historico_id(historico_id: int, db: Session = Depends(get_db)):
    historico = historicos_repository.get_by_id(db, historico_id)
    if not historico:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Histórico não encontrado")
    return historico


@router.get("/api/database/avaliacoes", response_model=list[AvaliacoesResponse])
async def get_all_avaliacoes(db: Session = Depends(get_db)):
    return avaliacoes_repository.get_all(db)

@router.get("/api/database/avaliacoes/{avaliacao_id}", response_model=AvaliacoesResponse)
async def get_avaliacao_id(avaliacao_id: int, db: Session = Depends(get_db)):
    avaliacao = avaliacoes_repository.get_by_id(db, avaliacao_id)
    if not avaliacao:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Avaliação não encontrada")
    return avaliacao


@router.get("/api/database/observacoes", response_model=list[ObservacoesResponse])
async def get_all_observacoes(db: Session = Depends(get_db)):
    return observacoes_repository.get_all(db)

@router.get("/api/database/observacoes/{observacao_id}", response_model=ObservacoesResponse)
async def get_observacao_id(observacao_id: int, db: Session = Depends(get_db)):
    observacao = observacoes_repository.get_by_id(db, observacao_id)
    if not observacao:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Observação não encontrada")
    return observacao


@router.get("/api/database/peca-relacionada", response_model=list[PecaRelacionadaResponse])
async def get_all_pecas(db: Session = Depends(get_db)):
    return peca_relacionada_repository.get_all(db)

@router.get("/api/database/peca-relacionada/{peca_id}", response_model=PecaRelacionadaResponse)
async def get_peca_id(peca_id: int, db: Session = Depends(get_db)):
    peca = peca_relacionada_repository.get_by_id(db, peca_id)
    if not peca:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Peça relacionada não encontrada")
    return peca