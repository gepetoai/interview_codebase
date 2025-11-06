# Prompt Versioning Management System

A full-stack application for managing prompts with version control, built with FastAPI backend and Next.js frontend.

## Architecture

- **Backend**: FastAPI + PostgreSQL + SQLAlchemy
- **Frontend**: Next.js 14 + React 18 + shadcn/ui
- **Database**: PostgreSQL 15
- **Containerization**: Docker & Docker Compose

## Quick Start

### Using Docker Compose (Recommended)

Start all services (database, backend, and frontend):

```bash
docker-compose up
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

## Features

### Backend API
- Create, read, update, delete prompts
- Automatic version tracking on content updates
- Revert to previous versions
- Full version history
- RESTful API with OpenAPI documentation

### Frontend UI
- Clean, minimal interface
- Create and manage prompts
- Edit prompt content with automatic versioning
- View complete version history
- Revert to any previous version
- Delete prompts with confirmation
- Responsive design

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

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

## Development

### Backend Development

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend
Create `backend/.env`:
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/prompts
```

### Frontend
The `NEXT_PUBLIC_API_URL` is configured in docker-compose.yml and defaults to `http://localhost:8000`

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI

## License

MIT

