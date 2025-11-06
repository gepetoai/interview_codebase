from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    DATABASE_ECHO: bool 
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

