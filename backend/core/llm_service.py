from groq import Groq
from django.conf import settings
from core.decorators import performance_logger


class LLMService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = "llama-3.1-8b-instant"  # fastest Groq model

    @performance_logger
    def enhance_product(self, product_name: str) -> dict:
        """Generate a marketing description and category for a product using Groq LLM"""
        prompt = f"Product: '{product_name}'. Write a catchy 2-sentence marketing description (each sentence 15-20 words, engaging and persuasive). Then one category word. JSON only: {{\"description\": \"...\", \"category\": \"...\"}}"

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=200,
        )

        import json
        content = response.choices[0].message.content.strip()
        # Extract JSON from response
        start = content.find('{')
        end = content.rfind('}') + 1
        data = json.loads(content[start:end])
        return {
            'description': data.get('description', ''),
            'category': data.get('category', 'General'),
        }
