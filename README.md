# Simple Task Manager

A lightweight full-stack task management app:
- Django backend with REST API
- PostgreSQL-ready configuration
- React frontend using CDN scripts

## Backend setup

1. Create a Python virtual environment:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Configure PostgreSQL (optional):

```bash
export POSTGRES_DB=taskdb
export POSTGRES_USER=taskuser
export POSTGRES_PASSWORD=taskpass
export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432
```

If you don't set `POSTGRES_DB`, the app will use `sqlite3` automatically.

3. Run migrations:

```bash
python manage.py migrate
```

4. Start the Django server:

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`.

## Frontend setup

Open `frontend/index.html` in the browser, or serve it with a simple HTTP server:

```bash
cd frontend
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## API endpoints

- `POST /api/auth/register/` - register a new user
- `POST /api/auth/login/` - login and receive a token
- `GET/POST /api/projects/` - list/create projects
- `GET/POST /api/tasks/` - list/create tasks
- `PATCH /api/tasks/{id}/` - update task status

## To open live

Step 1 — Terminal 1 (Backend + DB)
cd /workspaces/task-manager
docker compose up
Wait until you see Watching for file changes with StatReloader — that means Django + PostgreSQL are ready.

Step 2 — Terminal 2 (Frontend)
Click + to open a new terminal, then:
bashcd /workspaces/task-manager/frontend-react
npm run dev -- --host
Wait until you see VITE ready.

Step 3 — Make ports public
Go to the Ports tab, right-click 8000 → Port Visibility → Public, do the same for 5173.

Step 4 — Open the app
Click the globe icon next to port 5173 — that's your app.

## Notes

- The frontend stores the API token in local storage.
- CORS is enabled so the frontend can call the backend from `localhost`.





# Task Manager

A full-stack task management application built with Django, PostgreSQL, and React.

## Tech Stack

- **Backend:** Django + Django REST Framework
- **Database:** PostgreSQL
- **Frontend:** React (Vite) + Axios + React Router
- **DevOps:** Docker Compose

## Features

- User registration and login (token-based auth)
- Create and manage projects
- Create tasks inside projects
- Update task status (Todo / In Progress / Done)
- Filter tasks by status

## Project Structure

task-manager/
├── backend/          # Django REST API
├── frontend-react/   # React (Vite) frontend
└── docker-compose.yml

## Running the App

### 1. Start the backend + database

```bash
docker compose up
```

Wait until you see `Watching for file changes with StatReloader`.

### 2. Start the frontend

Open a second terminal:

```bash
cd frontend-react
npm install
npm run dev -- --host
```

### 3. Open the app

Visit `http://localhost:5173` in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register a new user |
| POST | `/api/auth/login/` | Login and receive token |
| GET/POST | `/api/projects/` | List or create projects |
| GET/POST | `/api/tasks/` | List or create tasks |
| PATCH | `/api/tasks/{id}/` | Update task status |
