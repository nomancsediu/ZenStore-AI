<div align="center">

<img src="frontend/src/assets/hero.png" alt="ZenStore AI" width="120"/>

<h1>🛍️ ZenStore AI</h1>

<p><i>AI-powered E-commerce Store Management — where your products describe themselves.</i></p>

<p>
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
</p>

</div>

---

## 🚀 Overview

**ZenStore AI** is a full-stack, production-grade e-commerce management platform where sellers can add products and the system **automatically enhances product titles and descriptions** using Large Language Models (LLM) via Groq's LLaMA API.

Built with a focus on **clean architecture**, **asynchronous processing**, and **real-world production patterns** — including JWT authentication, Redis caching, Celery task queues, Cloudinary image storage, and full Docker containerization.

---

## 🧠 Core Features

| Feature | Description |
|---|---|
| 🔐 JWT Authentication | Secure register & login flow |
| 📦 Product CRUD | Full create, read, update, delete |
| 🤖 AI Enhancement | Groq LLaMA auto-enhances titles & descriptions |
| ⚡ Async Processing | Celery workers handle AI tasks in background |
| 🗄️ Redis Caching | Optimized API response performance |
| ☁️ Cloudinary Upload | Cloud-based product image storage |
| 📤 Bulk Upload | Upload multiple products via CSV/JSON |
| 🐳 Fully Dockerized | Frontend + Backend + Redis + DB containerized |

---

## 🛠️ Tech Stack

### Backend
- **Django** + **Django REST Framework**
- **Simple JWT** — token-based authentication
- **Celery** — async background task processing
- **Redis** — caching & message broker
- **PostgreSQL** (production) / SQLite (development)
- **Cloudinary** — image upload & storage
- **Groq API (LLaMA)** — AI product enhancement

### Frontend
- **React 18** with **Vite**
- **Tailwind CSS**
- **React Router v6**
- **Axios**

### DevOps
- **Docker** + **Docker Compose**
- Environment-based configuration via `.env`

---

## 🏗️ System Architecture

```
User
 │
 ▼
React Frontend (Vite)
 │
 ▼
Django REST API
 ├──► PostgreSQL  (persistent storage)
 ├──► Redis       (cache + message broker)
 ├──► Cloudinary  (image storage)
 └──► Celery Worker
           │
           ▼
       Groq LLaMA
    (AI Enhancement)
```

---

## 🔄 AI Processing Flow

```
1. User adds product
       ↓
2. Product saved to database
       ↓
3. Celery task triggered asynchronously
       ↓
4. Groq LLaMA enhances title & description
       ↓
5. Enhanced product saved back to database
       ↓
6. Frontend reflects updated content
```

---

## 📸 Screenshots

**Login Page**
<img src="screenshots/login.png" alt="Login" width="100%"/>

**Dashboard**
<img src="screenshots/dashboard.png" alt="Dashboard" width="100%"/>

**Add Product Modal**
<img src="screenshots/add-product.png" alt="Add Product" width="100%"/>

**Bulk Upload**
<img src="screenshots/bulk-upload.png" alt="Bulk Upload" width="100%"/>

---

## ⚙️ Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/nomancsediu/ZenStore-AI.git
cd ZenStore-AI
```

### 2. Setup Environment Variables

Copy the example and fill in your values:

```bash
cp .env.example backend/.env
```

```env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgres://user:password@db:5432/zenstore
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

---

## 📦 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login & get JWT token |
| GET | `/api/products/` | List all products |
| POST | `/api/products/` | Create product |
| PUT | `/api/products/{id}/` | Update product |
| DELETE | `/api/products/{id}/` | Delete product |
| POST | `/api/products/bulk-upload/` | Bulk upload products |

---

## 📁 Project Structure

```
ZenStore-AI/
│
├── backend/
│   ├── authentication/     # JWT auth
│   ├── products/           # Product CRUD + AI tasks
│   ├── core/               # LLM service, decorators
│   ├── zenstore/           # Django settings & config
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Login, Register, Dashboard
│   │   ├── sections/       # Navbar, ProductGrid
│   │   ├── hooks/          # useToast
│   │   └── router/         # React Router config
│   └── Dockerfile
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🔐 Security

- JWT access & refresh token authentication
- Protected API routes with custom decorators
- Secrets managed via environment variables
- Docker network isolation

---

## 🔮 Future Improvements

- [ ] Role-based access control (Admin / Seller)
- [ ] Analytics dashboard with sales insights
- [ ] AI-powered pricing suggestions
- [ ] Product search with Elasticsearch
- [ ] CI/CD pipeline with GitHub Actions

---

## 👨‍💻 Author

**Abdullah Al Noman**
CSE Student · Full Stack Developer
Passionate about clean architecture, SOLID principles & production-grade systems.

---

<div align="center">
  <b>⭐ If you found this project useful, consider giving it a star on GitHub!</b>
</div>
