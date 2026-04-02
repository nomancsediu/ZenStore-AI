import time
import logging
from celery import shared_task
from core.llm_service import LLMService

logger = logging.getLogger(__name__)

@shared_task
def enhance_product_with_ai(product_id: int):
    from .models import Product
    from .services import ProductService
    try:
        product = Product.objects.get(id=product_id)
        product.ai_status = 'processing'
        product.save(update_fields=['ai_status'])
        start = time.time()
        result = LLMService().enhance_product(product.name)
        logger.info(f"AI enhancement for product {product_id} took {time.time() - start:.2f}s")
        product.ai_description = result.get('description')
        product.ai_category = result.get('category')
        product.ai_status = 'done'
        product.save(update_fields=['ai_description', 'ai_category', 'ai_status'])
        ProductService.invalidate_cache(product.owner_id)
    except Exception as e:
        logger.error(f"AI enhancement failed for product {product_id}: {e}")
        try:
            product = Product.objects.filter(id=product_id).first()
            if product:
                Product.objects.filter(id=product_id).update(ai_status='failed')
                ProductService.invalidate_cache(product.owner_id)
        except Exception:
            pass
