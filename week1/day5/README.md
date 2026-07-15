# 🚀 Week 1 - Day 5: AI Resume Parser and Candidate Ranking System

## 📌 Overview

On Day 5, I built an **AI-powered Resume Parser and Candidate Ranking System** using Python, Groq API, Pydantic, PDF/DOCX parsing, and structured JSON outputs.

The application reads multiple resumes, extracts candidate information, compares each resume with a job description, calculates a matching score, and displays the best and lowest-matching candidates.

---

## 🎯 What I Learned

* Reading resume files in **PDF and DOCX formats**
* Extracting text from PDFs using `pypdf`
* Extracting paragraphs and tables from Word files using `python-docx`
* Parsing job descriptions using an LLM
* Creating structured schemas using **Pydantic**
* Generating structured JSON output using Groq
* Converting JSON strings into Python objects
* Comparing resumes with job requirements
* Calculating candidate-job matching scores
* Sorting candidates based on their scores
* Processing multiple resumes using loops
* Handling missing information using `None` and empty lists

---

## 🧠 Project Workflow

```text
Job Description
       ↓
Extract Required Skills and Responsibilities
       ↓
Read Resume PDF/DOCX
       ↓
Extract Resume Text
       ↓
Parse Candidate Information
       ↓
Compare Resume with Job Description
       ↓
Generate Match Score and Details
       ↓
Rank All Candidates
       ↓
Display Top and Lowest Candidates
```

---

## 🏗️ Pydantic Models

### Job Description Model

The `JobD` model stores:

* Job role
* Required skills
* Preferred skills
* Minimum experience
* Education requirements
* Responsibilities

### Resume Model

The `Resume` model stores:

* Candidate name
* Email
* Phone number
* Total experience
* Skills
* Work experience
* Education
* Projects
* Certifications

### Match Result Model

The `MatchResult` model stores:

* Overall matching score
* Detailed comparison result

---

## 📄 Supported Resume Formats

The application currently supports:

```text
.pdf
.docx
```

PDF files are processed using:

```python
PdfReader
```

Word files are processed using:

```python
Document
```

---

## 📂 Project Structure

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

The `.env` file is stored in the root project folder and is not committed to GitHub.

---

## 🛠️ Technologies Used

* Python
* Groq API
* Pydantic
* JSON
* pypdf
* python-docx
* python-dotenv
* pathlib
* uv
* Git and GitHub

---

## 🚀 Main Features

* Reads multiple resumes automatically
* Supports both PDF and Word documents
* Extracts candidate details using an LLM
* Extracts structured job requirements
* Compares every candidate with the job description
* Generates a matching percentage
* Identifies matching and missing skills
* Checks education and experience requirements
* Sorts candidates from highest to lowest score
* Displays the top two and lowest two candidates

---

## 📦 Installation

Install the required dependencies using `uv`:

```bash
uv add groq
uv add pydantic
uv add python-dotenv
uv add pypdf
uv add python-docx
```

---

## 🔑 Environment Variable

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key
```

Do not upload the `.env` file to GitHub.

Add these entries to `.gitignore`:

```gitignore
.env
.venv/
__pycache__/
```

---

## ▶️ Run the Project

Open the terminal inside the `day5` folder:

```bash
python resume_parser.py
```

Or run it using `uv`:

```bash
uv run resume_parser.py
```

---

## 📊 Example Output

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

---

## 💡 Key Takeaways

* Pydantic makes LLM responses structured and easier to validate.
* JSON mode helps produce machine-readable AI responses.
* Resume content can appear in paragraphs, tables, projects, or experience sections.
* Job matching should consider skills, education, projects, and experience.
* LLM-based extraction is more flexible than depending only on exact headings.
* PDF files must contain readable text and must not be empty.
* AI can automate the initial resume-screening process, but final hiring decisions should still involve human review.

---


