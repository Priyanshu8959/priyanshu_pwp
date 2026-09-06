import os
import json
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from groq import Groq
from pydantic import BaseModel, Field
from pypdf import PdfReader


# =========================
# ENVIRONMENT & GROQ CLIENT
# =========================

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is not set in .env file")

client = Groq(api_key=api_key)

model = "openai/gpt-oss-120b"

app = FastAPI(title="HireMeAI API")

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",  # TODO: replace "*" with your deployed frontend URL, e.g. "https://hiremeai.vercel.app"
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# PYDANTIC MODELS
# =========================

class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = Field(default_factory=list)


class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = Field(default_factory=list)
    experience: list[Experience] = Field(default_factory=list)
    education: list[str] = Field(default_factory=list)
    projects: list[str] = Field(default_factory=list)
    certifications: list[str] = Field(default_factory=list)


class ChatRequest(BaseModel):
    question: str


# Generate JSON schema for the LLM
resume_schema = Resume.model_json_schema()


# =========================
# READ PDF
# =========================

def read_pdf(file_path: Path) -> str:

    if not file_path.exists():
        raise FileNotFoundError(
            f"Resume file not found: {file_path}"
        )

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


# =========================
# PARSE RESUME
# =========================

def parse_resume(resume_text: str) -> Resume:

    system_prompt = f"""
You are an expert resume parser.

Your task is to extract structured information from a resume.

Extract information based on meaning, not only exact section headings.

For example, these can all represent experience:

- Experience
- Professional Experience
- Work History
- Employment
- Internships
- Work Experience

Skills can appear anywhere in the resume, including:

- Skills section
- Experience
- Internships
- Projects
- Education
- Certifications

Return ONLY valid JSON matching this schema:

{json.dumps(resume_schema, indent=2)}

Important rules:

1. Do not invent information.
2. Do not assume missing information.
3. If a value is unavailable, return null.
4. If a list has no information, return an empty list.
5. Include internships inside experiences.
6. Extract relevant skills mentioned throughout the resume.
7. total_experience_years must be a number such as 1.5 or 2.0.
8. Do not write "years" inside total_experience_years.
9. Preserve the meaning of the original resume.
10. Return ONLY JSON. Do not add explanations or markdown.
"""

    user_prompt = f"""
Parse the following resume:

---------------- RESUME ----------------

{resume_text}

-------------- END RESUME --------------
"""

    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": user_prompt
        }
    ]

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        response_format={
            "type": "json_object"
        }
    )

    raw_output = response.choices[0].message.content

    if not raw_output:
        raise ValueError("LLM returned an empty response")

    try:
        data = json.loads(raw_output)
    except json.JSONDecodeError as e:
        raise ValueError(
            f"LLM returned invalid JSON: {e}"
        )

    try:
        resume = Resume(**data)
    except Exception as e:
        raise ValueError(
            f"Resume validation failed: {e}"
        )

    return resume


# =========================
# ASK CANDIDATE
# =========================

def ask_candidate(question: str, resume: Resume) -> str:

    system_prompt = f"""
You are an AI assistant representing a job candidate.

Below is everything you know about the candidate:

{resume.model_dump_json(indent=2)}

Your job is to answer questions as if the candidate is being interviewed by HR.

Rules:

1. Answer ONLY using the information provided in the resume.
2. Never hallucinate.
3. Never create skills, experience, projects, education, or achievements.
4. If the information is unavailable, say exactly:

"I don't have enough information to answer that."

5. Be professional.
6. Keep answers clear and concise.
7. Answer in first person, as if you are the candidate.
8. Do not mention that you are an AI.
9. Do not mention the internal resume parsing process.
"""

    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": question
        }
    ]

    response = client.chat.completions.create(
        model=model,
        messages=messages
    )

    answer = response.choices[0].message.content

    if not answer:
        return "I don't have enough information to answer that."

    return answer


# =========================
# HOME ROUTE
# =========================

@app.get("/")
def home():

    return {
        "message": "Resume AI API is running"
    }


# =========================
# CHAT ROUTE
# =========================

@app.post("/chat")
def chat(request: ChatRequest):

    try:

        # Resume location — resolved relative to this file, not CWD
        resume_path = Path(__file__).parent / "my_resume.pdf"

        # Read PDF
        resume_text = read_pdf(resume_path)

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from resume PDF"
            )

        # Parse resume
        resume = parse_resume(resume_text)

        # Ask candidate
        answer = ask_candidate(
            request.question,
            resume
        )

        return {
            "answer": answer
        }

    except FileNotFoundError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except HTTPException:

        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )