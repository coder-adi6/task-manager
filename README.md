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
├── backend/         
# Django REST API
├── frontend-react/  
# React (Vite) frontend
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
