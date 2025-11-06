from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional


class PromptVersionResponse(BaseModel):
    id: UUID
    prompt_id: UUID
    version: int
    content: str
    created_at: datetime
    created_by: Optional[str] = None
    
    class Config:
        from_attributes = True