from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.router.detection_router import router as yolo_router

app = FastAPI(title="API Jacto Connect")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(yolo_router)