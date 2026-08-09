from pydantic import BaseModel

# modelo de retorno das peças
class DeteccaoPeca(BaseModel):
    nome_peca: str
    confianca: float

class PecaResponse(BaseModel):
    id: int
    codigo_jacto: str
    nome: str
    url_pasta_fotos: str
    url_compra: str
    url_video: str
    ativo: bool
    url_foto_principal: str