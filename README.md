# Client-server architecture practice project

## Description
This project is a simple Node.js application that serves a "Hello world!" message at the `/hello` endpoint. It uses Docker for containerization and Nginx as a reverse proxy.

## Installation

### Prerequisites
- Docker
- Docker Compose

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject
    ```

2. Build and start the Docker containers:
    ```bash
    docker-compose up --build
    ```

## Usage
Once the containers are up and running, you can access the application at `http://localhost/hello`.

### Endpoints
- `http://localhost/hello`: Returns "Hello world!"
- `http://localhost`: Serves static files from the `./static` directory.
- Custom 404 page for non-existent routes.

## Project Structure
- `Dockerfile`: Defines the Docker image for the Node.js application.
- `docker-compose.yml`: Configures the services and networks for Docker Compose.
- `nginx/nginx.conf`: Nginx configuration file.
- `app.js`: The main Node.js application file.
- `package.json`: Node.js project metadata and dependencies.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License.
