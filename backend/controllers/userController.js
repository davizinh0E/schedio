const User = require('../../database/models/User');
const Friend = require('../../database/models/Friend');

// @desc    Search users
// @route   GET /api/users
// @access  Private
exports.searchUsers = async (req, res) => {
    try {
        const { search, limit = 20 } = req.query;

        if (!search || search.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Search query must be at least 2 characters'
            });
        }

        const users = await User.find({
            $and: [
                { _id: { $ne: req.user.id } }, // Exclude current user
                {
                    $or: [
                        { username: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } }
                    ]
                }
            ],
            isActive: true
        })
        .select('username email avatar createdAt')
        .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching users',
            error: error.message
        });
    }
};

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('username email avatar language createdAt');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check friendship status
        const friendship = await Friend.findOne({
            $or: [
                { userId: req.user.id, friendId: req.params.id },
                { userId: req.params.id, friendId: req.user.id }
            ]
        });

        // Get mutual friends count
        const mutualFriends = await Friend.getMutualFriends(req.user.id, req.params.id);

        res.status(200).json({
            success: true,
            user: {
                ...user.toObject(),
                friendshipStatus: friendship ? friendship.status : 'none',
                mutualFriendsCount: mutualFriends.length
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile',
            error: error.message
        });
    }
};

// @desc    Get user statistics
// @route   GET /api/users/:id/stats
// @access  Private
exports.getUserStats = async (req, res) => {
    try {
        const Event = require('../../database/models/Event');

        // Only allow users to see their own stats or friends' stats
        if (req.params.id !== req.user.id) {
            const areFriends = await Friend.areFriends(req.user.id, req.params.id);
            if (!areFriends) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to view this user\'s stats'
                });
            }
        }

        const userId = req.params.id;

        // Get event statistics
        const totalEvents = await Event.countDocuments({ userId });
        const completedEvents = await Event.countDocuments({ userId, completed: true });
        const upcomingEvents = await Event.countDocuments({ 
            userId, 
            date: { $gte: new Date() },
            completed: false
        });

        // Get friend count
        const friendCount = await Friend.countDocuments({
            $or: [
                { userId, status: 'accepted' },
                { friendId: userId, status: 'accepted' }
            ]
        });

        res.status(200).json({
            success: true,
            stats: {
                totalEvents,
                completedEvents,
                upcomingEvents,
                friends: friendCount,
                completionRate: totalEvents > 0 
                    ? Math.round((completedEvents / totalEvents) * 100) 
                    : 0
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user stats',
            error: error.message
        });
    }
};

