from sqlalchemy.orm import Session
from src.repository.peca_repository import PecaRepository
from src.services.url_service import get_bucket_url, get_pdf_url

peca_repository: PecaRepository = PecaRepository()

def get_db_detection(detection: dict, db: Session) -> dict:

    nome_da_peca = detection["nome_da_peca"]
    confianca = detection["confianca"]

    peca = peca_repository.get_by_code(db, nome_da_peca.split(" ")[-1])

    if not peca:
        return None

    url_foto_principal = get_bucket_url(peca.url_foto_principal)
    url_catalogo = get_pdf_url("Catalogo_Pecas.pdf")
    url_manual = get_pdf_url("Manual_Usuario.pdf")

    return {
        "id": peca.id,
        "nome_peca": peca.nome,
        "codigo": peca.codigo_jacto,
        "confianca": confianca,
        "url_compra": peca.url_compra,
        "url_video": peca.url_video,
        "url_foto_principal": url_foto_principal,
        "url_catalogo": url_catalogo,
        "url_manual": url_manual
    }