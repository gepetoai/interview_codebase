from sqlalchemy.orm import Session
from repositories.prompt_repository import prompt_repository
from repositories.prompt_version_repository import prompt_version_repository
from services.prompt_version_service import prompt_version_service
from schemas.prompt import PromptCreate, PromptRename, PromptContentUpdate, PromptResponse
from schemas.prompt_version import PromptVersionResponse
from typing import List, Optional
from uuid import UUID


class PromptService:
    def create_prompt(self, db: Session, prompt_data: PromptCreate) -> PromptResponse:
        try:
            db_prompt = prompt_repository.create(db, prompt_data.name)
            prompt_version_repository.create(
                db, 
                db_prompt.id, 
                1, 
                prompt_data.content, 
                prompt_data.created_by
            )
            db.commit()
            return PromptResponse.model_validate(db_prompt)
        except Exception:
            db.rollback()
            raise
    
    def get_prompt(self, db: Session, prompt_id: UUID) -> Optional[PromptResponse]:
        db_prompt = prompt_repository.get(db, prompt_id)
        if db_prompt:
            return PromptResponse.model_validate(db_prompt)
        return None
    
    def get_all_prompts(self, db: Session, skip: int = 0, limit: int = 100) -> List[PromptResponse]:
        db_prompts = prompt_repository.get_all(db, skip, limit)
        return [PromptResponse.model_validate(p) for p in db_prompts]
    
    def rename_prompt(self, db: Session, prompt_id: UUID, rename_data: PromptRename) -> Optional[PromptResponse]:
        try:
            db_prompt = prompt_repository.rename(db, prompt_id, rename_data.name)
            if db_prompt:
                db.commit()
                return PromptResponse.model_validate(db_prompt)
            return None
        except Exception:
            db.rollback()
            raise
    
    def update_prompt_content(self, db: Session, prompt_id: UUID, update_data: PromptContentUpdate) -> Optional[PromptResponse]:
        try:
            db_prompt = prompt_repository.get(db, prompt_id)
            if not db_prompt:
                return None

            latest_version = prompt_version_repository.get_latest_version_number(db, prompt_id)
            prompt_version_repository.create(
                db,
                prompt_id,
                latest_version + 1,
                update_data.content,
                update_data.created_by
            )

            versions = prompt_version_repository.get_all_by_prompt(db, prompt_id)
            if len(versions) > 3:
                new_name = update_data.content[:5]
                prompt_repository.rename(db, prompt_id, new_name)

            db.commit()
            return PromptResponse.model_validate(db_prompt)
        except Exception:
            db.rollback()
            raise
    
    def revert_to_version(self, db: Session, prompt_id: UUID, version: int, created_by: Optional[str] = None) -> Optional[PromptResponse]:
        try:
            db_prompt = prompt_repository.get(db, prompt_id)
            if not db_prompt:
                return None
            
            old_version = prompt_version_repository.get_by_prompt_and_version(db, prompt_id, version)
            if not old_version:
                raise ValueError(f"Version {version} not found")
            
            latest_version = prompt_version_repository.get_latest_version_number(db, prompt_id)
            prompt_version_repository.create(
                db,
                prompt_id,
                latest_version + 1,
                old_version.content,
                created_by
            )
            db.commit()
            return PromptResponse.model_validate(db_prompt)
        except Exception:
            db.rollback()
            raise
    
    def delete_prompt(self, db: Session, prompt_id: UUID) -> bool:
        try:
            result = prompt_repository.delete(db, prompt_id)
            if result:
                db.commit()
            return result
        except Exception:
            db.rollback()
            raise
    
    def get_latest_version(self, db: Session, prompt_id: UUID) -> Optional[PromptVersionResponse]:
        return prompt_version_service.get_latest_version(db, prompt_id)
    
    def get_version(self, db: Session, prompt_id: UUID, version: int) -> Optional[PromptVersionResponse]:
        return prompt_version_service.get_version_by_number(db, prompt_id, version)
    
    def get_all_versions(self, db: Session, prompt_id: UUID) -> List[PromptVersionResponse]:
        return prompt_version_service.get_all_versions(db, prompt_id)


prompt_service = PromptService()
