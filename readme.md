# Event Listing Platform

A full-stack web application for discovering, saving, and managing local events. Built with the **MERN stack** (MongoDB, Express.js, React, Node.js) using **Vite** for the frontend and **Tailwind CSS** for styling.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Secure login/registration with JWT and bcrypt.
- **Event Management**: Authenticated users can create, update, and delete events.
- **Event Browsing**: Filter events by category or location.
- **Event Saving**: Logged-in users can save events to their profile.
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS.
- **Notifications**: Toast notifications for user actions.
- **Six Pages**:
  - Homepage: Banner, upcoming events, categories.
  - Event Listings: Filterable event list.
  - Event Detail: Detailed event view with save option.
  - Login: User authentication.
  - Register: New user registration.
  - User Dashboard: Manage user-created events.
- **Environment Variables**: Configurable API base URL via `.env`.

## Technologies Used
- **Frontend**:
  - React (v18) with Vite
  - Tailwind CSS
  - react-router-dom (routing)
  - axios (API requests)
  - react-toastify (notifications)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - bcrypt (password hashing)
  - jsonwebtoken (JWT authentication)
  - mongoose-sanitize (query sanitization)
  - cors, dotenv
- **Development Tools**:
  - npm
  - Vite (frontend build tool)
  - MongoDB Atlas or local MongoDB

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm (v8 or higher)

### Backend Setup
1. Navigate to the `server/` directory:
   ```bash
   cd server
    ```

2.  Install dependencies:
    
    bash
    
    ```bash
    npm install
    ```
    
3.  Create a .env file in server/:
    
    ```text
    MONGO_URI=mongodb://localhost:27017/event_platform
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```
    
4.  Start the backend:
    
    bash
    
    ```bash
    node server.js | npx nodemon server.js
    ```
    

# Frontend Setup

1.  Navigate to the client/ directory:
    
    bash
    
    ```bash
    cd client
    ```
    
2.  Install dependencies:
    
    bash
    
    ```bash
    npm install
    ```
    
3.  Create a .env file in client/:
    
    ```text
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
    
4.  Initialize Tailwind CSS (if not already set up):
    
    bash
    
    ```bash
    npx tailwindcss init -p
    ```
    
5.  Start the frontend:
    
    bash
    
    ```bash
    npm run dev
    ```
    

Running the Application

-   Backend: http://localhost:5000
    
-   Frontend: http://localhost:3000
    
-   Ensure MongoDB is running.
    

# How It Works

1.  Guest Users:
    
    -   Browse Homepage and Event Listings.
        
    -   View event details but cannot save events.
        
    -   Access Login/Register pages.
        
2.  Authenticated Users:
    
    -   Save events from Event Detail page.
        
    -   Create/delete events in Dashboard.
        
    -   Log out via Header.
        
3.  Navigation:
    
    -   Header links to all pages.
        
    -   Event cards link to Event Details.
        
4.  Security:
    
    -   JWT for authentication.
        
    -   Passwords hashed with bcrypt.
        
    -   Sanitized MongoDB queries.
        
5.  Environment Variables:
    
    -   Frontend uses VITE_API_BASE_URL for API requests.
        
    -   Backend uses MONGO_URI, JWT_SECRET, PORT.
        

# API Documentation

Base URL: http://localhost:5000/api

Auth Endpoints

1.  POST /auth/register
    
    -   Body: { "username": "string", "email": "string", "password": "string" }
        
    -   Response: { "token": "jwt_token" }
        
2.  POST /auth/login
    
    -   Body: { "email": "string", "password": "string" }
        
    -   Response: { "token": "jwt_token" }
        

Event Endpoints

1.  GET /events
    
    -   Query: category, location (optional)
        
    -   Response: Array of events
        
2.  GET /events/:id
    
    -   Response: Single event
        
3.  POST /events
    
    -   Headers: Authorization: Bearer <token>
        
    -   Body: Event details
        
    -   Response: Created event
        
4.  PUT /events/:id
    
    -   Headers: Authorization: Bearer <token>
        
    -   Body: Updated fields
        
    -   Response: Updated event
        
5.  DELETE /events/:id
    
    -   Headers: Authorization: Bearer <token>
        
    -   Response: { "msg": "Event deleted" }
        
6.  POST /events/save/:id
    
    -   Headers: Authorization: Bearer <token>
        
    -   Response: { "msg": "Event saved" }
        

# Folder Structure

```
event-listing-platform/
├── client/                     # React frontend 
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/           # Images, icons
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Auth context
│   │   ├── App.jsx           # Main app
|   |   ├── App.Scss          # Scss for styling  
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Tailwind styles
│   ├── .env                  # Frontend env 
│   ├── index.html            # HTML entry
│   └── vite.config.js        # Vite config
├── server/                    # Node.js/Express 
│   ├── config/               # DB connection
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── middleware/           # JWT middleware
│   ├── controllers/          # Route handlers
│   ├── .env                  # Backend env 
│   └── server.js             # Backend entry
├── README.md
└── .gitignore
```

# Contributing

1.  Fork the repository.
    
2.  Create a feature branch (git checkout -b feature-name).
    
3.  Commit changes (git commit -m "Add feature").
    
4.  Push to the branch (git push origin feature-name).
    
5.  Open a pull request.
    

# **License**

MIT License. See LICENSE for details.
