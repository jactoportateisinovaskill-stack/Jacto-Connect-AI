from src.database.database_connection import SessionLocal

def get_db():

    db = SessionLocal()
    try:
        yield db
        
    finally:
        db.close()