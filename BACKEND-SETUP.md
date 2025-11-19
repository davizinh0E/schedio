# 🚀 Backend Setup Guide

Complete guide to set up and run the Schedio backend API.

## 📋 Prerequisites

Before starting, make sure you have:

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **MongoDB** ([Install Guide](https://docs.mongodb.com/manual/installation/))
- **Git** (already installed)

## 🏗️ Project Structure

```
SChedio/
├── backend/                    # Express API server
│   ├── config/                 # Configuration files
│   │   └── database.js         # MongoDB connection
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── friendController.js
│   │   └── userController.js
│   ├── middleware/             # Express middleware
│   │   ├── auth.js             # JWT authentication
│   │   └── validation.js       # Input validation
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── friends.js
│   │   └── users.js
│   ├── server.js               # Express server entry point
│   ├── package.json            # Dependencies
│   └── env.template            # Environment variables template
│
└── database/                   # Database models & scripts
    ├── models/                 # Mongoose models
    │   ├── User.js
    │   ├── Event.js
    │   ├── Friend.js
    │   └── EventParticipant.js
    ├── schema.sql              # SQL alternative schema
    ├── seed.js                 # Sample data seeder
    └── README.md               # Database documentation
```

## ⚙️ Quick Setup (5 Steps)

### 1. Install Dependencies

```bash
cd backend
npm install
```

This installs:
- Express.js (web framework)
- Mongoose (MongoDB ODM)
- JWT & bcrypt (authentication)
- And more...

### 2. Configure Environment

Copy the template and edit:

```bash
cp env.template .env
```

Edit `.env` with your settings:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/schedio
JWT_SECRET=change-this-to-a-random-secret-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:8000
```

**Important:** Change `JWT_SECRET` to a random string!

### 3. Start MongoDB

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod

# Or specify data directory
mongod --dbpath C:\data\db
```

#### Option B: MongoDB Atlas (Cloud)
1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

#### Option C: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Seed Database (Optional)

Add test data for development:

```bash
cd ../database
node seed.js
```

This creates:
- 5 test users
- Sample events
- Friend connections

**Test Login:**
- Email: `ana@example.com`
- Password: `password123`

### 5. Start Server

```bash
cd ../backend
npm run dev
```

Server runs at: `http://localhost:5000`

## ✅ Verify Setup

### Check Server Health

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Schedio API is running",
  "timestamp": "2024-11-19T..."
}
```

### Test Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response!

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/settings` - Update settings
- `PUT /api/auth/password` - Change password

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `GET /api/events/:id` - Get single event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `PATCH /api/events/:id/complete` - Toggle completion

### Friends
- `GET /api/friends` - Get friends list
- `POST /api/friends/request` - Send friend request
- `PUT /api/friends/accept/:id` - Accept request
- `PUT /api/friends/reject/:id` - Reject request
- `DELETE /api/friends/:id` - Remove friend
- `GET /api/friends/mutual/:userId` - Get mutual friends

### Users
- `GET /api/users?search=name` - Search users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/stats` - Get user statistics

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```bash
Authorization: Bearer <your-token-here>
```

Example:
```bash
curl http://localhost:5000/api/events \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check if MongoDB is running: `mongod`
- Verify `MONGODB_URI` in `.env`
- Check firewall settings

### "Port 5000 already in use"
- Change `PORT` in `.env` to another port (e.g., 5001)
- Or stop the process using port 5000

### "Module not found"
- Run `npm install` again
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### "Invalid token"
- Token may be expired (default: 7 days)
- Login again to get a new token
- Check `JWT_SECRET` matches between requests

## 📦 Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variables
- `cors` - Cross-origin resource sharing
- `helmet` - Security headers
- `express-validator` - Input validation
- `express-rate-limit` - Rate limiting

### Development
- `nodemon` - Auto-restart on changes

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=your-production-db-url
JWT_SECRET=super-secure-random-string
CLIENT_URL=https://your-domain.com
```

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

## 📚 Next Steps

1. ✅ **Integrate with Frontend**
   - Update frontend API calls to use `http://localhost:5000`
   - Replace mock data with real API calls

2. ✅ **Add Features**
   - Push notifications
   - File uploads for avatars
   - Real-time updates with Socket.io

3. ✅ **Security**
   - Add rate limiting per user
   - Implement refresh tokens
   - Add 2FA authentication

4. ✅ **Testing**
   - Unit tests with Jest
   - Integration tests with Supertest
   - E2E tests with Cypress

## 📖 Documentation

- **Backend API:** See `backend/README.md`
- **Database:** See `database/README.md`
- **Frontend Integration:** Coming soon

## 🆘 Need Help?

- Check logs: `npm run dev` shows detailed errors
- MongoDB logs: Usually in `/var/log/mongodb/`
- Node.js debugging: Add `console.log()` statements

---

**Happy Coding! 🎉**

