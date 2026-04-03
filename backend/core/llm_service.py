from groq import Groq
from django.conf import settings
from core.decorators import performance_logger

# Service class for AI-powered product enhancement using Groq LLM
class LLMService:
    def __init__(self):
        # Initialize Groq client with API key from Django settings
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        # Using fastest Groq model for optimal response time
        self.model = "llama-3.1-8b-instant" 

    @performance_logger
    def enhance_product(self, product_name: str) -> dict:
        # Generate a marketing description and category for a product using Groq LLM
        prompt = f"Product: '{product_name}'. Write a catchy 2-sentence marketing description (each sentence 15-20 words, engaging and persuasive). Then one category word. JSON only: {{\"description\": \"...\", \"category\": \"...\"}}"

        # Call Groq API with optimized parameters
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,  # Balance between creativity and consistency
            max_tokens=200,   # Limit response length for cost control
        )

        import json
        content = response.choices[0].message.content.strip()
         # Extract JSON from response (LLM may add extra text)
        start = content.find('{')
        end = content.rfind('}') + 1
        data = json.loads(content[start:end])
        return {
            'description': data.get('description', ''),
            'category': data.get('category', 'General'),
        }
