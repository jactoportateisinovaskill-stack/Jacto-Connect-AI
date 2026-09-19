from functools import lru_cache
from pathlib import Path
import io

from PIL import Image
from ultralytics import YOLO

MODEL_PATH = Path(__file__).resolve().parent.parent / "yolo_model" / "best.pt"

@lru_cache(maxsize=1)
def get_model() -> YOLO:
    return YOLO(str(MODEL_PATH))

def detectar_peca(image_bytes: bytes) -> dict:
    model = get_model()
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

    return {
        "nome_da_peca": nome_da_peca,
        "confianca": confianca
    }