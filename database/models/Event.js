const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    time: {
        type: String,
        required: [true, 'Event time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format']
    },
    category: {
        type: String,
        enum: ['work', 'personal', 'health', 'social', 'other'],
        default: 'personal'
    },
    color: {
        type: String,
        default: '#7ba4d9'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    reminder: {
        enabled: {
            type: Boolean,
            default: false
        },
        time: {
            type: Number, // Minutes before event
            default: 30
        }
    },
    isRecurring: {
        type: Boolean,
        default: false
    },
    recurrence: {
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'yearly'],
        },
        endDate: Date
    }
}, {
    timestamps: true
});

// Index for faster queries
eventSchema.index({ userId: 1, date: 1 });
eventSchema.index({ participants: 1 });

// Method to check if user is participant
eventSchema.methods.isParticipant = function(userId) {
    return this.participants.some(p => p.toString() === userId.toString()) || 
           this.userId.toString() === userId.toString();
};

module.exports = mongoose.model('Event', eventSchema);

