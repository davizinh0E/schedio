const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Friend ID is required']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'blocked'],
        default: 'pending'
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate friendships
friendSchema.index({ userId: 1, friendId: 1 }, { unique: true });

// Index for faster queries
friendSchema.index({ userId: 1, status: 1 });
friendSchema.index({ friendId: 1, status: 1 });

// Static method to check if friendship exists
friendSchema.statics.areFriends = async function(userId, friendId) {
    const friendship = await this.findOne({
        $or: [
            { userId, friendId, status: 'accepted' },
            { userId: friendId, friendId: userId, status: 'accepted' }
        ]
    });
    return !!friendship;
};

// Static method to get mutual friends
friendSchema.statics.getMutualFriends = async function(userId1, userId2) {
    const user1Friends = await this.find({ 
        userId: userId1, 
        status: 'accepted' 
    }).distinct('friendId');
    
    const user2Friends = await this.find({ 
        userId: userId2, 
        status: 'accepted' 
    }).distinct('friendId');
    
    return user1Friends.filter(id => 
        user2Friends.some(id2 => id2.toString() === id.toString())
    );
};

module.exports = mongoose.model('Friend', friendSchema);

