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
1. frontend isn't running for some reason
2. prompt versions don't show the author's name, even if it was inputted
3. prompts sidebar shows incorrect number of prompts
4. once i create a prompt, im unable to select it
5. if i create multiple versions of a prompt, the name spontaneously changes at some point