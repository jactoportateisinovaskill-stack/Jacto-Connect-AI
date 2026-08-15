from ultralytics import YOLO
from PIL import Image
from sqlalchemy.orm import Session

import io

from src.repository.peca_repository import PecaRepository

model_path: str = "src/yolo_model/best.pt"
model = YOLO(model_path)
peca_repository = PecaRepository()

def detectar_peca(image_bytes: bytes, db: Session) -> dict:
    imagem = Image.open(io.BytesIO(image_bytes))

    resultados = model(imagem, conf=0.75, iou=0.30)

    if len(resultados[0].boxes) == 0:
        return {
            "sucesso": False, 
            "mensagem": "Nenhuma peça identificada com confiança suficiente. Tente outra foto."
        }

    melhor_box = resultados[0].boxes[0]
    id_classe = int(melhor_box.cls[0])
    nome_da_peca = model.names[id_classe]
    confianca = float(f"{float(melhor_box.conf[0]) * 100:.2f}")

    peca = peca_repository.get_by_code(db, nome_da_peca.split(" ")[-1])
    if not peca:
        return None

    return {
        "nome_peca": peca.nome,
        "codigo": peca.codigo_jacto,
        "confianca": confianca,
        "url_pasta_fotos": peca.url_pasta_fotos,
        "url_compra": peca.url_compra,
        "url_video": peca.url_video,
        "url_foto_principal": peca.url_foto_principal
    }