from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
from sqlalchemy.orm import Session
from src.services.detection_service import detectar_peca
from src.services.get_db_detection_service import get_db_detection
from src.models.api_models import DeteccaoPeca
from src.database.database_dependencies import get_db

router: APIRouter = APIRouter(prefix="/api/detection")

@router.post("", response_model=DeteccaoPeca)
async def deteccao_peca(foto: UploadFile = File(...), db: Session = Depends(get_db)):

    image_bytes = await foto.read()
    deteccao = detectar_peca(image_bytes)
    resposta_peca = get_db_detection(deteccao, db)

    if not resposta_peca:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Peça não encontrada")

    return resposta_peca