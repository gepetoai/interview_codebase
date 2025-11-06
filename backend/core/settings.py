from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/prompts"
    DATABASE_ECHO: bool = False
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

