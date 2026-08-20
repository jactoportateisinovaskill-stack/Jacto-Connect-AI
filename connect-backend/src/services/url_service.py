from dotenv import load_dotenv
import os

load_dotenv()

def get_database_url() -> str:
    return os.getenv("DATABASE_URL")


def get_bucket_url(file_name: str) -> str:
    return f"{os.getenv("BUCKET_URL")}{file_name}"
