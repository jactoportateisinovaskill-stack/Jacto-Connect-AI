from sentence_transformers import SentenceTransformer

class SemanticService:
    def __init__(self):
        # O Colibri usa um modelo sentence-transformers
        self.model = SentenceTransformer("tardellirs/colibri-embed-ptbr")

    def generate_embedding(self, text: str, prompt_name: str = "query") -> list[float]:
        # Para o colibri, prompt_name "query" é usado para busca
        # prompt_name "document" é usado para indexação
        
        try:
            embedding = self.model.encode(text, prompt_name=prompt_name)
        except TypeError:
            # Fallback caso a versão do sentence-transformers não suporte prompt_name explicitamente
            if prompt_name == "query":
                text = "query: " + text
            elif prompt_name == "document":
                text = "document: " + text
            embedding = self.model.encode(text)
            
        return embedding.tolist()

semantic_service = SemanticService()
