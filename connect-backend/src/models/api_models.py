from datetime import datetime
from pydantic import BaseModel

# modelo de retorno das peças
class DeteccaoPeca(BaseModel):
    id: int
    nome_peca: str
    codigo: str
    confianca: float
    url_pasta_fotos: str
    url_compra: str
    url_video: str
    url_foto_principal: str
    url_catalogo: str

class PecaResponse(BaseModel):
    id: int
    codigo_jacto: str
    nome: str
    url_pasta_fotos: str
    url_compra: str
    url_video: str
    ativo: bool
    url_foto_principal: str

class MaquinaResponse(BaseModel):
    id: int
    nome: str
    modelo: str
    url_imagem: str 

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