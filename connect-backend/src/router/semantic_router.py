from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from src.schemas.api_schemas import (
    BuscaSemanticaRequest,
    ResultadoBuscaSemantica
)

from src.database.database_dependencies import get_db
from src.repository.peca_repository import PecaRepository
from src.services.semantic_service import semantic_service
from src.services.url_service import get_bucket_url, get_pdf_url

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/api/v1/pecas/busca-semantica", tags=["busca-semantica"])
peca_repository = PecaRepository()

@router.post("", response_model=list[ResultadoBuscaSemantica])
@limiter.limit("15/minute")
async def busca_semantica(
    request: Request,
    body: BuscaSemanticaRequest, 
    db: Session = Depends(get_db)
):
    try:
        # Gerar embedding da query
        query_embedding = semantic_service.generate_embedding(
            text=body.query, 
            prompt_name="query"
        )
        
        # Fazer a busca no repositório
        results = peca_repository.search_by_embedding(
            db=db, 
            query_embedding=query_embedding, 
            limit=body.limit
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
                    score_similaridade=round(similaridade, 2),
                    url_foto_principal=get_bucket_url(row.url_foto_principal) if row.url_foto_principal else None,
                    url_compra=row.url_compra,
                    url_video=row.url_video,
                    url_catalogo=get_pdf_url("Catalogo_Pecas.pdf"),
                    url_manual=get_pdf_url("Manual_Usuario.pdf")
                )
            )
            
        return response
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao realizar busca semântica: {str(e)}"
        )
