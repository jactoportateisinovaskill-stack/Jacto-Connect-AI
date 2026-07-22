from pydantic import BaseModel

# modelo de retorno das peças
class DeteccaoPeca(BaseModel):
    nome_peca: str
    confianca: float