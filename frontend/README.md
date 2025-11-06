# Prompt Manager Frontend

A minimal Next.js frontend with shadcn/ui for managing prompts with version control.

## Features

- Create, edit, and delete prompts
- View version history for each prompt
- Revert to previous versions
- Clean, minimal UI with shadcn/ui components

## Running with Docker

The frontend is configured to run with Docker Compose from the root directory:

```bash
# From the root of the project
docker-compose up frontend
```

The frontend will be available at `http://localhost:3000`

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: `http://localhost:8000`)

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components

