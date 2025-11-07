## Quick Start

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:8000  
- DB: localhost:5432

Run backend or frontend only:

```bash
docker-compose up backend
docker-compose up frontend
```


## Environment

backend/.env
- DATABASE_URL: "postgresql://postgres:postgres@db:5432/prompts"
- DATABASE_ECHO: False


## Bugs!
- frontend doesn't seem to run properly
- prompts sidebar shows incorrect number of prompts
- previous prompt versions don't show the author's name if it was inputted
