# Prompt Versioning Service

A minimal FastAPI service for managing prompts and their versions.

## Features

- Create, read, update, and delete prompts
- Version management for prompts
- PostgreSQL database with SQLAlchemy ORM
- Clean architecture with repositories, services, and routes
- Docker support

## Project Structure

```
backend/
├── main.py                 # FastAPI app entry point
├── core/
│   ├── settings.py        # Configuration management
│   └── logger.py          # Logging setup
├── db/
│   ├── base.py           # Database setup
│   └── models.py         # SQLAlchemy models
├── repositories/         # Data access layer
├── schemas/             # Pydantic models
├── services/            # Business logic layer
└── routes/              # API endpoints
```

## Setup

### Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

### Run with Docker Compose

```bash
docker-compose up --build
```

The API will be available at `http://localhost:8000`

### Run Locally

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up PostgreSQL and update DATABASE_URL in `.env`

3. Run the application:
```bash
python main.py
```

## API Endpoints

### Prompts

- `POST /prompts` - Create a new prompt
- `GET /prompts` - Get all prompts
- `GET /prompts/{prompt_id}` - Get a specific prompt
- `PUT /prompts/{prompt_id}` - Update a prompt
- `DELETE /prompts/{prompt_id}` - Delete a prompt

### Versions

- `POST /prompts/{prompt_id}/versions` - Create a new version
- `GET /prompts/{prompt_id}/versions` - Get all versions for a prompt
- `GET /prompts/{prompt_id}/versions/{version}` - Get a specific version
- `DELETE /prompts/{prompt_id}/versions/{version_id}` - Delete a version

### Health Check

- `GET /` - Root endpoint
- `GET /health` - Health check

## API Documentation

Once the service is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

