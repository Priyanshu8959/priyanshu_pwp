import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

root_dir = Path(__file__).resolve().parents[2]

load_dotenv(root_dir / ".env")

# load_dotenv()
# Ye dobara call karna required nahi hai because root .env already load ho chuki hai.
# Error nahi tha, bas unnecessary tha.

my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API KEY NOT FOUND")

client = Groq(api_key=my_api_key)
model = "llama-3.3-70b-versatile"
role = "user"

# structure
from pydantic import BaseModel

class Ticket(BaseModel):
    Name: str
    Email: str
    Girlfriend_name: str
    Phone_numer : str
    Issue: str


schema = Ticket.model_json_schema()

response_formate = {
    "type": "json_object"
}

system_prompt = f"""
Extract the personal information from the given text according to the Ticket schema.

Return only valid JSON.

Ticket schema:
{schema}

If Issue is not present in the text, write the phone number inside Issue.
"""

message_system = {
    "role": "system",
    "content": system_prompt
}

text = "Hello my name is Priyanshu Pawar and my Girlfriend name is Deepali Bajoliya and my email is pawarpriyanshu198@gmail.com and my phone number is 8109987611 and i wanna book one romantic movie ticket"

prompt = f"""
This is a movie ticket request. Please extract personal information from this text:

{text}
"""

message = {
    "role": role,
    "content": prompt
}

messages = [message_system, message]

response = client.chat.completions.create(
    model=model,
    messages=messages,
    response_format=response_formate
)

answer = response.choices[0].message.content

#print(answer)


# Isko read kaise karte hain
import json

raw_json = answer

# data_file = json.load(raw_json)
# Wrong because json.load() JSON file ko read karta hai.
# Tumhara raw_json ek string hai, file nahi.

data_file = json.loads(raw_json)
# json.loads() JSON string ko Python dictionary mein convert karta hai.

ticket = Ticket(**data_file)
# **data_file dictionary ki values ko Ticket fields mein pass karta hai.

print(ticket.Name)
print(ticket.Girlfriend_name)
print(ticket.Phone_numer)
print(ticket.Issue)