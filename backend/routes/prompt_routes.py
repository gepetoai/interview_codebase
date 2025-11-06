from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.base import get_db
from services.prompt_service import prompt_service
from schemas.prompt import PromptCreate, PromptRename, PromptContentUpdate, PromptResponse
from schemas.prompt_version import PromptVersionResponse
from typing import List, Optional
from uuid import UUID

router = APIRouter(prefix="/prompts", tags=["prompts"])


@router.post("", response_model=PromptResponse, status_code=201)
def create_prompt(prompt_data: PromptCreate, db: Session = Depends(get_db)):
    try:
        return prompt_service.create_prompt(db, prompt_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("", response_model=List[PromptResponse])
def get_all_prompts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        return prompt_service.get_all_prompts(db, skip, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{prompt_id}", response_model=PromptResponse)
def get_prompt(prompt_id: UUID, db: Session = Depends(get_db)):
    try:
        prompt = prompt_service.get_prompt(db, prompt_id)
        if not prompt:
            raise HTTPException(status_code=404, detail="Prompt not found")
        return prompt
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/{prompt_id}", response_model=PromptResponse)
def rename_prompt(prompt_id: UUID, rename_data: PromptRename, db: Session = Depends(get_db)):
    try:
        prompt = prompt_service.rename_prompt(db, prompt_id, rename_data)
        if not prompt:
            raise HTTPException(status_code=404, detail="Prompt not found")
        return prompt
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{prompt_id}", response_model=PromptResponse)
def update_prompt_content(prompt_id: UUID, update_data: PromptContentUpdate, db: Session = Depends(get_db)):
    try:
        prompt = prompt_service.update_prompt_content(db, prompt_id, update_data)
        if not prompt:
            raise HTTPException(status_code=404, detail="Prompt not found")
        return prompt
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{prompt_id}", status_code=204)
def delete_prompt(prompt_id: UUID, db: Session = Depends(get_db)):
    try:
        deleted = prompt_service.delete_prompt(db, prompt_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Prompt not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{prompt_id}/latest", response_model=PromptVersionResponse)
def get_latest_version(prompt_id: UUID, db: Session = Depends(get_db)):
    try:
        version = prompt_service.get_latest_version(db, prompt_id)
        if not version:
            raise HTTPException(status_code=404, detail="No versions found")
        return version
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{prompt_id}/versions", response_model=List[PromptVersionResponse])
def get_all_versions(prompt_id: UUID, db: Session = Depends(get_db)):
    try:
        return prompt_service.get_all_versions(db, prompt_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{prompt_id}/versions/{version}", response_model=PromptVersionResponse)
def get_version(prompt_id: UUID, version: int, db: Session = Depends(get_db)):
    try:
        version_obj = prompt_service.get_version(db, prompt_id, version)
        if not version_obj:
            raise HTTPException(status_code=404, detail="Version not found")
        return version_obj
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{prompt_id}/revert/{version}", response_model=PromptResponse)
def revert_to_version(prompt_id: UUID, version: int, created_by: Optional[str] = None, db: Session = Depends(get_db)):
    try:
        prompt = prompt_service.revert_to_version(db, prompt_id, version, created_by)
        if not prompt:
            raise HTTPException(status_code=404, detail="Prompt not found")
        return prompt
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
