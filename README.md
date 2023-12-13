# Fastify Project

This Fastify project is designed to provide a robust and scalable backend, featuring integration with Forgerock and Snip services, as well as custom authentication routes.

## Features

- **Forgerock Integration**: Proxy routes to interact with Forgerock API endpoints.
- **Snip Integration**: Proxy routes for Snip third-party service calls.
- **Custom Authentication Routes**: Sign-up and sign-in functionality, leveraging JWT for secure token management.


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

Create a `.env` file in the root of project and specify the following variables:

```env
JWT_SECRET=
BRAND_ASSOCIATION=
ACCOUNT_ID=
FORGEROCK_USER_ENDPOINT=
FORGEROCK_TOKENINFO_ENDPOINT=
PEDIGREE_FORGEROCK_CLIENT_ID=
PEDIGREE_FORGEROCK_CLIENT_SECRET=
IDM_FORGEROCK_CLIENT_ID=
IDM_FORGEROCK_CLIENT_SECRET=
FORGEROCK_VALIDATION_ENDPOINT=
```

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
   docker build -t app-name .
   ```
   Replace `app-name` with a name for  Docker image.

2. **Run the Docker Container**:
   ```bash
   docker run -p 8080:8080 app-name
   ```
   This command runs the container and maps port `8080` of the container to port `8080` on  host machine.

Application should now be accessible at `http://localhost:8080`.


## Postman Collection for Testing

For convenient testing of the API endpoints, a Postman collection is provided in the `postman` folder of this project. You can import this collection into Postman to test and interact with the application's API endpoints.

