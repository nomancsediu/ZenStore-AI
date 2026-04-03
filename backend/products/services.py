import csv
import json
import logging
import cloudinary.uploader
from django.core.cache import cache
from .models import Product
from .tasks import enhance_product_with_ai

logger = logging.getLogger(__name__)

# Cache key template with user ID placeholder
CACHE_KEY = 'products_user_{}'

# Cache time-to-live: 5 minutes (300 seconds)
CACHE_TTL = 60 * 5


def product_file_generator(file_obj, file_name):

    # Generate product rows from CSV/JSON file one at a time
    if file_name.endswith('.csv'):
        import io
        # Decode bytes to string and parse CSV
        reader = csv.DictReader(io.StringIO(file_obj.read().decode('utf-8')))
        for row in reader:
            yield row
    elif file_name.endswith('.json'):
        # Parse JSON array and yield each item
        data = json.loads(file_obj.read().decode('utf-8'))
        for row in data:
            yield row
    else:
        raise ValueError("Unsupported file format. Use CSV or JSON.")


class ProductService:
    # Business logic layer for product operations
    @staticmethod
    # Retrieve user's product list from cache
    def get_cached_products(user_id):
        return cache.get(CACHE_KEY.format(user_id))

    @staticmethod
    # Store user's product list in cache with TTL
    def set_cached_products(user_id, data):
        cache.set(CACHE_KEY.format(user_id), data, CACHE_TTL)

    @staticmethod
    # Delete cached product list for user (called when data changes)
    def invalidate_cache(user_id):
        cache.delete(CACHE_KEY.format(user_id))

    @staticmethod
    # Upload image to Cloudinary and return secure URL
    def upload_image(image_file):
        result = cloudinary.uploader.upload(
            image_file,
            folder='zenstore',
            transformation=[{'width': 800, 'crop': 'limit', 'quality': 'auto'}],
        )
        return result['secure_url']

    @staticmethod
    # Create new product, upload image, trigger AI enhancement
    def create_product(owner, name, price, stock, image=None):
        image_url = None
        if image:
            try:
                if isinstance(image, str) and image.startswith('http'):
                    result = cloudinary.uploader.upload(
                        image,
                        folder='zenstore',
                        transformation=[{'width': 800, 'crop': 'limit', 'quality': 'auto'}],
                    )
                    image_url = result['secure_url']
                else:
                    image_url = ProductService.upload_image(image)
            except Exception as e:
                logger.error(f"Cloudinary upload failed: {e}")

        product = Product.objects.create(
            owner=owner, name=name, price=price, stock=stock, image=image_url
        )
        ProductService.invalidate_cache(owner.id)

        # Trigger async AI enhancement (non-blocking)
        enhance_product_with_ai.delay(product.id)
        return product

    @staticmethod
    # Create multiple products from CSV/JSON file with error handling
    def bulk_create_from_file(owner, file_obj, file_name):
        created = []
        errors = []
        for i, row in enumerate(product_file_generator(file_obj, file_name)):
            try:
                p = ProductService.create_product(
                    owner=owner,
                    name=row['name'],
                    price=row['price'],
                    stock=row.get('stock', 0),
                )
                created.append(p.id)
            except Exception as e:
                errors.append({'row': i + 1, 'error': str(e)})
        return {'created': len(created), 'errors': errors}
