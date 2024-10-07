# Fullstack Google OAuth Application with React & Node.js

This is a fullstack web application built with React (frontend) and Node.js/Express (backend), using Google OAuth for authentication. The backend uses Passport.js for handling OAuth, Prisma as the ORM, and JWT for token-based authentication.

## Features

- Google OAuth 2.0 authentication
- User session management with `express-session`
- JWT-based authentication for API routes
- User roles (e.g., admin, normal)
- CORS handling for cross-origin requests
- Secure storage of secrets with `.env` file
- Prisma ORM for database access

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express, Passport.js (Google OAuth)
- **Database**: Prisma (Sqlite3 etc.)
- **Authentication**: Google OAuth 2.0, JWT
- **Session Management**: express-session
- **Environment Variables**: dotenv

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v18.19.0 or later)
- Sqlite3 (for Prisma)
- Google Cloud account for OAuth credentials

## Setup Instructions

### 1. Clone the Repository

```bash

git clone https://github.com/vishnu2646/proconnecttask.git
cd proconnecttask
backend - cd server
frontend - cd client
Run Frontend - npm start
Run Backend - npm start

````

### 2. Project structure

```
├── backend/                # Node.js + Express backend
│   ├── routes/             # Express routes
│   ├── controllers/        # Controller logic for handling requests
│   ├── prisma/             # Prisma ORM setup
│   ├── auth/               # Passport.js OAuth strategies
│   ├── .env                # Environment variables for backend
│   └── server.js           # Entry point for backend
│
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/                # React components and pages
│   ├── .env                # Environment variables for frontend
│   └── App.js              # Main React component
│
└── README.md               # Documentation
```

### 3. API Endpoints

Authentication Routes

 - GET `/auth/google`: Initiates Google OAuth login
 - GET `/auth/google/callback`: Handles Google OAuth callback
 - GET `/login/success`: Returns user details after successful login
 - GET `/logout`: Logs out the user and clears the session

### 4.User Routes (Protected)

 - GET `/api/user/profile`: Get the logged-in user's profile

|  Key   |  Description   |
|--------|----------------|
| `CLIENT_ID` | Google OAuth client ID |
| `CLIENT_SECRET` |	Google OAuth client secret |
| `CLIENT_URL` |	Frontend URL (e.g., http://localhost:3000) |
| `PORT` |	Backend server port (default: 8000) |
| `JWT_SECRET` |	Secret for signing JWTs |
| `SESSION_SECRET` |	Secret for express-session |
| `DATABASE_URL` |	Database connection string for Prisma |
| `EMAIL_FOR_ADMIN` |	Admin's email to assign admin role |

### 5. Screenshots

#### Login

<img width="959" alt="image" src="https://github.com/user-attachments/assets/4d73c911-c586-403e-a7ec-f56afeb68b54">

#### Home Page after Logged In

<img width="959" alt="image" src="https://github.com/user-attachments/assets/eaccc162-517d-4e21-bbc1-436ad6cbbbd1">

#### Forecase Details in Home Page

<img width="959" alt="image" src="https://github.com/user-attachments/assets/b34803ec-b181-4e38-a929-69c945a41e70">


### Key Points:
  1. **Overview**: Describes the project and the tech stack.
  2. **Setup Instructions**: Guides users through setting up both the backend and frontend.
  3. **API Endpoints**: Lists key routes for authentication and user management.
  4. **Project Structure**: Shows how the project is organized.
  5. **Environment Variables**: Details the required environment variables.

Feel free to customize this `README.md` to match your specific project needs!
