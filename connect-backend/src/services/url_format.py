from dotenv import load_dotenv
import os

load_dotenv()

bucket_url = os.getenv("BUCKET_URL")

def get_bucket_url(file_name: str):
    return f"{bucket_url}{file_name}"