# Backend — banco de dados

O banco PostgreSQL é criado diretamente por um único script Python. O repositório contém apenas a estrutura do banco — tabelas, colunas, chaves e regras — sem registros ou credenciais.

## Estrutura criada

O script cria as tabelas `maquinas`, `pecas`, `historico_identificacoes`, `avaliacoes`, `observacoes_relacionamento` e `peca_relacionada`, incluindo chaves primárias, chaves estrangeiras, unicidade e a regra de notas entre 1 e 5.

## Configuração

No diretório `connect-backend`, crie seu arquivo de configuração local:

```powershell
Copy-Item .env.example .env
```

Edite `.env` e informe a conexão local:

```env
DATABASE_URL=postgresql+psycopg2://USUARIO:SENHA@localhost:5432/ia_pecas
```

O `.env` é ignorado pelo Git e não deve ser enviado ao repositório.

## Criar o banco

Com o PostgreSQL em execução e um usuário com permissão para criar bancos, instale as dependências:

```powershell
pip install -r requirements.txt
```

Depois execute:

```powershell
python scripts/create_database.py
```

O script cria o banco informado em `DATABASE_URL` caso ele não exista e, em seguida, cria todas as tabelas. Ele pode ser executado novamente: bancos e tabelas existentes são preservados.

## Arquivos principais

- `scripts/create_database.py`: criação do banco e de todo o esquema;
- `src/database.py`: conexão reutilizável do SQLAlchemy para futuras consultas da API;
- `.env.example`: modelo seguro da variável de ambiente;
- `requirements.txt`: dependências da API, do PostgreSQL e do SQLAlchemy.
