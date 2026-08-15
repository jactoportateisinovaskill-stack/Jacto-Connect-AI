from fastapi import APIRouter, HTTPException, File, UploadFile
from src.models.storage_schemas import BucketCreateRequest
from src.services.storage_service import StorageService

router = APIRouter()

@router.post("/buckets", status_code=201)
def create_new_bucket(request: BucketCreateRequest):

    try:
        # Repassa a requisição para a camada de serviço
        result = StorageService.create_bucket(request.name, request.is_public)
        return {"message": f"Bucket '{request.name}' criado com sucesso!", "data": result}
    except ValueError as e:
        # Retorna erro 400 se algo der errado na criação
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.post("/buckets/{bucket_name}/upload", status_code=200)
async def upload_to_bucket(bucket_name: str, file: UploadFile = File(...)):
    """
    Endpoint para fazer upload de um arquivo para um bucket existente.
    """
    try:
        # Lê os bytes do arquivo enviado
        file_bytes = await file.read()
        
        # Chama o service passando o nome do bucket, o nome do arquivo, os bytes e o tipo
        result = StorageService.upload_file(
            bucket_name=bucket_name,
            file_path=file.filename,
            file_bytes=file_bytes,
            content_type=file.content_type
        )
        
        return {"message": "Upload realizado com sucesso!", "data": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro interno do servidor")
