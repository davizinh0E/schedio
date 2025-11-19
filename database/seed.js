/**
 * Seed script for Schedio database
 * Run this to populate the database with sample data for testing
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../backend/.env' });

const User = require('./models/User');
const Event = require('./models/Event');
const Friend = require('./models/Friend');
const EventParticipant = require('./models/EventParticipant');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany();
        await Event.deleteMany();
        await Friend.deleteMany();
        await EventParticipant.deleteMany();

        // Create users
        console.log('👥 Creating users...');
        const users = await User.create([
            {
                username: 'ana_silva',
                email: 'ana@example.com',
                password: 'password123',
                avatar: '👩',
                language: 'pt'
            },
            {
                username: 'joao_santos',
                email: 'joao@example.com',
                password: 'password123',
                avatar: '👨',
                language: 'pt'
            },
            {
                username: 'maria_costa',
                email: 'maria@example.com',
                password: 'password123',
                avatar: '👩‍🦰',
                language: 'pt'
            },
            {
                username: 'pedro_lima',
                email: 'pedro@example.com',
                password: 'password123',
                avatar: '👨‍💼',
                language: 'en'
            },
            {
                username: 'sofia_alves',
                email: 'sofia@example.com',
                password: 'password123',
                avatar: '👱‍♀️',
                language: 'en'
            }
        ]);

        console.log(`✅ Created ${users.length} users`);

        // Create friendships
        console.log('🤝 Creating friendships...');
        const friendships = await Friend.create([
            {
                userId: users[0]._id,
                friendId: users[1]._id,
                requestedBy: users[0]._id,
                status: 'accepted'
            },
            {
                userId: users[0]._id,
                friendId: users[2]._id,
                requestedBy: users[0]._id,
                status: 'accepted'
            },
            {
                userId: users[1]._id,
                friendId: users[3]._id,
                requestedBy: users[1]._id,
                status: 'accepted'
            },
            {
                userId: users[2]._id,
                friendId: users[4]._id,
                requestedBy: users[2]._id,
                status: 'pending'
            }
        ]);

        console.log(`✅ Created ${friendships.length} friendships`);

        // Create events
        console.log('📅 Creating events...');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const events = await Event.create([
            {
                userId: users[0]._id,
                title: 'Team Meeting',
                description: 'Weekly team sync',
                date: today,
                time: '10:00',
                category: 'work',
                color: '#7ba4d9',
                priority: 'high',
                participants: [users[1]._id, users[2]._id]
            },
            {
                userId: users[0]._id,
                title: 'Gym Session',
                description: 'Morning workout',
                date: tomorrow,
                time: '07:00',
                category: 'health',
                color: '#51cf66',
                priority: 'medium',
                completed: false
            },
            {
                userId: users[1]._id,
                title: 'Project Deadline',
                description: 'Submit final project',
                date: nextWeek,
                time: '23:59',
                category: 'work',
                color: '#ff6b6b',
                priority: 'high',
                reminder: {
                    enabled: true,
                    time: 60
                }
            },
            {
                userId: users[2]._id,
                title: 'Coffee with Friends',
                description: 'Catch up',
                date: tomorrow,
                time: '15:00',
                category: 'social',
                color: '#ffd93d',
                priority: 'low',
                participants: [users[0]._id, users[4]._id]
            },
            {
                userId: users[0]._id,
                title: 'Buy Groceries',
                description: 'Weekly shopping',
                date: today,
                time: '18:00',
                category: 'personal',
                color: '#7ba4d9',
                priority: 'medium',
                completed: true
            }
        ]);

        console.log(`✅ Created ${events.length} events`);

        // Create event participants
        console.log('👥 Creating event participants...');
        const participants = await EventParticipant.create([
            {
                eventId: events[0]._id,
                userId: users[1]._id,
                invitedBy: users[0]._id,
                status: 'accepted'
            },
            {
                eventId: events[0]._id,
                userId: users[2]._id,
                invitedBy: users[0]._id,
                status: 'accepted'
            },
            {
                eventId: events[3]._id,
                userId: users[0]._id,
                invitedBy: users[2]._id,
                status: 'maybe'
            },
            {
                eventId: events[3]._id,
                userId: users[4]._id,
                invitedBy: users[2]._id,
                status: 'invited'
            }
        ]);

        console.log(`✅ Created ${participants.length} event participants`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📝 Test Credentials:');
        console.log('   Email: ana@example.com');
        console.log('   Password: password123');
        console.log('\n   (Same password for all test users)');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
    }
};

// Run seeding
connectDB().then(() => seedData());

