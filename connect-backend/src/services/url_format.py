from dotenv import load_dotenv
import os

load_dotenv()

bucket_url = os.getenv("BUCKET_URL")
bucket_url_maq = os.getenv("BUCKET_URL_MAQ")
bucket_url_pdf = os.getenv("BUCKET_URL_PDF")

def get_bucket_url(file_name: str):
    return f"{bucket_url}{file_name}"

def get_maquina_url(file_name: str):
    return f"{bucket_url_maq}{file_name}"

def get_pdf_url(file_name: str):
    return f"{bucket_url_pdf}{file_name}"