from datetime import datetime
from decimal import Decimal

from sqlalchemy import TIMESTAMP, func, ForeignKey, Numeric
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class Pecas(Base):

    __tablename__ = "pecas"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    codigo_jacto: Mapped[str]
    nome: Mapped[str]
    url_pasta_fotos: Mapped[str]
    url_compra: Mapped[str]
    url_video: Mapped[str]
    ativo: Mapped[bool]
    url_foto_principal: Mapped[str]

class Maquinas(Base):

    __tablename__ = "maquinas"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nome: Mapped[str]
    modelo: Mapped[str]
    url_imagem: Mapped[str] 

class Historico(Base):

    __tablename__ = "historico_identificacoes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    maquina_id: Mapped[int] = mapped_column(ForeignKey("maquinas.id", ondelete="CASCADE"))
    peca_identificada_id: Mapped[int] = mapped_column(ForeignKey("pecas.id", ondelete="CASCADE"))
    url_foto_client: Mapped[str]
    confianca_ia: Mapped[Decimal] = mapped_column(Numeric(5, 2))
    status: Mapped[str]
    data_identificacao: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), 
        server_default=func.now()
    )

class Avaliacoes(Base):

    __tablename__ = "avaliacoes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    historico_id: Mapped[int] = mapped_column(ForeignKey("historico_identificacoes.id", ondelete="CASCADE"))
    nota: Mapped[int]
    data_avaliacao: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), 
        server_default=func.now()
    )

class Observacoes(Base):

    __tablename__ = "observacoes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    peca_id: Mapped[int] = mapped_column(ForeignKey("pecas.id", ondelete="CASCADE"))
    observacao: Mapped[str]

class PecaRelacionada(Base):

    __tablename__ = "peca_relacionada"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    peca_id: Mapped[int] = mapped_column(ForeignKey("pecas.id", ondelete="CASCADE"))
    peca_relacionada_id: Mapped[int] = mapped_column(ForeignKey("pecas.id", ondelete="CASCADE"))