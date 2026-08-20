from dotenv import load_dotenv
import os

load_dotenv()

def get_database_url() -> str:
    return os.getenv("DATABASE_URL")

def get_bucket_url(file_name: str) -> str:
    return f"{os.getenv("BUCKET_URL")}{file_name}"

def get_maquina_url(file_name: str):
    return f"{os.getenv("BUCKET_URL_MAQ")}{file_name}"

def get_pdf_url(file_name: str):
    return f"{os.getenv("BUCKET_URL_PDF")}{file_name}"