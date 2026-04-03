import csv
import json
import io


def csv_product_generator(file_obj):
# Generator that yields product dicts from a CSV file one row at a time

    file_obj.seek(0)  # Reset file pointer to beginning
    content = file_obj.read()
    if isinstance(content, bytes):
        content = content.decode('utf-8')    # Convert bytes to string for CSV reader
    reader = csv.DictReader(io.StringIO(content))   # Read CSV as dictionary
    for row in reader:
        yield {
            'name': row.get('name', '').strip(),
            'price': row.get('price', '0').strip(),
            'stock': row.get('stock', '0').strip(),
        }


def json_product_generator(file_obj):
# Generator that yields product dicts from a JSON array file
    file_obj.seek(0)
    content = file_obj.read()
    if isinstance(content, bytes):
        content = content.decode('utf-8')  # Convert bytes to string for JSON parser
    data = json.loads(content)  # Parse entire JSON array
    for item in data:
        yield {
            'name': item.get('name', '').strip(),
            'price': str(item.get('price', '0')),
            'stock': str(item.get('stock', '0')),
        }


def product_file_generator(file_obj, file_name):
# Routes to the correct generator based on file extension
    if file_name.endswith('.csv'):
        yield from csv_product_generator(file_obj)  # Delegate to CSV generator
    elif file_name.endswith('.json'):
        yield from json_product_generator(file_obj)  # Delegate to JSON generator
    else:
        raise ValueError("Unsupported file format. Use CSV or JSON.")

