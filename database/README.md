# Schedio Database

Database models and schemas for the Schedio application.

## 📊 Database Choice

This project supports both **MongoDB** (primary) and **SQL** databases.

### MongoDB (Recommended)
- Used with Mongoose ODM
- Flexible schema for rapid development
- Easy to scale horizontally
- Great for JSON-like data

### SQL (Alternative)
- PostgreSQL or MySQL compatible
- Schema provided in `schema.sql`
- Better for complex relationships
- ACID compliance

## 🗂️ Models

### User Model
Stores user account information and preferences.

**Fields:**
- `username` - Unique username (3-50 chars)
- `email` - Unique email address
- `password` - Hashed password (bcrypt)
- `avatar` - User avatar emoji
- `darkMode` - Theme preference
- `language` - UI language (en/pt)
- `isActive` - Account status
- `timestamps` - createdAt, updatedAt

**Methods:**
- `comparePassword(password)` - Verify password
- `getPublicProfile()` - Get safe user data

### Event Model
Stores calendar events and tasks.

**Fields:**
- `userId` - Event owner
- `title` - Event name (max 200 chars)
- `description` - Event details
- `date` - Event date
- `time` - Event time (HH:MM format)
- `category` - work/personal/health/social/other
- `color` - Display color
- `participants` - Array of user IDs
- `completed` - Completion status
- `priority` - low/medium/high
- `reminder` - Reminder settings
- `isRecurring` - Recurring event flag
- `recurrence` - Recurrence rules

**Methods:**
- `isParticipant(userId)` - Check participant

**Indexes:**
- `(userId, date)` - Fast event queries
- `participants` - Invitation lookups

### Friend Model
Manages friendship connections.

**Fields:**
- `userId` - First user
- `friendId` - Second user
- `status` - pending/accepted/rejected/blocked
- `requestedBy` - Who initiated

**Static Methods:**
- `areFriends(userId, friendId)` - Check friendship
- `getMutualFriends(user1, user2)` - Find mutual friends

**Indexes:**
- `(userId, friendId)` - Unique constraint
- `(userId, status)` - Fast status queries
- `(friendId, status)` - Reverse lookups

### EventParticipant Model
Tracks event invitations and responses.

**Fields:**
- `eventId` - Related event
- `userId` - Invited user
- `status` - invited/accepted/declined/maybe
- `invitedBy` - Who sent invitation
- `responseNote` - Optional note
- `respondedAt` - Response timestamp

**Methods:**
- `respond(status, note)` - Respond to invitation

**Static Methods:**
- `getByStatus(eventId, status)` - Filter by status

**Indexes:**
- `(eventId, userId)` - Unique constraint
- `(eventId, status)` - Event attendees
- `(userId, status)` - User invitations

## 🚀 Setup

### MongoDB Setup

#### 1. Install MongoDB
```bash
# macOS
brew install mongodb-community

# Ubuntu
sudo apt install mongodb

# Windows
# Download from mongodb.com
```

#### 2. Start MongoDB
```bash
# macOS/Linux
mongod --dbpath /path/to/data

# Windows
net start MongoDB

# Docker
docker run -d -p 27017:27017 mongo:latest
```

#### 3. Connection String
```
mongodb://localhost:27017/schedio
```

### SQL Setup

#### 1. Create Database
```sql
CREATE DATABASE schedio;
USE schedio;
```

#### 2. Run Schema
```bash
# PostgreSQL
psql -U postgres -d schedio -f schema.sql

# MySQL
mysql -u root -p schedio < schema.sql
```

## 🌱 Seeding Data

Populate the database with test data:

```bash
cd database
node seed.js
```

This creates:
- 5 test users
- Multiple events
- Friend relationships
- Event participants

**Test Credentials:**
```
Email: ana@example.com
Password: password123
```

## 📊 Relationships

```
User ──┬── Events (1:N)
       ├── Friends (N:N via Friend model)
       └── EventParticipants (N:N)

Event ──┬── Owner (N:1 User)
        └── Participants (N:N via EventParticipant)

Friend ──┬── User (N:1)
         └── Friend (N:1)

EventParticipant ──┬── Event (N:1)
                   ├── User (N:1)
                   └── InvitedBy (N:1 User)
```

## 🔍 Query Examples

### Get User's Events
```javascript
const events = await Event.find({ 
    userId: userId 
}).populate('participants', 'username avatar');
```

### Get Accepted Friends
```javascript
const friends = await Friend.find({
    $or: [
        { userId: userId, status: 'accepted' },
        { friendId: userId, status: 'accepted' }
    ]
}).populate('userId friendId', 'username avatar');
```

### Get Event Invitations
```javascript
const invitations = await EventParticipant.find({
    userId: userId,
    status: 'invited'
}).populate('eventId invitedBy');
```

## 🔒 Security

- Passwords hashed with bcrypt (10 rounds)
- Indexes prevent duplicate entries
- Foreign key constraints (SQL)
- Input validation before DB operations
- Sanitization against injection

## 📈 Performance

**Indexes Created:**
- Users: email, username
- Events: userId+date, participants
- Friends: userId+friendId, status combinations
- EventParticipants: eventId+userId, status lookups

**Optimization Tips:**
- Use projections to limit fields
- Populate only needed fields
- Add compound indexes for common queries
- Use lean() for read-only queries

## 🔄 Migrations

When schema changes are needed:

```bash
# MongoDB doesn't require migrations
# But you can use migrate-mongo for versioning

# SQL migrations
# Use tools like Flyway or Liquibase
```

## 📝 Validation

All models include:
- Required field validation
- Type validation
- Length constraints
- Enum validation
- Custom validators
- Pre-save hooks

## 🧪 Testing

```bash
# Test connection
node -e "require('./models/User'); console.log('Models loaded!')"

# Seed test data
node seed.js

# Drop database (careful!)
mongo schedio --eval "db.dropDatabase()"
```

## 📚 Resources

- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

