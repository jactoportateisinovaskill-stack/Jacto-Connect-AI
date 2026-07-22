from ultralytics import YOLO
from PIL import Image

import io


model_path: str = "src/yolo_model/best.onnx"
model = YOLO(model_path)

def detectar_peca(image_bytes: bytes) -> dict:
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
    confianca = float(melhor_box.conf[0]) * 100

    return {
        "nome_peca": nome_da_peca,
        "confianca": confianca
    }