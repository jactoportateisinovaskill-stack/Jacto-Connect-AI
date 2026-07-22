from fastapi import APIRouter, UploadFile, File
from src.services.detection_service import detectar_peca
from src.models.api_models import DeteccaoPeca

router: APIRouter = APIRouter()

@router.post("/api/detection", response_model=DeteccaoPeca)
async def deteccao_peca(foto: UploadFile = File(...)):

    image_bytes = await foto.read()
    return detectar_peca(image_bytes)