# Event Listing Platform (ELP)

A modern, feature-rich event management platform built with the MERN stack and enhanced with real-time maps, image handling, and social features.

## Table of Contents
- [Key Features](#key-features)
- [Technical Stack](#technical-stack)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Key Features

### Event Management
- Create events with multiple images and map location
- Interactive map location picker using Leaflet
- Rich text event descriptions
- Event categorization and tagging
- Event status (upcoming, ongoing, past)

### User Features
- Secure authentication with JWT
- User profiles with customizable settings
- Event bookmarking and interests
- Social sharing integration


### Maps & Location
- Interactive maps using Leaflet
- Location-based event discovery
- Custom map markers for different event types

### Image Handling
- Image upload support
- Image optimization and compression
- Cloudinary integration for reliable storage
- Gallery view for event images
- Thumbnail generation

### Social Features
- Event sharing on social platforms
- Save events to personal collection
- Mark interest in events

### Security Features
- JWT token authentication
- Password hashing with bcrypt
- Input sanitization
- CORS protection
- Rate limiting
- XSS protection

## Technical Stack

### Frontend
```javascript
{
  "framework": "React 18 with Vite",
  "styling": ["Tailwind CSS", "Framer Motion"],
  "maps": "React Leaflet",
  "state": "Context API",
  "notifications": "React Toastify",
  "imageHandling": "Cloudinary React"
}
```

### Backend
```javascript
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "MongoDB",
  "security": ["bcrypt", "JWT", "helmet"],
  "imageStorage": "Cloudinary",
  "validation": ["mongoose-sanitize", "express-validator"]
}
```

## Installation

### Prerequisites
```bash
node >= 16.0.0
npm >= 8.0.0
MongoDB >= 4.4
```

### Environment Variables

Backend (.env):
```plaintext
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Frontend (.env):
```plaintext
VITE_API_BASE_URL=http://localhost:5000/api
VITE_MAPS_API_KEY=your_maps_api_key
```

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
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```
    
4.  Start the backend:
    
    bash
    
    ```bash
    node server.js | npx nodemon server.js
    ```

### Frontend Setup

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
    VITE_MAPS_API_KEY=your_maps_api_key
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
    
-   Frontend: http://localhost:5173
    
-   Ensure MongoDB is running.

## How It Works

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

## API Documentation

Base URL: http://localhost:5000/api

### Authentication
```javascript
POST /api/auth/register
POST /api/auth/login
GET /api/auth/verify
POST /api/auth/refresh-token
```

### Events
```javascript
GET /api/events
POST /api/events
GET /api/events/:id
PUT /api/events/:id
DELETE /api/events/:id
POST /api/events/:id/like
POST /api/events/:id/save
POST /api/events/:id/share
```

### User Profile
```javascript
GET /api/profile
PUT /api/profile
GET /api/profile/saved-events
GET /api/profile/created-events
PUT /api/profile/notifications
```

## Security Measures

### Authentication
- JWT tokens with expiration
- Refresh token rotation
- Secure password hashing
- Rate limiting on auth endpoints

### Data Protection
- Input sanitization
- XSS protection
- CSRF tokens
- Secure headers with Helmet
- Request validation

### Image Security
- File type validation
- Size limits
- Secure upload to Cloudinary
- Image optimization

## Folder Structure

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

## Contributing

We welcome contributions! Please follow our [Contribution Guidelines](CONTRIBUTING.md).

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript for type safety
- Component documentation

## License

MIT License - see [LICENSE](LICENSE) for details

## Support

- Documentation: [/docs](/README.md)
- Issues: GitHub Issues
- Community: Discord Server
