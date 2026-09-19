from datetime import datetime
from pydantic import BaseModel, Field, field_validator
from typing import Optional

# modelo de retorno das peças
class DeteccaoPeca(BaseModel):
    id: int
    nome_peca: str
    codigo: str
    confianca: float
    url_compra: str
    url_video: str
    url_foto_principal: str
    url_catalogo: str
    url_manual: str

class PecaResponse(BaseModel):
    id: int
    codigo_jacto: str
    nome: str
    url_compra: str
    url_video: str
    ativo: bool
    url_foto_principal: str

class MaquinaResponse(BaseModel):
    id: int
    nome: str
    modelo: str
    url_imagem: str
    url_catalogo: str 

class HistoricoResponse(BaseModel):
    id: int
    maquina_id: int
    peca_identificada_id: int
    url_foto_client: str
    confianca_ia: float
    status: str
    data_identificacao: datetime

class AvaliacoesResponse(BaseModel):
    id: int
    historico_id: int
    nota: int
    data_avaliacao: datetime

class ObservacoesResponse(BaseModel):
    id: int
    peca_id: int
    observacao: str

class PecaRelacionadaResponse(BaseModel):
    id: int
    peca_id: int
    peca_relacionada_id: int


class HistoricoCreate(BaseModel):
    maquina_id: int
    peca_identificada_id: int
    url_foto_client: str
    confianca_ia: float
    status: str

class BuscaSemanticaRequest(BaseModel):
    query: str = Field(..., max_length=100)
    maquina_id: Optional[int] = None
    limit: int = 3
    
    @field_validator('query')
    @classmethod
    def sanitize_query(cls, v: str) -> str:
        # Remove null bytes, escape chars maliciosos e espaços nas extremidades
        v = v.replace('\x00', '')
        return v.strip()

class ResultadoBuscaSemantica(BaseModel):
    id: int
    nome: str
    codigo_jacto: str
    score_similaridade: float
    url_foto_principal: Optional[str] = None
    url_compra: Optional[str] = None
    url_video: Optional[str] = None
    url_catalogo: Optional[str] = None
    url_manual: Optional[str] = None