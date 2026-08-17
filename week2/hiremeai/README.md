# HireMeAI

An AI-powered personal portfolio where recruiters and visitors can chat with an AI assistant to learn about Priyanshu Pawar's skills, experience, and background.

## Tech Stack

**Backend** — Python, FastAPI, Groq API, pypdf, uvicorn  
**Frontend** — React, Vite, Vanilla CSS

## Project Structure

```
hiremeai/
  backend/
    main.py        # FastAPI server, AI chat logic, resume parsing
    my_resume.pdf  # Source document for AI context
  frontend/
    src/
      components/  # React UI components
      api/         # API client
```

## Prerequisites

- Python 3.11+
- Node.js 18+
- uv (Python package manager)
- A Groq API key

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Priyanshu8959/hiremeai.git
cd hiremeai
```

### 2. Configure environment

Create a `.env` file in the project root:

```
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Install backend dependencies

```bash
uv sync
```

### 4. Install frontend dependencies

```bash
cd frontend
npm install
```

## Running the Project

Open two terminals.

**Terminal 1 — Backend**

```bash
uv run uvicorn backend.main:app --reload
```

The API will be available at `http://localhost:8000`.

**Terminal 2 — Frontend**

```bash
cd frontend
npm run dev
```

The app will open at `http://localhost:5173`.

## Features

- AI chat assistant trained on resume data
- macOS-style desktop UI with draggable windows
- Achievements, skills, and experience viewer
- Resume download

## Author

Priyanshu Pawar — [linkedin.com/in/priyanshupawar](https://www.linkedin.com/in/priyanshupawar/) — [github.com/Priyanshu8959](https://github.com/Priyanshu8959)
