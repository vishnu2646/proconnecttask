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

<img width="958" alt="image" src="https://github.com/user-attachments/assets/0dfbb231-1b1a-4c90-9608-f28a55527631">


#### Home Page after Logged In

<img width="959" alt="image" src="https://github.com/user-attachments/assets/4fc6e069-630c-434a-864e-2931b679eec7">

<img width="960" alt="image" src="https://github.com/user-attachments/assets/fc78238e-998f-4af2-974e-11626679a844">

#### Forecase Details in Home Page

<img width="960" alt="image" src="https://github.com/user-attachments/assets/a3245925-6b86-4a2e-9ef6-9390b09190a3">

<img width="960" alt="image" src="https://github.com/user-attachments/assets/bb756ee8-2a2d-4f1a-bb36-d2461ea05ccb">

### Sidebar toggled with options

<img width="960" alt="image" src="https://github.com/user-attachments/assets/5d1702cb-3a45-48ce-9e4f-bb58f8066f63">


### Key Points:
  1. **Overview**: Describes the project and the tech stack.
  2. **Setup Instructions**: Guides users through setting up both the backend and frontend.
  3. **API Endpoints**: Lists key routes for authentication and user management.
  4. **Project Structure**: Shows how the project is organized.
  5. **Environment Variables**: Details the required environment variables.

Feel free to customize this `README.md` to match your specific project needs!
