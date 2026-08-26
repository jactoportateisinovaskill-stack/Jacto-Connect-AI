from pydantic import BaseModel, Field

class BucketCreateRequest(BaseModel):
    name: str = Field(..., description="O nome do bucket a ser criado")
    is_public: bool = Field(default=True, description="Define se o bucket deve ser acessível publicamente")
