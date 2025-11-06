# Prompt Versioning Management System

A full-stack application for managing prompts with version control, built with FastAPI backend and Next.js frontend.

## Quick Start

### Using Docker Compose (Recommended)

Start all services (database, backend, and frontend):

```bash
docker-compose up --build
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- PostgreSQL: localhost:5432

### Running Individual Services

Start only the backend:
```bash
docker-compose up backend
```

Start only the frontend:
```bash
docker-compose up frontend
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs

## Project Structure

```
.
├── backend/
│   ├── core/          # Configuration and logging
│   ├── db/            # Database models and connection
│   ├── repositories/  # Data access layer
│   ├── routes/        # API endpoints
│   ├── schemas/       # Pydantic schemas
│   ├── services/      # Business logic
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app/           # Next.js app directory
│   ├── components/    # shadcn/ui components
│   ├── lib/           # Utilities and API client
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Environment Variables

### Backend
Create `backend/.env`:
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/prompts
```

### Frontend
The `NEXT_PUBLIC_API_URL` is configured in docker-compose.yml and defaults to `http://localhost:8000`
