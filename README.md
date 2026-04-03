<div align="center">

<h1>ZenStore AI</h1>

<p><i>Add a product name — AI writes the description, picks the category, and handles the rest.</i></p>

</div>

---

## Overview

ZenStore AI is a full-stack product management system where sellers add a product name and price — the rest is handled automatically. A Celery worker calls Groq's LLaMA model to generate a marketing description and category, updating the product in real time.

Built to demonstrate production-grade backend concepts: JWT auth, async task processing, Redis caching, Python generators, custom decorators, and Docker containerization.

---

## Core Features

<div align="center">

| Feature | Description |
|---|---|
| JWT Authentication | Secure register and login, user-scoped data |
| Product CRUD | Full create, read, update, delete |
| AI Enhancement | Groq LLaMA generates catchy description and category |
| Async Processing | Celery workers handle AI tasks without blocking the API |
| Redis Caching | Per-user product cache with automatic invalidation |
| Cloudinary Upload | Cloud-based product image storage |
| Bulk Upload | Upload multiple products via CSV or JSON using Python Generators |
| Swagger Docs | Interactive API documentation |
| Dockerized | Frontend + Backend + Redis containerized |

</div>

---

## Tech Stack

### Backend

<p>
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white"/>
  <img src="https://img.shields.io/badge/DRF-ff1709?style=for-the-badge&logo=django&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white"/>
  <img src="https://img.shields.io/badge/Groq_LLaMA-F54E27?style=for-the-badge&logo=meta&logoColor=white"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"/>
</p>

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
</p>

### DevOps

<p>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

---

## System Architecture

<div align="center">
  <img src="screenshots/system-architecture.png" alt="System Architecture" width="100%"/>
</div>

---

## AI Processing Flow

<div align="center">
  <img src="screenshots/ai-flow.png" alt="AI Processing Flow" width="100%"/>
</div>

---

## Screenshots

<div align="center">

**Login Page**
<img src="screenshots/login.png" alt="Login" width="100%"/>

<br/>

**Dashboard**
<img src="screenshots/dashboard.png" alt="Dashboard" width="100%"/>

<br/>

**Add Product Modal**
<img src="screenshots/add-product.png" alt="Add Product" width="100%"/>

<br/>

**Bulk Upload**
<img src="screenshots/bulk-upload.png" alt="Bulk Upload" width="100%"/>

</div>

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

<div align="center">

**Abdullah Al Noman** · CSE Student · Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-nomancsediu-181717?style=flat-square&logo=github)](https://github.com/nomancsediu)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-nomanit-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/nomanit)
[![Portfolio](https://img.shields.io/badge/Portfolio-abdnoman.com-000000?style=flat-square&logo=globe)](https://abdnoman.com)

</div>
