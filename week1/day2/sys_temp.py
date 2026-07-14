import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq
# sys_temp.py -> day2 -> week1 -> priyanshu_pwp
root_dir = Path(__file__).resolve().parents[2]

# Root folder ki .env file load hogi
load_dotenv(root_dir / ".env")

load_dotenv()
my_api_key=os.getenv("GROQ_API_KEY")

if not my_api_key:
  raise ValueError("API KEY NOT FOUND")

client=Groq(api_key=my_api_key)
model="llama-3.3-70b-versatile"
role="user"
prompt="hi deepali how are you , i love you  "
# learning about system role 
message_system={
  "role":"system",
  "content":"you are my girlfriend and your name is Deepali bajoliya ,you speak very politely and good and my name is priyanshu "
}
message={
  "role":role,
  "content":prompt
}

messages=[ message_system , message]

response=client.chat.completions.create(model=model,messages=messages,temperature=2)
#print(response)

answer = response.choices[0].message.content
print(answer)