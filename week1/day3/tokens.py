import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

root_dir = Path(__file__).resolve().parents[2]

load_dotenv(root_dir / ".env")

my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API KEY NOT FOUND")

client = Groq(api_key=my_api_key)

model = "llama-3.3-70b-versatile"
role = "user"

prompt1 = "hi"
prompt2 = "tell me history of taj mahal"
prompt3 = "how akbar is related to taj mahal"

prompts = [prompt1, prompt2, prompt3]

for prompt in prompts:
    message = {
        "role": role,
        "content": prompt
    }

    messages = [message]

    response = client.chat.completions.create(
        model=model,
        messages=messages
    )

    usage = response.usage

    print(f"Prompt: {prompt}")
    print(f"Prompt Tokens: {usage.prompt_tokens}")
    print(f"Completion Tokens: {usage.completion_tokens}")
    print(f"Total Tokens: {usage.total_tokens}")
    print("-" * 50)