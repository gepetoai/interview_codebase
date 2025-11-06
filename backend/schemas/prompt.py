from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional


class PromptCreate(BaseModel):
    name: str
    content: str
    created_by: Optional[str] = None


class PromptRename(BaseModel):
    name: str


class PromptContentUpdate(BaseModel):
    content: str
    created_by: Optional[str] = None


class PromptResponse(BaseModel):
    id: UUID
    name: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

