from sqlalchemy.orm import Session
from db.models import PromptVersion
from typing import List, Optional
from uuid import UUID


class PromptVersionRepository:
    def create(self, db: Session, prompt_id: UUID, version: int, content: str, created_by: Optional[str]) -> PromptVersion:
        db_version = PromptVersion(
            prompt_id=prompt_id,
            version=version,
            content=content,
            created_by=created_by
        )
        db.add(db_version)
        db.flush()
        db.refresh(db_version)
        return db_version
    
    def get_by_prompt_and_version(self, db: Session, prompt_id: UUID, version: int) -> Optional[PromptVersion]:
        return db.query(PromptVersion).filter(
            PromptVersion.prompt_id == prompt_id,
            PromptVersion.version == version
        ).first()
    
    def get_all_by_prompt(self, db: Session, prompt_id: UUID) -> List[PromptVersion]:
        return db.query(PromptVersion).filter(
            PromptVersion.prompt_id == prompt_id
        ).order_by(PromptVersion.version.desc()).all()
    
    def get_latest_by_prompt(self, db: Session, prompt_id: UUID) -> Optional[PromptVersion]:
        return db.query(PromptVersion).filter(
            PromptVersion.prompt_id == prompt_id
        ).order_by(PromptVersion.version.desc()).first()
    
    def get_latest_version_number(self, db: Session, prompt_id: UUID) -> int:
        latest = self.get_latest_by_prompt(db, prompt_id)
        return latest.version if latest else 0


prompt_version_repository = PromptVersionRepository()

