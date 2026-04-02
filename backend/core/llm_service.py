import os
import json
from groq import Groq

class LLMService:
    def __init__(self):
        self.client = Groq(api_key=os.getenv('GROQ_API_KEY'))
        self.model = 'llama-3.3-70b-versatile'

    def enhance_product(self, name: str) -> dict:
        prompt = f"For product '{name}', give a short marketing description and a category. Reply in JSON: {{\"description\": \"...\", \"category\": \"...\"}}"
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
        )
        return json.loads(response.choices[0].message.content)
