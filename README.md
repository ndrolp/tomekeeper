# Tomekeeper

Tomekeeper is a microservice for managing personal libraries within the **Hestier Project**. It allows users to catalog physical books, track different editions, associate eBooks, and manage physical storage locations.

## 📦 Features

- Manage physical books with metadata (title, author, ISBN, etc.)
- Track multiple editions of the same book
- Associate eBooks and digital formats with physical copies
- Define and manage physical storage locations
- API-first architecture for integration with other Hestier services

## 🛠️ Technologies

- Node.js
- TypeScript
- Express
- PostgreSQL
- TypeORM

## 🚀 Getting Started

1. **Clone the repository:**

```bash
   git clone https://github.com/hestier/tomekeeper.git
   cd tomekeeper
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

   - Copy the `.env.example` file to `.env` and adjust the configuration as needed.

4. **Run database migrations:**

   ```bash
   npm run typeorm migration:run
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

## ✅ Testing

Run tests using:

```bash
npm run test
```

## 📖 Part of the Hestier Project

Tomekeeper is one of several microservices within the **Hestier Project**, designed to provide modular, scalable, and interconnected services for personal management.
