import time
import logging

logger = logging.getLogger(__name__)

def performance_logger(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        logger.info(f"{func.__name__} executed in {time.time() - start:.2f}s")
        return result
    return wrapper
