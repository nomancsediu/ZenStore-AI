import csv
import json
import logging
from django.core.cache import cache
from .models import Product
from .tasks import enhance_product_with_ai, simulate_image_processing

logger = logging.getLogger(__name__)

CACHE_KEY = 'products_user_{}'
CACHE_TTL = 60 * 5


def product_file_generator(file_obj, file_name):
    if file_name.endswith('.csv'):
        import io
        reader = csv.DictReader(io.StringIO(file_obj.read().decode('utf-8')))
        for row in reader:
            yield row
    elif file_name.endswith('.json'):
        data = json.loads(file_obj.read().decode('utf-8'))
        for row in data:
            yield row
    else:
        raise ValueError("Unsupported file format. Use CSV or JSON.")


class ProductService:
    @staticmethod
    def get_cached_products(user_id):
        return cache.get(CACHE_KEY.format(user_id))

    @staticmethod
    def set_cached_products(user_id, data):
        cache.set(CACHE_KEY.format(user_id), data, CACHE_TTL)

    @staticmethod
    def invalidate_cache(user_id):
        cache.delete(CACHE_KEY.format(user_id))

    @staticmethod
    def create_product(owner, name, price, stock, image=None):
        product = Product.objects.create(
            owner=owner, name=name, price=price, stock=stock, image=image
        )
        ProductService.invalidate_cache(owner.id)
        enhance_product_with_ai.delay(product.id)
        if image:
            simulate_image_processing.delay(product.id)
        return product

    @staticmethod
    def bulk_create_from_file(owner, file_obj, file_name):
        created = []
        for row in product_file_generator(file_obj, file_name):
            p = ProductService.create_product(
                owner=owner,
                name=row['name'],
                price=row['price'],
                stock=row.get('stock', 0),
            )
            created.append(p.id)
        return {'created': len(created), 'product_ids': created}