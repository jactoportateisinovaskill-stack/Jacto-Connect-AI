from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.schemas.api_schemas import (
    PecaResponse, MaquinaResponse, HistoricoResponse,
    AvaliacoesResponse, ObservacoesResponse, PecaRelacionadaResponse,
    HistoricoCreate,
)

from src.schemas.database_schemas import (
    Pecas, PecaRelacionada, Avaliacoes,
    Observacoes, Historico, Maquinas
)

from src.services.url_service import get_maquina_url

from src.repository.base_repository import BaseRepository

from src.database.database_dependencies import get_db


router = APIRouter(prefix="/api/database")

pecas_repository: BaseRepository = BaseRepository(Pecas)
avaliacoes_repository: BaseRepository = BaseRepository(Avaliacoes)
historicos_repository: BaseRepository = BaseRepository(Historico)
maquinas_repository: BaseRepository = BaseRepository(Maquinas)
observacoes_repository: BaseRepository = BaseRepository(Observacoes)
peca_relacionada_repository: BaseRepository = BaseRepository(PecaRelacionada)


@router.get("/pecas", response_model=list[PecaResponse])
async def get_all_pecas(db: Session = Depends(get_db)):
    return pecas_repository.get_all(db)

@router.get("/pecas/{peca_id}", response_model=PecaResponse)
async def get_peca_id(peca_id: int, db: Session = Depends(get_db)):
    peca = pecas_repository.get_by_id(db, peca_id)
    if not peca:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Peça não encontrada")
    return peca


@router.get("/maquinas", response_model=list[MaquinaResponse])
async def get_all_maquinas(db: Session = Depends(get_db)):
    maquinas = maquinas_repository.get_all(db)
    return [
        MaquinaResponse(
            id=m.id,
            nome=m.nome,
            modelo=m.modelo,
            url_imagem=get_maquina_url(m.url_imagem) if m.url_imagem else ""
        ) for m in maquinas
    ]

@router.get("/maquinas/{maquina_id}", response_model=MaquinaResponse)
async def get_maquina_id(maquina_id: int, db: Session = Depends(get_db)):
    maquina = maquinas_repository.get_by_id(db, maquina_id)
    if not maquina:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Maquina não encontrada")
    return MaquinaResponse(
        id=maquina.id,
        nome=maquina.nome,
        modelo=maquina.modelo,
        url_imagem=get_maquina_url(maquina.url_imagem) if maquina.url_imagem else ""
    )


@router.get("/historicos", response_model=list[HistoricoResponse])
async def get_all_historicos(db: Session = Depends(get_db)):
    return historicos_repository.get_all(db)

@router.get("/historicos/{historico_id}", response_model=HistoricoResponse)
async def get_historico_id(historico_id: int, db: Session = Depends(get_db)):
    historico = historicos_repository.get_by_id(db, historico_id)
    if not historico:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Histórico não encontrado")
    return historico


@router.get("/avaliacoes", response_model=list[AvaliacoesResponse])
async def get_all_avaliacoes(db: Session = Depends(get_db)):
    return avaliacoes_repository.get_all(db)

@router.get("/avaliacoes/{avaliacao_id}", response_model=AvaliacoesResponse)
async def get_avaliacao_id(avaliacao_id: int, db: Session = Depends(get_db)):
    avaliacao = avaliacoes_repository.get_by_id(db, avaliacao_id)
    if not avaliacao:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Avaliação não encontrada")
    return avaliacao


@router.get("/observacoes", response_model=list[ObservacoesResponse])
async def get_all_observacoes(db: Session = Depends(get_db)):
    return observacoes_repository.get_all(db)

@router.get("/observacoes/{observacao_id}", response_model=ObservacoesResponse)
async def get_observacao_id(observacao_id: int, db: Session = Depends(get_db)):
    observacao = observacoes_repository.get_by_id(db, observacao_id)
    if not observacao:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Observação não encontrada")
    return observacao


@router.get("/peca-relacionada", response_model=list[PecaRelacionadaResponse])
async def get_all_pecas(db: Session = Depends(get_db)):
    return peca_relacionada_repository.get_all(db)

@router.get("/peca-relacionada/{relacao_id}", response_model=PecaRelacionadaResponse)
async def get_peca_relacionada_id(relacao_id: int, db: Session = Depends(get_db)):
    relacao = peca_relacionada_repository.get_by_id(db, relacao_id)
    if not relacao:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Peça relacionada não encontrada")
    return relacao


@router.post("/historicos",
             response_model=MaquinaResponse,
             status_code=status.HTTP_201_CREATED)
async def post_historico(entity: HistoricoCreate, db: Session = Depends(get_db)):

    maquina = maquinas_repository.get_by_id(
        db,
        entity.maquina_id
    )

    if not maquina:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Máquina não encontrada"
        )

    peca = pecas_repository.get_by_id(
        db,
        entity.peca_identificada_id
    )

    if not peca:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Peça não encontrada"
        )
    
    return historicos_repository.create(
        entity=entity,
        db=db)