const mongoose = require('mongoose');

const eventParticipantSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event ID is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    status: {
        type: String,
        enum: ['invited', 'accepted', 'declined', 'maybe'],
        default: 'invited'
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    responseNote: {
        type: String,
        maxlength: [500, 'Response note cannot exceed 500 characters']
    },
    respondedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate participants
eventParticipantSchema.index({ eventId: 1, userId: 1 }, { unique: true });

// Index for faster queries
eventParticipantSchema.index({ eventId: 1, status: 1 });
eventParticipantSchema.index({ userId: 1, status: 1 });

// Method to respond to invitation
eventParticipantSchema.methods.respond = function(status, note = '') {
    this.status = status;
    this.responseNote = note;
    this.respondedAt = new Date();
    return this.save();
};

// Static method to get event participants by status
eventParticipantSchema.statics.getByStatus = async function(eventId, status) {
    return await this.find({ eventId, status })
        .populate('userId', 'username email avatar')
        .exec();
};

module.exports = mongoose.model('EventParticipant', eventParticipantSchema);

