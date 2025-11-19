# Schedio Backend API

RESTful API for the Schedio Calendar application built with Node.js, Express, and MongoDB.

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── eventController.js   # Event management
│   ├── friendController.js  # Friend system
│   └── userController.js    # User operations
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── validation.js       # Input validation
├── routes/
│   ├── auth.js             # Auth routes
│   ├── events.js           # Event routes
│   ├── friends.js          # Friend routes
│   └── users.js            # User routes
├── server.js               # Express server
└── package.json            # Dependencies
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend` folder:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/schedio
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:8000
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Using MongoDB service
mongod

# Or with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Run the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## 🧪 Testing

Check if the server is running:

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Schedio API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📚 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "ana_silva",
  "email": "ana@example.com",
  "password": "password123",
  "avatar": "👩",
  "language": "pt"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ana@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Event Endpoints

#### Get All Events
```http
GET /api/events?startDate=2024-01-01&endDate=2024-12-31&category=work
Authorization: Bearer <token>
```

#### Create Event
```http
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Team Meeting",
  "description": "Weekly sync",
  "date": "2024-01-15",
  "time": "10:00",
  "category": "work",
  "priority": "high",
  "participants": ["userId1", "userId2"]
}
```

#### Update Event
```http
PUT /api/events/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "completed": true
}
```

#### Delete Event
```http
DELETE /api/events/:id
Authorization: Bearer <token>
```

### Friend Endpoints

#### Get Friends
```http
GET /api/friends?status=accepted
Authorization: Bearer <token>
```

#### Send Friend Request
```http
POST /api/friends/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "friendId": "userId"
}
```

#### Accept Friend Request
```http
PUT /api/friends/accept/:id
Authorization: Bearer <token>
```

### User Endpoints

#### Search Users
```http
GET /api/users?search=ana&limit=20
Authorization: Bearer <token>
```

#### Get User Profile
```http
GET /api/users/:id
Authorization: Bearer <token>
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet.js for security headers
- CORS configuration
- Input validation and sanitization
- MongoDB injection prevention

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRE` | Token expiration | `7d` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:8000` |

## 📦 Database Models

### User
- username, email, password
- avatar, darkMode, language
- timestamps

### Event
- title, description, date, time
- category, color, priority
- participants, completed
- reminder settings
- recurring options

### Friend
- userId, friendId
- status (pending/accepted/rejected/blocked)
- requestedBy

### EventParticipant
- eventId, userId
- status (invited/accepted/declined/maybe)
- responseNote, respondedAt

## 🚀 Deployment

### Using PM2
```bash
npm install -g pm2
pm2 start server.js --name schedio-api
pm2 save
pm2 startup
```

### Using Docker
```bash
docker build -t schedio-api .
docker run -d -p 5000:5000 --env-file .env schedio-api
```

## 📝 License

ISC

