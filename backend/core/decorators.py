import time
import logging

logger = logging.getLogger(__name__)  # Create logger for current module

def performance_logger(func):
    # Measures and logs execution time of any function
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        logger.info(f"{func.__name__} executed in {time.time() - start:.2f}s")
        return result
    return wrapper
