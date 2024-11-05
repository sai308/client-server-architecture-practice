# Client-server architecture practice project

A REST API application server built with Node.js, featuring a layered architecture for handling user authentication, product management, shopping cart functionality, and order processing. The application is structured with clear separation of concerns and uses MongoDB and PostgreSQL as the primary data storage solutions. It is designed to be secure, extensible, and efficient, leveraging Fastify for server functionality and Prisma for PostgreSQL ORM.

> [!CAUTION]
> **Disclaimer**
>   
> This project is created for **educational purposes** and demonstrates a simplified architecture. It is not production-ready and may lack some essential features and best practices required for a real-world application. Critical improvements, including additional security measures, input validation, error handling, and performance optimizations, should be implemented before using this in a live environment. **Refactoring** is recommended to adapt this code for production use.
>
> Use this codebase as a **learning tool** and a foundation for further development.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)

---

## Overview

This project is a modular, scalable example of API designed for a Node.js environment. It provides secure endpoints for user authentication, product management, cart management, and checkout processing, following a clean architecture with separation between business logic and data layers. The project is suitable for integration with a front-end application, as it provides RESTful endpoints for each service.

---

## Features

- **User Authentication**: Sign up, sign in, and secure access with JWTs.
- **Product Management**: CRUD operations for products.
- **Shopping Cart**: Add, update, and remove items in the user's cart.
- **Order Management**: Checkout process that generates a receipt for each order.
- **Swagger Documentation**: Auto-generated API documentation.
- **Fastify Server**: Lightweight, high-performance server using Fastify.
- **Role-based Access Control**: Protected routes based on user privileges.
- **Database Abstraction**: MongoDB and PostgreSQL with Prisma ORM and native MongoDB driver.

---

## Architecture

This project follows a layered architecture with clear divisions between the following layers:

1. **Domain Layer**: Contains the business logic, including entities and interfaces for core functionalities like `Cart`, `Product`, `User`, and `Receipt`.
2. **Application Layer**: Contains actions and services for handling specific use cases, such as authentication, cart operations, and checkout.
3. **Infrastructure Layer**: Manages data persistence and database interactions. It includes repositories for MongoDB and PostgreSQL interactions.
4. **Presentation Layer**: Defines the REST API endpoints and request handling, including authentication guards, request context, and error handling.

---

## Technologies

- **Node.js**
- **Fastify**: High-performance server for handling HTTP requests.
- **Prisma**: ORM for PostgreSQL.
- **MongoDB**: Database for storing cart and order data.
- **JWT**: Secure token-based authentication.
- **Swagger**: API documentation generation.

---

## Setup

### Prerequisites

- Node.js (v22+)
- Docker (optional, for containerized setup)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sai308/client-server-architecture-practice.git
   cd client-server-architecture-practice
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Configure environment variables**:
   - Rename `example.env` to `.env` and fill in the required variables.
   - Key variables include:
     - `APP_PG_DATABASE_URL`: PostgreSQL connection URL
     - `MONGODB_URI`: MongoDB connection URI
     - `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`: Secret keys for JWT

4. **Run database migrations** (for PostgreSQL):

   ```bash
   pnpm exec db:sync && pnpm exec db:client
   ```

5. **Start the server**:

   ```bash
   pnpm start
   ```

6. **Run with Docker** (optional):
   - Ensure Docker and Docker Compose are installed.
   - Run:

     ```bash
     docker compose up --build
     ```

---

## Usage

### Endpoints Overview

1. **Authentication**
   - `POST /api/auth/sign-up`: Register a new user.
   - `POST /api/auth/sign-in`: Login and retrieve JWTs.
   - `POST /api/auth/refresh`: Refresh access tokens.

2. **Products**
   - `POST /api/products`: Create a new product (admin only).
   - `GET /api/products`: List products with filters.
   - `GET /api/products/:id`: Retrieve a specific product.
   - `PUT /api/products/:id`: Update a product (admin only).
   - `DELETE /api/products/:id`: Delete a product (admin only).

3. **Cart**
   - `POST /api/cart/add`: Add a product to the cart.
   - `POST /api/cart/remove`: Remove a product from the cart.
   - `GET /api/cart`: View the cart contents.

4. **Checkout**
   - `POST /api/checkout`: Process the cart and generate a receipt.

### Example Usage with `curl`

#### User Registration

```bash
curl -X POST http://localhost/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

#### Add Product to Cart

```bash
curl -X POST http://localhost/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"userId": "123", "productId": "456", "quantity": 2}'
```

#### Checkout

```bash
curl -X POST http://localhost/api/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"userId": "123"}'
```

---

## API Documentation

This project includes Swagger documentation. Once the server is running, you can access it at:

- [Swagger UI](http://localhost/docs): Interactive API documentation.

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License.
