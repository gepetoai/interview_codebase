from sqlalchemy.orm import Session
from repositories.prompt_version_repository import prompt_version_repository
from schemas.prompt_version import PromptVersionResponse
from typing import List, Optional
from uuid import UUID


class PromptVersionService:
    def get_version_by_number(self, db: Session, prompt_id: UUID, version: int) -> Optional[PromptVersionResponse]:
        db_version = prompt_version_repository.get_by_prompt_and_version(db, prompt_id, version)
        if db_version:
            return PromptVersionResponse.model_validate(db_version)
        return None
    
    def get_all_versions(self, db: Session, prompt_id: UUID) -> List[PromptVersionResponse]:
        db_versions = prompt_version_repository.get_all_by_prompt(db, prompt_id)
        return [PromptVersionResponse.model_validate(v) for v in db_versions]
    
    def get_latest_version(self, db: Session, prompt_id: UUID) -> Optional[PromptVersionResponse]:
        db_version = prompt_version_repository.get_latest_by_prompt(db, prompt_id)
        if db_version:
            return PromptVersionResponse.model_validate(db_version)
        return None


prompt_version_service = PromptVersionService()

