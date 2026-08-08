"""Cria o banco PostgreSQL e todo o esquema da aplicação.

Uso:
    python scripts/create_database.py
"""

import os

import psycopg2
from psycopg2 import sql
from sqlalchemy.engine import make_url

from dotenv import load_dotenv

load_dotenv()

def get_database_url() -> str:
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("Defina DATABASE_URL antes de executar este script.")
    return database_url


def psycopg_url(database_url: str, database: str | None = None) -> str:
    """Converte a URL do SQLAlchemy para o formato aceito pelo psycopg2."""
    url = make_url(database_url)
    if not url.drivername.startswith("postgresql"):
        raise ValueError("DATABASE_URL deve apontar para um banco PostgreSQL válido.")
    if database is not None:
        url = url.set(database=database)
    return url.set(drivername="postgresql").render_as_string(hide_password=False)


def create_database(database_url: str) -> None:
    url = make_url(database_url)
    if not url.database:
        raise ValueError("DATABASE_URL deve incluir o nome do banco.")

    with psycopg2.connect(psycopg_url(database_url, "postgres")) as connection:
        connection.autocommit = True
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1 FROM pg_database WHERE datname = %s", (url.database,))
            if cursor.fetchone():
                print(f"Banco '{url.database}' já existe.")
                return
            cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(url.database)))
            print(f"Banco '{url.database}' criado.")


def create_schema(database_url: str) -> None:
    statements = (
        """
        CREATE TABLE IF NOT EXISTS maquinas (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            modelo VARCHAR(30) NOT NULL UNIQUE,
            url_imagem TEXT NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS pecas (
            id SERIAL PRIMARY KEY,
            codigo_jacto VARCHAR(20) NOT NULL UNIQUE,
            nome VARCHAR(100) NOT NULL,
            url_pasta_fotos TEXT NOT NULL,
            url_compra TEXT NOT NULL,
            url_video TEXT,
            ativo BOOLEAN NOT NULL DEFAULT TRUE,
            url_foto_principal TEXT NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS historico_identificacoes (
            id SERIAL PRIMARY KEY,
            maquina_id INTEGER REFERENCES maquinas(id),
            peca_identificada_id INTEGER NOT NULL REFERENCES pecas(id),
            url_foto_cliente TEXT NOT NULL,
            confianca_ia NUMERIC(5, 2) NOT NULL,
            status VARCHAR(20) NOT NULL,
            data_identificacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS avaliacoes (
            id SERIAL PRIMARY KEY,
            historico_id INTEGER NOT NULL REFERENCES historico_identificacoes(id),
            nota INTEGER NOT NULL CHECK (nota >= 1 AND nota <= 5),
            data_avaliacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS observacoes_relacionamento (
            id SERIAL PRIMARY KEY,
            peca_id INTEGER NOT NULL UNIQUE REFERENCES pecas(id),
            observacao TEXT NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS peca_relacionada (
            id SERIAL PRIMARY KEY,
            peca_id INTEGER NOT NULL REFERENCES pecas(id),
            peca_relacionada_id INTEGER NOT NULL REFERENCES pecas(id),
            CONSTRAINT uk_peca_relacionada UNIQUE (peca_id, peca_relacionada_id)
        )
        """,
    )

    with psycopg2.connect(psycopg_url(database_url)) as connection:
        with connection.cursor() as cursor:
            for statement in statements:
                cursor.execute(statement)
    print("Esquema criado ou verificado com sucesso.")


def main() -> None:
    database_url = get_database_url()
    # create_database(database_url)
    create_schema(database_url)


if __name__ == "__main__":
    main()
