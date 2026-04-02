import time
import logging
from celery import shared_task
from core.llm_service import LLMService

logger = logging.getLogger(__name__)

@shared_task
def enhance_product_with_ai(product_id: int):
    from .models import Product
    try:
        product = Product.objects.get(id=product_id)
        result = LLMService().enhance_product(product.name)
        product.ai_description = result.get('description')
        product.ai_category = result.get('category')
        product.save()
    except Exception as e:
        logger.error(f"AI enhancement failed for product {product_id}: {e}")


@shared_task
def simulate_image_processing(product_id: int):
    time.sleep(2)
    logger.info(f"Image processing done for product {product_id}")