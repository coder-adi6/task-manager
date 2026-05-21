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

## Notes

- The frontend stores the API token in local storage.
- CORS is enabled so the frontend can call the backend from `localhost`.
