from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.schemas.api_schemas import (
    BuscaSemanticaRequest,
    ResultadoBuscaSemantica
)

from src.database.database_dependencies import get_db
from src.repository.peca_repository import PecaRepository
from src.services.semantic_service import semantic_service

router = APIRouter(prefix="/api/busca-semantica", tags=["busca-semantica"])
peca_repository = PecaRepository()

@router.post("", response_model=list[ResultadoBuscaSemantica])
async def busca_semantica(
    request: BuscaSemanticaRequest, 
    db: Session = Depends(get_db)
):
    try:
        # Gerar embedding da query
        query_embedding = semantic_service.generate_embedding(
            text=request.query, 
            prompt_name="query"
        )
        
        # Fazer a busca no repositório
        results = peca_repository.search_by_embedding(
            db=db, 
            query_embedding=query_embedding, 
            limit=request.limit
        )
        
        response = []
        for row in results:
            # cosine_distance vai de 0 a 2. Para similaridade: 1 - distance
            # Convertendo para uma porcentagem: (1 - distance) * 100
            similaridade = (1.0 - float(row.distance)) * 100.0
            
            response.append(
                ResultadoBuscaSemantica(
                    id=row.id,
                    nome=row.nome,
                    codigo_jacto=row.codigo_jacto,
                    score_similaridade=round(similaridade, 2)
                )
            )
            
        return response
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao realizar busca semântica: {str(e)}"
        )
