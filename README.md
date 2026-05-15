# Gym Review API Project

## Overview

This project is a secure Gym Review REST API built with Node.js, Express, React, Vitest, and Auth0 authentication. The project includes protected routes, unit tests, integration tests, and a GitHub Actions CI pipeline.

---

## Setup

### Clone the Repository

    git clone https://github.com/dimuthu-mad/Gym-Review-API-2 

    cd Gym-Review-API

### Install Dependencies

Backend

    cd backend
    npm install

Client

    cd client
    npm install

### Environment Variables

Create a .env file inside the backend folder.

Refer to .env.example for required variables.

### Running the Project Locally

Start Backend

    cd backend
    npm run dev
  open - http://localhost:3000

Start Client

    cd client
    npm run dev
  open - http://localhost:5173

## Testing

### Run Test locally

Run Backend integration tests

      cd backend
      npm test

Run frontend integration tests

      cd client
      npm test

### Screenshot of passing tests run locally

<img width="1316" height="582" alt="Screenshot 2026-05-15 171556" src="https://github.com/user-attachments/assets/b9bfb21c-88fa-4b4f-9cd0-8c75f3563655" />

<img width="1320" height="695" alt="Screenshot 2026-05-15 171801" src="https://github.com/user-attachments/assets/97718284-8add-4ec2-9de4-de400eb8d6fd" />

### Screenshot of the passing GitHub Actions pipeline

<img width="1893" height="906" alt="Screenshot 2026-05-15 163947" src="https://github.com/user-attachments/assets/95fe5977-a7be-4a90-a431-9a07d000efec" />


## Authentication

### Authentication Provider

This project uses Auth0 with express-openid-connect.

Auth0 was chosen because it provides secure session-based authentication and integrates well with Express applications.

### Authentication Implementation

Protected routes use requiresAuth() middleware.

Protected routes:

      POST /gyms
      POST /gyms/:id/reviews
      GET /profile

Unauthenticated users receive:

      401 Unauthorized

## Security decisions

  Environment Variables

  - Sensitive values such as Auth0 credentials are stored in .env files and GitHub Secrets instead of hardcoding them into the codebase.

  No Secrets in Repository

  - Secrets are excluded using .gitignore.

  Authentication Protection

  - Protected routes return 401 Unauthorized for unauthenticated users.

  Token Storage

  - Tokens are not stored in localStorage because localStorage can be vulnerable to XSS attacks. Session-based authentication was used instead

## Reflections

### Implementation Choices

- Node.js + Express for backend
- React + Vite for frontend
- Vitest for testing
- Auth0 for authentication
- GitHub Actions for CI pipeline
- An in-memory array was used instead of a database because the assignment focused mainly on authentication and testing.

### Challenges
- Configuring Auth0 correctly
- Setting up integration tests with protected routes
- Configuring GitHub Actions secrets

### What I Would Improve
- Add database such as PostgreSQL
- Improve frontend UI design
