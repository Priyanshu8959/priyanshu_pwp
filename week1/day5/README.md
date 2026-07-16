# Week 1 – Day 5 | AI Resume Parser and Candidate Ranking System

## Project Overview

This project is an AI-powered Resume Parser and Candidate Ranking System built using Python, the Groq API, Pydantic, and PDF/DOCX parsing. The application reads multiple resumes, extracts candidate information, compares each resume with a job description, calculates a matching score, and ranks candidates based on their suitability for the role.

## What I Learned

- Reading resume files in PDF and DOCX formats
- Extracting text from PDF files using `pypdf`
- Extracting content from Word documents using `python-docx`
- Parsing job descriptions with a Large Language Model
- Creating structured data models using Pydantic
- Generating structured JSON responses with the Groq API
- Converting JSON strings into Python objects
- Comparing resumes with job requirements
- Calculating candidate-job matching scores
- Ranking candidates based on their scores
- Processing multiple resumes using loops
- Handling missing information using `None` and empty lists

## Project Workflow

```text
Job Description
       │
       ▼
Extract Required Skills and Responsibilities
       │
       ▼
Read Resume (PDF/DOCX)
       │
       ▼
Extract Resume Text
       │
       ▼
Parse Candidate Information
       │
       ▼
Compare with Job Requirements
       │
       ▼
Generate Match Score
       │
       ▼
Rank All Candidates
       │
       ▼
Display Top and Lowest Candidates
```

## Pydantic Models

### Job Description Model

The `JobD` model stores:

- Job role
- Required skills
- Preferred skills
- Minimum experience
- Education requirements
- Responsibilities

### Resume Model

The `Resume` model stores:

- Candidate name
- Email
- Phone number
- Total experience
- Skills
- Work experience
- Education
- Projects
- Certifications

### Match Result Model

The `MatchResult` model stores:

- Overall matching score
- Detailed comparison results

## Supported Resume Formats

The application currently supports:

- `.pdf`
- `.docx`

Libraries used:

- `PdfReader` for PDF files
- `Document` for Word documents

## Project Structure

```text
week1/
└── day5/
    ├── resume_parser.py
    ├── README.md
    ├── pyproject.toml
    ├── uv.lock
    ├── .python-version
    └── resumes/
        ├── candidate1.pdf
        ├── candidate2.pdf
        └── candidate3.docx
```

> **Note:** The `.env` file is stored in the project root directory and is excluded from version control.

## Technologies Used

- Python
- Groq API
- Pydantic
- JSON
- pypdf
- python-docx
- python-dotenv
- pathlib
- uv
- Git
- GitHub

## Features

- Reads multiple resumes automatically
- Supports both PDF and DOCX formats
- Extracts candidate information using an LLM
- Parses structured job descriptions
- Compares each candidate with job requirements
- Calculates candidate-job matching scores
- Identifies matching and missing skills
- Evaluates education and work experience
- Ranks candidates from highest to lowest score
- Displays the top and lowest-ranked candidates

## Installation

Install the required dependencies:

```bash
uv add groq
uv add pydantic
uv add python-dotenv
uv add pypdf
uv add python-docx
```

## Environment Configuration

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
```

Do not upload the `.env` file to GitHub.

Add the following entries to `.gitignore`:

```text
.env
.venv/
__pycache__/
```

## Running the Project

Using Python:

```bash
python resume_parser.py
```

Or using `uv`:

```bash
uv run resume_parser.py
```

## Sample Output

```text
Processing: candidate1.pdf
Score: 82

Processing: candidate2.pdf
Score: 69

Processing: candidate3.docx
Score: 75

TOP 2 CANDIDATES

Candidate 1 - 82%
Candidate 3 - 75%

LOWEST 2 CANDIDATES

Candidate 3 - 75%
Candidate 2 - 69%
```

## Key Takeaways

- Pydantic simplifies structured data validation for LLM responses.
- JSON output makes AI responses easier to process programmatically.
- Resume information can be extracted from paragraphs, tables, projects, and experience sections.
- Candidate evaluation should consider skills, education, projects, and work experience.
- LLM-based extraction is more flexible than relying only on fixed resume templates.
- PDF resumes should contain selectable text for accurate parsing.
- AI can automate resume screening, while final hiring decisions should always involve human evaluation.
