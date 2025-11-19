# 📡 Schedio API Reference

Complete API endpoint documentation with examples.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Get a token by registering or logging in.

---

## 🔐 Authentication Endpoints

### Register New User

Create a new user account.

**Endpoint:** `POST /auth/register`  
**Auth Required:** No

**Request Body:**
```json
{
  "username": "ana_silva",
  "email": "ana@example.com",
  "password": "password123",
  "avatar": "👩",
  "language": "pt"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "ana_silva",
    "email": "ana@example.com",
    "avatar": "👩",
    "darkMode": false,
    "language": "pt",
    "createdAt": "2024-11-19T10:00:00.000Z"
  }
}
```

**Validation Rules:**
- `username`: 3-50 characters, alphanumeric with underscore/hyphen
- `email`: Valid email format
- `password`: Minimum 6 characters

---

### Login

Authenticate an existing user.

**Endpoint:** `POST /auth/login`  
**Auth Required:** No

**Request Body:**
```json
{
  "email": "ana@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "ana_silva",
    "email": "ana@example.com",
    "avatar": "👩",
    "darkMode": false,
    "language": "pt",
    "createdAt": "2024-11-19T10:00:00.000Z"
  }
}
```

---

### Get Current User

Get the authenticated user's profile.

**Endpoint:** `GET /auth/me`  
**Auth Required:** Yes

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "ana_silva",
    "email": "ana@example.com",
    "avatar": "👩",
    "darkMode": false,
    "language": "pt",
    "createdAt": "2024-11-19T10:00:00.000Z"
  }
}
```

---

### Update Settings

Update user preferences.

**Endpoint:** `PUT /auth/settings`  
**Auth Required:** Yes

**Request Body:**
```json
{
  "darkMode": true,
  "language": "en",
  "avatar": "👩‍💼"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Settings updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "ana_silva",
    "email": "ana@example.com",
    "avatar": "👩‍💼",
    "darkMode": true,
    "language": "en",
    "createdAt": "2024-11-19T10:00:00.000Z"
  }
}
```

---

### Change Password

Update user password.

**Endpoint:** `PUT /auth/password`  
**Auth Required:** Yes

**Request Body:**
```json
{
  "currentPassword": "password123",
  "newPassword": "newPassword456"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 📅 Event Endpoints

### Get All Events

Retrieve all events for the authenticated user.

**Endpoint:** `GET /events`  
**Auth Required:** Yes

**Query Parameters:**
- `startDate` (optional): Filter by start date (ISO 8601)
- `endDate` (optional): Filter by end date (ISO 8601)
- `category` (optional): Filter by category
- `completed` (optional): Filter by completion status (true/false)

**Example:**
```
GET /events?startDate=2024-01-01&endDate=2024-12-31&category=work
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "events": [
    {
      "id": "507f1f77bcf86cd799439011",
      "userId": {
        "id": "507f191e810c19729de860ea",
        "username": "ana_silva",
        "avatar": "👩"
      },
      "title": "Team Meeting",
      "description": "Weekly sync",
      "date": "2024-01-15T00:00:00.000Z",
      "time": "10:00",
      "category": "work",
      "color": "#7ba4d9",
      "priority": "high",
      "completed": false,
      "participants": [
        {
          "id": "507f191e810c19729de860eb",
          "username": "joao_santos",
          "avatar": "👨"
        }
      ],
      "createdAt": "2024-01-10T10:00:00.000Z",
      "updatedAt": "2024-01-10T10:00:00.000Z"
    }
  ]
}
```

---

### Get Single Event

Retrieve a specific event by ID.

**Endpoint:** `GET /events/:id`  
**Auth Required:** Yes

**Response:** `200 OK`
```json
{
  "success": true,
  "event": {
    "id": "507f1f77bcf86cd799439011",
    "userId": {
      "id": "507f191e810c19729de860ea",
      "username": "ana_silva",
      "email": "ana@example.com",
      "avatar": "👩"
    },
    "title": "Team Meeting",
    "description": "Weekly sync",
    "date": "2024-01-15T00:00:00.000Z",
    "time": "10:00",
    "category": "work",
    "color": "#7ba4d9",
    "priority": "high",
    "completed": false,
    "participants": [],
    "reminder": {
      "enabled": true,
      "time": 30
    },
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  }
}
```

---

### Create Event

Create a new event.

**Endpoint:** `POST /events`  
**Auth Required:** Yes

**Request Body:**
```json
{
  "title": "Team Meeting",
  "description": "Weekly sync",
  "date": "2024-01-15",
  "time": "10:00",
  "category": "work",
  "color": "#7ba4d9",
  "priority": "high",
  "participants": ["507f191e810c19729de860eb"],
  "reminder": {
    "enabled": true,
    "time": 30
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Event created successfully",
  "event": {
    "id": "507f1f77bcf86cd799439011",
    "userId": {
      "id": "507f191e810c19729de860ea",
      "username": "ana_silva",
      "avatar": "👩"
    },
    "title": "Team Meeting",
    "description": "Weekly sync",
    "date": "2024-01-15T00:00:00.000Z",
    "time": "10:00",
    "category": "work",
    "color": "#7ba4d9",
    "priority": "high",
    "completed": false,
    "participants": [
      {
        "id": "507f191e810c19729de860eb",
        "username": "joao_santos",
        "avatar": "👨"
      }
    ],
    "reminder": {
      "enabled": true,
      "time": 30
    },
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  }
}
```

**Validation Rules:**
- `title`: Required, max 200 characters
- `date`: Required, valid ISO 8601 date
- `time`: Required, HH:MM format
- `category`: One of: work, personal, health, social, other
- `priority`: One of: low, medium, high

---

### Update Event

Update an existing event.

**Endpoint:** `PUT /events/:id`  
**Auth Required:** Yes (must be event owner)

**Request Body:**
```json
{
  "title": "Updated Team Meeting",
  "completed": true
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Event updated successfully",
  "event": { /* updated event object */ }
}
```

---

### Delete Event

Delete an event.

**Endpoint:** `DELETE /events/:id`  
**Auth Required:** Yes (must be event owner)

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

### Toggle Event Completion

Mark an event as complete or incomplete.

**Endpoint:** `PATCH /events/:id/complete`  
**Auth Required:** Yes

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Event marked as completed",
  "event": { /* updated event object */ }
}
```

---

## 👥 Friend Endpoints

### Get Friends

Retrieve all friends or filter by status.

**Endpoint:** `GET /friends`  
**Auth Required:** Yes

**Query Parameters:**
- `status` (optional): Filter by status (pending, accepted, rejected, blocked)

**Example:**
```
GET /friends?status=accepted
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "friends": [
    {
      "id": "507f1f77bcf86cd799439011",
      "friend": {
        "id": "507f191e810c19729de860eb",
        "username": "joao_santos",
        "email": "joao@example.com",
        "avatar": "👨"
      },
      "status": "accepted",
      "requestedBy": "507f191e810c19729de860ea",
      "createdAt": "2024-01-10T10:00:00.000Z"
    }
  ]
}
```

---

### Send Friend Request

Send a friend request to another user.

**Endpoint:** `POST /friends/request`  
**Auth Required:** Yes

**Request Body:**
```json
{
  "friendId": "507f191e810c19729de860eb"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Friend request sent successfully",
  "friendship": {
    "id": "507f1f77bcf86cd799439011",
    "userId": {
      "id": "507f191e810c19729de860ea",
      "username": "ana_silva",
      "avatar": "👩"
    },
    "friendId": {
      "id": "507f191e810c19729de860eb",
      "username": "joao_santos",
      "avatar": "👨"
    },
    "status": "pending",
    "requestedBy": "507f191e810c19729de860ea",
    "createdAt": "2024-01-10T10:00:00.000Z"
  }
}
```

---

### Accept Friend Request

Accept a pending friend request.

**Endpoint:** `PUT /friends/accept/:id`  
**Auth Required:** Yes (must be request recipient)

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Friend request accepted",
  "friendship": { /* updated friendship object */ }
}
```

---

### Reject Friend Request

Reject a pending friend request.

**Endpoint:** `PUT /friends/reject/:id`  
**Auth Required:** Yes (must be request recipient)

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Friend request rejected"
}
```

---

### Remove Friend

Remove a friend or cancel a friend request.

**Endpoint:** `DELETE /friends/:id`  
**Auth Required:** Yes

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Friend removed successfully"
}
```

---

### Get Mutual Friends

Get mutual friends between you and another user.

**Endpoint:** `GET /friends/mutual/:userId`  
**Auth Required:** Yes

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 3,
  "friends": [
    {
      "id": "507f191e810c19729de860ec",
      "username": "maria_costa",
      "email": "maria@example.com",
      "avatar": "👩‍🦰"
    }
  ]
}
```

---

## 👤 User Endpoints

### Search Users

Search for users by username or email.

**Endpoint:** `GET /users`  
**Auth Required:** Yes

**Query Parameters:**
- `search` (required): Search query (min 2 characters)
- `limit` (optional): Max results (default: 20)

**Example:**
```
GET /users?search=ana&limit=10
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "users": [
    {
      "id": "507f191e810c19729de860ea",
      "username": "ana_silva",
      "email": "ana@example.com",
      "avatar": "👩",
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

---

### Get User Profile

Get a user's public profile.

**Endpoint:** `GET /users/:id`  
**Auth Required:** Yes

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "507f191e810c19729de860ea",
    "username": "ana_silva",
    "email": "ana@example.com",
    "avatar": "👩",
    "language": "pt",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "friendshipStatus": "accepted",
    "mutualFriendsCount": 3
  }
}
```

---

### Get User Statistics

Get statistics for a user (own stats or friends' stats).

**Endpoint:** `GET /users/:id/stats`  
**Auth Required:** Yes

**Response:** `200 OK`
```json
{
  "success": true,
  "stats": {
    "totalEvents": 45,
    "completedEvents": 32,
    "upcomingEvents": 8,
    "friends": 12,
    "completionRate": 71
  }
}
```

---

## ❌ Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes

- `400 Bad Request` - Invalid input/validation error
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Example Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

---

## 🔒 Rate Limiting

API is rate limited to prevent abuse:

- **Window:** 15 minutes
- **Max Requests:** 100 per IP

When limit is exceeded:
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## 📝 Notes

- All dates are in ISO 8601 format
- All timestamps include timezone (UTC)
- Token expires after 7 days (configurable)
- Passwords are hashed with bcrypt (10 rounds)
- All endpoints use JSON for request/response bodies

