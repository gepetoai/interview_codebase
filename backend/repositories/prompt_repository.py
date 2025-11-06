from sqlalchemy.orm import Session
from db.models import Prompt
from typing import List, Optional
from uuid import UUID


class PromptRepository:
    def create(self, db: Session, name: str) -> Prompt:
        db_prompt = Prompt(name=name)
        db.add(db_prompt)
        db.flush()
        db.refresh(db_prompt)
        return db_prompt
    
    def get(self, db: Session, prompt_id: UUID) -> Optional[Prompt]:
        return db.query(Prompt).filter(Prompt.id == prompt_id).first()
    
    def get_by_name(self, db: Session, name: str) -> Optional[Prompt]:
        return db.query(Prompt).filter(Prompt.name == name).first()
    
    def get_all(self, db: Session, skip: int = 0, limit: int = 100) -> List[Prompt]:
        return db.query(Prompt).offset(skip).limit(limit).all()
    
    def rename(self, db: Session, prompt_id: UUID, name: str) -> Optional[Prompt]:
        db_prompt = db.query(Prompt).filter(Prompt.id == prompt_id).first()
        if db_prompt:
            db_prompt.name = name
            db.flush()
            db.refresh(db_prompt)
            return db_prompt
        return None
    
    def delete(self, db: Session, prompt_id: UUID) -> bool:
        db_prompt = db.query(Prompt).filter(Prompt.id == prompt_id).first()
        if db_prompt:
            db.delete(db_prompt)
            db.flush()
            return True
        return False


prompt_repository = PromptRepository()

