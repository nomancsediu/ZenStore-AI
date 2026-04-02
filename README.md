<div align="center">

<img src="frontend/src/assets/hero.png" alt="ZenStore AI" width="120"/>

<h1>ZenStore AI</h1>

<p><i>AI-powered E-commerce Store Management — where your products describe themselves.</i></p>

<p>
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white"/>
</p>

</div>

---

## Overview

**ZenStore AI** is a full-stack, production-grade e-commerce management platform where sellers can add products and the system automatically enhances product descriptions and categories using Large Language Models (LLM) via Groq's LLaMA API.

Built with a focus on clean architecture, asynchronous background processing, and real-world production patterns — including JWT authentication, Redis caching, Celery task queues, Cloudinary image storage, Swagger API documentation, and full Docker containerization.

---

## Assignment Requirements

| Requirement | Implementation |
|---|---|
| REST API | Django REST Framework with full CRUD and bulk upload endpoints |
| LLM Integration | Groq LLaMA (`llama-3.1-8b-instant`) generates 2-sentence description and category |
| Background Tasks | Celery + Redis handles AI generation asynchronously |
| OOP Principles | `LLMService`, `ProductService` classes with clear responsibilities |
| Custom Decorator | `@performance_logger` in `core/decorators.py` logs execution time |
| Python Generators | `csv_product_generator`, `json_product_generator` in `core/generators.py` |
| Caching Layer | Redis cache per user — invalidated on create, update, and delete |
| JWT Authentication | Simple JWT — each user sees only their own products |
| API Documentation | Swagger UI via `drf-spectacular` at `/api/schema/swagger-ui/` |
| Frontend (Bonus) | React 18 + Vite + Tailwind CSS |

---

## Core Features

| Feature | Description |
|---|---|
| JWT Authentication | Secure register and login — user-scoped data |
| Product CRUD | Full create, read, update, delete |
| AI Enhancement | Groq LLaMA generates catchy description and category |
| Async Processing | Celery workers handle AI tasks without blocking the API |
| Redis Caching | Per-user product cache with automatic invalidation |
| Cloudinary Upload | Cloud-based product image storage |
| Bulk Upload | Upload multiple products via CSV or JSON using Python Generators |
| Swagger Docs | Interactive API documentation at `/api/schema/swagger-ui/` |
| Dockerized | Frontend + Backend + Redis containerized |

---

## Tech Stack

### Backend
- Django + Django REST Framework
- Simple JWT — token-based authentication
- Celery — async background task processing
- Redis — caching and Celery message broker
- SQLite — database
- Cloudinary — image upload and storage
- Groq API (LLaMA 3.1) — AI product enhancement
- drf-spectacular — Swagger / OpenAPI documentation

### Frontend (Bonus)
- React 18 with Vite
- Tailwind CSS
- React Router v6
- Axios

### DevOps
- Docker + Docker Compose
- Environment-based configuration via `.env`

---

## System Architecture

```
User
 |
 v
React Frontend (Vite)
 |
 v
Django REST API
 |--- SQLite        (persistent storage)
 |--- Redis         (cache + message broker)
 |--- Cloudinary    (image storage)
 |--- Celery Worker
           |
           v
       Groq LLaMA
    (AI Enhancement)
```

---

## AI Processing Flow

```
1. User adds product via API
       |
2. Product saved to database (ai_status = "pending")
       |
3. Celery task triggered asynchronously (ai_status = "processing")
       |
4. Groq LLaMA generates 2-sentence description + category
       |
5. Product updated in database (ai_status = "done")
       |
6. Redis cache invalidated — frontend reflects updated content
```

---

## Key Technical Highlights

### Custom Decorator — Performance Logger

```python
# core/decorators.py
def performance_logger(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        logger.info(f"{func.__name__} executed in {time.time() - start:.2f}s")
        return result
    return wrapper
```

### Python Generators — Bulk File Processing

```python
# core/generators.py
def csv_product_generator(file_obj):
    reader = csv.DictReader(io.StringIO(content))
    for row in reader:
        yield {'name': ..., 'price': ..., 'stock': ...}
```

### Redis Caching — Per User

```python
# products/services.py
cache_key = f"products_user_{user_id}"
cached = cache.get(cache_key)
if cached:
    return cached
```

---

## Screenshots

**Login Page**
<img src="screenshots/login.png" alt="Login" width="100%"/>

**Dashboard**
<img src="screenshots/dashboard.png" alt="Dashboard" width="100%"/>

**Add Product Modal**
<img src="screenshots/add-product.png" alt="Add Product" width="100%"/>

**Bulk Upload**
<img src="screenshots/bulk-upload.png" alt="Bulk Upload" width="100%"/>

---

## Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/nomancsediu/ZenStore-AI.git
cd ZenStore-AI
```

### 2. Setup Environment Variables

```bash
cp .env.example backend/.env
```

```env
SECRET_KEY=your_secret_key
DEBUG=True
REDIS_URL=redis://redis:6379/0
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run with Docker

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Swagger Docs | http://localhost:8000/api/schema/swagger-ui/ |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login and get JWT token |
| GET | `/api/products/` | List all products (cached) |
| POST | `/api/products/` | Create product and trigger AI |
| PUT | `/api/products/{id}/` | Update product |
| DELETE | `/api/products/{id}/` | Delete product |
| POST | `/api/products/bulk-upload/` | Bulk upload via CSV or JSON |

> All product endpoints are user-scoped — users can only access their own data.

---

## Project Structure

```
ZenStore-AI/
|
|-- backend/
|   |-- authentication/     # JWT auth (register, login)
|   |-- products/           # Product CRUD, bulk upload, Celery tasks
|   |-- core/               # LLMService, performance_logger, generators
|   |-- zenstore/           # Django settings, Celery config
|   |-- Dockerfile
|
|-- frontend/               # React 18 + Vite (Bonus)
|   |-- src/
|   |   |-- components/     # ProductCard, Modals, Toast
|   |   |-- pages/          # Login, Register, Dashboard
|   |   |-- sections/       # Navbar, ProductGrid
|   |   |-- hooks/          # useToast
|   |-- Dockerfile
|
|-- docker-compose.yml
|-- .env.example
|-- README.md
```

---

## Security

- JWT access and refresh token authentication
- User-scoped data — no cross-user data leakage
- Protected API routes with custom decorators
- Secrets managed via environment variables

---

## Future Improvements

- Role-based access control (Admin / Seller)
- Analytics dashboard with sales insights
- AI-powered pricing suggestions
- Product search with Elasticsearch
- CI/CD pipeline with GitHub Actions

---

## Author

**Abdullah Al Noman**
CSE Student · Full Stack Developer
Passionate about clean architecture, SOLID principles and production-grade systems.

---

<div align="center">
  If you found this project useful, consider giving it a star on GitHub.
</div>
