## Quick Start

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:8000  
- DB: localhost:5432



## Environment

backend/.env
- DATABASE_URL: "postgresql://postgres:postgres@db:5432/prompts"
- DATABASE_ECHO: False


## Bugs!
1. frontend isn't running for some reason
2. once i create a prompt, im unable to select it
3. prompt versions don't show the author's name, even if it was inputted
4. prompts sidebar shows incorrect number of prompts
5. if i create multiple versions of a prompt, the name spontaneously changes at some point