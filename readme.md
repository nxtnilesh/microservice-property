# 🚀 Microservices Project 

---

## 📌 Overview
This project is a **microservices-based architecture** designed for **scalability, security, and maintainability**. It consists of multiple services, each responsible for a specific domain, ensuring efficient performance and modularity.

---

## 📦 Services

### 🏠 API Gateway
**🔹 Entry point of the system**
- Acts as a **reverse proxy** for routing requests to appropriate services.
- Implements security features such as:
  - 🔑 **Authentication & Authorization middleware**.
  - ⚡ **Rate limiting** for API calls.
  - 🛡️ **Protection against DDoS & brute force attacks**.
- Provides a **centralized API traffic management**.

---

### 🔐 Identity Service
**🔹 Handles user authentication & authorization**
- 📝 **User signup & login** functionalities.
- 🔑 **JWT-based authentication**.
- 🔄 **Refresh token mechanism** for session management.
- 👥 **User roles & permission management**.
- 🔄 **Forgot password & reset password functionality**.
- 📧 **OTP-based verification using Nodemailer**.
- 👤 **User CRUD operations**.

---

### 🖼️ Media Service
**🔹 Manages media uploads & storage**
- 📤 **Handles image uploads** using Multer.
- ☁️ **Stores images on Cloudinary**.
- 📏 **Image compression using Sharp**.
- 🔄 **Streams file upload using Streamifier**.
- 🔒 **Authorization before adding any image**.

---

### 🏡 Post Service
**🔹 Handles property-related CRUD operations**
- 🏗️ **Create, read, update & delete property data**.
- 🔒 **Authorization before modifying records**.
- 🚀 **Optimized queries for fast data retrieval**.

---

### 🔍 Search Service
**🔹 Manages search functionality using Elasticsearch**
- 🏎️ **Efficient full-text search capabilities**.
- 📊 **Supports filtering & ranking of search results**.
- 🔄 **Real-time indexing of new properties**.

---

### 📩 Message Service
**🔹 Handles notifications and messaging**
- 📧 **OTP notifications** for user authentication.
- 🔔 **Post data notifications** to subscribed users.
- 📢 **General subscribed service notifications**.
- 📡 **RabbitMQ integration for message queues**.

---

## ⚙️ Tech Stack
- 🖥️ **Backend:** Node.js, Express.js
- 🗄️ **Database:** MongoDB, Prisma ORM, Mongoose
- 🔎 **Search Engine:** Elasticsearch
- 🔁 **Message Queue:** Redis, RabbitMQ
- 🔑 **Authentication:** JWT, OAuth
- ☁️ **Storage:** Cloudinary (for media)
- 🐳 **Containerization:** Docker

---

### 📚 Dependencies
- **Database & Caching**
  - 🗄️ `mongodb` - NoSQL database
  - 📂 `mongoose` - ODM for MongoDB
  - 🚀 `redis` - In-memory key-value store

- **Security & Auth**
  - 🔐 `argon2` - Secure password hashing
  - 🔑 `jsonwebtoken` - JWT-based authentication
  - 🛡️ `helmet` - Security middleware
  - 🚦 `cors` - Cross-Origin Resource Sharing

- **Rate Limiting & Protection**
  - ⚡ `express-rate-limit` - API rate limiting
  - ⛔ `rate-limit-redis` - Redis-based rate limiting
  - 🛑 `rate-limiter-flexible` - Advanced rate limiting

- **Logging & Configurations**
  - 📜 `winston` - Logging
  - ⚙️ `dotenv` - Environment variables management

- **Storage & File Handling**
  - 📤 `multer` - File upload handling
  - ☁️ `cloudinary` - Image storage
  - 📏 `sharp` - Image compression
  - 🔄 `streamifier` - Stream-based file uploads

- **Messaging & Notifications**
  - 📡 `amqplib` - RabbitMQ client for message queues
  - 📧 `nodemailer` - Email/OTP verification

- **Search & Optimization**
  - 🔎 `elasticsearch` - Search engine for property listings

---

## 🚀 Deployment
- 📦 **Dockerized microservices** for easy scalability.
- 🔀 **API Gateway for secure service communication**.
- 📈 **Elasticsearch for fast & efficient search indexing**.
- 📡 **RabbitMQ for managing distributed message queues**.
- ⚡ **Redis for caching & performance optimization**.

---
