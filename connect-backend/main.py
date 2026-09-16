from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from src.router.detection_router import router as yolo_router
from src.router.database_router import router as get_database_router
from src.router.storage_router import router as storage_router
from src.router.semantic_router import router as semantic_router

app = FastAPI(title="API Jacto Connect")

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(yolo_router)
app.include_router(get_database_router)
app.include_router(storage_router)
app.include_router(semantic_router)