# Client-server architecture practice project

## Description

This project is a simple Node.js application that serves a "Hello world!" message at the `/hello` endpoint. It uses Docker for containerization and Nginx as a reverse proxy.

## Installation

### Prerequisites

- Node.js (v22+)
- Docker (optional, for containerized setup)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Run with Docker** (optional):

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
