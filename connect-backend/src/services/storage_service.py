from src.database.supabase_client import supabase

class StorageService:
    @staticmethod
    def create_bucket(bucket_name: str, is_public: bool = True):
        # Cria um novo bucket no Supabase.
        try:
            # Chama a API do Supabase para criar o bucket
            response = supabase.storage.create_bucket(
                bucket_name,
                options={"public": is_public}
            )
            return response
        except Exception as e:
            # Em caso de erro (ex: bucket já existe), levanta uma exceção
            raise ValueError(f"Erro ao criar bucket no Supabase: {str(e)}")

    @staticmethod
    def upload_file(bucket_name: str, file_path: str, file_bytes: bytes, content_type: str):
        # Faz upload de um arquivo para um bucket específico.
        try:
            response = supabase.storage.from_(bucket_name).upload(
                path=file_path,
                file=file_bytes,
                file_options={"content-type": content_type}
            )
            
            # Para retornar a URL pública do arquivo (só funciona se o bucket for público)
            public_url = supabase.storage.from_(bucket_name).get_public_url(file_path)
            
            return {"upload_response": response, "public_url": public_url}
        except Exception as e:
            raise ValueError(f"Erro ao fazer upload do arquivo: {str(e)}")
