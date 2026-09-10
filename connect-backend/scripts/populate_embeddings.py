import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer

# Garante que scripts rode a partir da pasta raiz
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise RuntimeError("As credenciais do Supabase não foram encontradas no .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# Carrega o modelo
print("Carregando modelo Colibri...")
model = SentenceTransformer("tardellirs/colibri-embed-ptbr")
print("Modelo carregado!")

def populate():
    # 1. Pegar todas as peças e seus nomes populares
    # Vamos usar o banco via Supabase PostgREST ou buscar das tabelas
    
    print("Buscando dados das peças...")
    
    # Busca peças
    pecas_res = supabase.table("pecas").select("*").execute()
    pecas = pecas_res.data
    
    # Busca peca_nome_popular
    relacoes_res = supabase.table("peca_nome_popular").select("*").execute()
    relacoes = relacoes_res.data
    
    # Busca nomes_populares
    nomes_pop_res = supabase.table("nomes_populares").select("*").execute()
    nomes_populares = {np['id']: np['nome'] for np in nomes_pop_res.data}
    
    # Mapear peça_id -> lista de nomes populares
    peca_to_nomes_pop = {}
    for rel in relacoes:
        pid = rel['id_peca']
        nid = rel['id_nome_popular']
        if pid not in peca_to_nomes_pop:
            peca_to_nomes_pop[pid] = []
        if nid in nomes_populares:
            peca_to_nomes_pop[pid].append(nomes_populares[nid])
            
    print(f"Processando {len(pecas)} peças...")
    
    for peca in pecas:
        pid = peca['id']
        nome_oficial = peca['nome']
        sinonimos = peca_to_nomes_pop.get(pid, [])
        
        if sinonimos:
            texto_documento = f"Nome Oficial: {nome_oficial}. Nomes populares: {', '.join(sinonimos)}"
        else:
            texto_documento = f"Nome Oficial: {nome_oficial}."
            
        # Gerar o vetor
        # document (indexação)
        prompt_name = "document"
        try:
            embedding = model.encode(texto_documento, prompt_name=prompt_name)
        except TypeError:
            embedding = model.encode(f"document: {texto_documento}")
            
        # Atualiza a peça com o vetor
        print(f"Atualizando peça {pid} - {nome_oficial}...")
        supabase.table("pecas").update({
            "embedding": embedding.tolist()
        }).eq("id", pid).execute()

    print("População de embeddings finalizada com sucesso!")

if __name__ == "__main__":
    populate()
