# Fastify Project

This Fastify project is designed to provide a robust and scalable backend, featuring integration with Forgerock and Snip services, as well as custom authentication routes.

## Features

- **Forgerock Integration**: Proxy routes to interact with Forgerock API endpoints.
- **Snip Integration**: Proxy routes for Snip third-party service calls.
- **Custom Authentication Routes**: Sign-up and sign-in functionality, leveraging JWT for secure token management.

## Getting Started

Certainly! Below is an example of how you can document the folder structure of your Fastify project in the `README.md`. This will give users and contributors a clear overview of how the project is organized.

---


## Folder Structure

The project is organized into the following directory and file structure:

```
project-root/
│
├── src/
│   ├── middlewares/          # Middleware functions
│   │   └── jwtMiddleware.ts  # JWT authentication middleware
│   │
│   ├── plugins/              # Fastify plugins
│   │   └── jwtPlugin.ts      # Custom JWT plugin (if used)
│   │
│   ├── routes/               # Route definitions
│   │   ├── auth/             # Authentication-related routes (signup, signin)
│   │   │   ├── routes.ts     # Combines all auth routes
│   │   │   ├── signin.ts     # Signin route
│   │   │   └── signup.ts     # Signup route
│   │   │
│   │   ├── forgerock.ts      # Forgerock proxy routes
│   │   └── snip.ts           # Snip service proxy routes
│   │
│   ├── app.ts                # Main application setup
│   └── index.ts              # Application entry point
│
├── package.json              # Node.js manifest file (dependencies, scripts, etc.)
├── package-lock.json         # Locked versions of dependencies
├── .env                      # Environment variables (not committed to Git)
├── tsconfig.json             # TypeScript compiler configuration
└── README.md                 # Project overview and documentation
```



---

This structure provides a comprehensive overview of the key components of your project. Feel free to adjust the folder structure documentation based on the actual contents of your project. It's a good practice to keep this section updated as your project evolves.

### Prerequisites

- Node.js (version 12 or later)
- npm (version 6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone hhttps://github.com/binu-varghese-colenso/test-be-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd test-be-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

Create a `.env` file in the root of your project and specify the following variables:

```env
JWT_SECRET=your_jwt_secret
```

Replace `your_jwt_secret` with a secure key for JWT.

### Running the Application

To start the application, run:

```bash
npm start
```

For development purposes, you can run the application with live reloading:

```bash
npm run dev
```

## API Endpoints

### Forgerock Routes

- **/api/forgerock/\***: Proxy routes to Forgerock services. All requests made to these endpoints are forwarded to the Forgerock API.

### Snip Routes

- **/api/snip/\***: Proxy routes for interacting with Snip services. These endpoints forward requests to the corresponding Snip service.

### Authentication Routes

- **/api/signup**: Endpoint for user registration.
- **/api/signin**: Endpoint for user authentication. Returns a JWT upon successful authentication.


## Running in a Local Docker Container

To run the application in a Docker container locally, follow these steps:

1. **Build the Docker Image**:
   ```bash
   docker build -t your-app-name .
   ```
   Replace `your-app-name` with a name for your Docker image.

2. **Run the Docker Container**:
   ```bash
   docker run -p 8080:8080 your-app-name
   ```
   This command runs the container and maps port `8080` of the container to port `8080` on your host machine.

Your application should now be accessible at `http://localhost:8080`.


## Postman Collection for Testing

For convenient testing of the API endpoints, a Postman collection is provided in the `postman` folder of this project. You can import this collection into Postman to test and interact with the application's API endpoints.

