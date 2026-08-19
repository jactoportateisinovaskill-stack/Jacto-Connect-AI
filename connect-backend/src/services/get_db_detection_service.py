from sqlalchemy.orm import Session
from src.repository.peca_repository import PecaRepository
from src.services.url_format import get_bucket_url

peca_repository: PecaRepository = PecaRepository()

def get_db_detection(detection: dict, db: Session) -> dict:

    nome_da_peca = detection["nome_da_peca"]
    confianca = detection["confianca"]

    peca = peca_repository.get_by_code(db, nome_da_peca.split(" ")[-1])

    if not peca:
        return None

    url_foto_principal = get_bucket_url(peca.url_foto_principal)

    return {
        "nome_peca": peca.nome,
        "codigo": peca.codigo_jacto,
        "confianca": confianca,
        "url_pasta_fotos": peca.url_pasta_fotos,
        "url_compra": peca.url_compra,
        "url_video": peca.url_video,
        "url_foto_principal": url_foto_principal
    }