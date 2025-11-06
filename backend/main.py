from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.base import Base, engine
from routes.prompt_routes import router as prompt_router
from core.logger import logger

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Prompt Versioning Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prompt_router)


@app.get("/")
def root():
    return {"message": "Prompt Versioning Service"}


@app.get("/health")
def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    logger.info("Starting Prompt Versioning Service")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
