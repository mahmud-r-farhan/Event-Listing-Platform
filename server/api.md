
## API Documentation

Base URL

http://localhost:5000/api

Auth Endpoints

1.  Register
    
    -   POST  /auth/register
        
    -   Body: { "username": "string", "email": "string", "password": "string" }
        
    -   Response: { "token": "jwt_token" }
        
    -   Status Codes:
        
        -   200: Success
            
        -   400: User already exists
            
        -   500: Server error
            
2.  Login
    
    -   POST  /auth/login
        
    -   Body: { "email": "string", "password": "string" }
        
    -   Response: { "token": "jwt_token" }
        
    -   Status Codes:
        
        -   200: Success
            
        -   400: Invalid credentials
            
        -   500: Server error
            

Event Endpoints

1.  Get All Events
    
    -   GET  /events
        
    -   Query Params: category (optional), location (optional)
        
    -   Response: [ { "_id": "string", "name": "string", "date": "date", "time": "string", "location": "string", "description": "string", "category": "string", "createdBy": { "_id": "string", "username": "string" } } ]
        
    -   Status Codes:
        
        -   200: Success
            
        -   500: Server error
            
2.  Get Event by ID
    
    -   GET  /events/:id
        
    -   Response: { "_id": "string", "name": "string", ... }
        
    -   Status Codes:
        
        -   200: Success
            
        -   404: Event not found
            
        -   500: Server error
            
3.  Create Event
    
    -   POST  /events
        
    -   Headers: Authorization: Bearer <token>
        
    -   Body: { "name": "string", "date": "date", "time": "string", "location": "string", "description": "string", "category": "string" }
        
    -   Response: { "_id": "string", "name": "string", ... }
        
    -   Status Codes:
        
        -   200: Success
            
        -   401: Unauthorized
            
        -   500: Server error
            
4.  Update Event
    
    -   PUT  /events/:id
        
    -   Headers: Authorization: Bearer <token>
        
    -   Body: { "name": "string", ... } (partial update)
        
    -   Response: { "_id": "string", "name": "string", ... }
        
    -   Status Codes:
        
        -   200: Success
            
        -   401: Unauthorized
            
        -   404: Event not found
            
        -   500: Server error
            
5.  Delete Event
    
    -   DELETE  /events/:id
        
    -   Headers: Authorization: Bearer <token>
        
    -   Response: { "msg": "Event deleted" }
        
    -   Status Codes:
        
        -   200: Success
            
        -   401: Unauthorized
            
        -   404: Event not found
            
        -   500: Server error
            
6.  Save Event
    
    -   POST  /events/save/:id
        
    -   Headers: Authorization: Bearer <token>
        
    -   Response: { "msg": "Event saved" }
        
    -   Status Codes:
        
        -   200: Success
            
        -   400: Event already saved
            
        -   401: Unauthorized
            
        -   404: Event not found
            
        -   500: Server error