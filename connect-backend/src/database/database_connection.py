from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from src.services.url_service import get_database_url

DATABASE_URL = get_database_url()

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL não configurada. Defina-a nas variáveis de ambiente.")

engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True,
    pool_recycle=300,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()