const Friend = require('../../database/models/Friend');
const User = require('../../database/models/User');

// @desc    Get all friends
// @route   GET /api/friends
// @access  Private
exports.getFriends = async (req, res) => {
    try {
        const { status } = req.query;

        let query = {
            $or: [
                { userId: req.user.id },
                { friendId: req.user.id }
            ]
        };

        if (status) {
            query.status = status;
        }

        const friendships = await Friend.find(query)
            .populate('userId', 'username email avatar')
            .populate('friendId', 'username email avatar')
            .sort({ createdAt: -1 });

        // Format response to show the friend (not self)
        const friends = friendships.map(friendship => {
            const friend = friendship.userId._id.toString() === req.user.id
                ? friendship.friendId
                : friendship.userId;

            return {
                id: friendship._id,
                friend,
                status: friendship.status,
                requestedBy: friendship.requestedBy,
                createdAt: friendship.createdAt
            };
        });

        res.status(200).json({
            success: true,
            count: friends.length,
            friends
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching friends',
            error: error.message
        });
    }
};

// @desc    Send friend request
// @route   POST /api/friends/request
// @access  Private
exports.sendFriendRequest = async (req, res) => {
    try {
        const { friendId } = req.body;

        // Check if trying to add self
        if (friendId === req.user.id) {
            return res.status(400).json({
                success: false,
                message: 'Cannot send friend request to yourself'
            });
        }

        // Check if friend exists
        const friend = await User.findById(friendId);
        if (!friend) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if friendship already exists
        const existingFriendship = await Friend.findOne({
            $or: [
                { userId: req.user.id, friendId },
                { userId: friendId, friendId: req.user.id }
            ]
        });

        if (existingFriendship) {
            return res.status(400).json({
                success: false,
                message: 'Friend request already exists',
                status: existingFriendship.status
            });
        }

        // Create friend request
        const friendship = await Friend.create({
            userId: req.user.id,
            friendId,
            requestedBy: req.user.id,
            status: 'pending'
        });

        const populatedFriendship = await Friend.findById(friendship._id)
            .populate('userId', 'username email avatar')
            .populate('friendId', 'username email avatar');

        res.status(201).json({
            success: true,
            message: 'Friend request sent successfully',
            friendship: populatedFriendship
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending friend request',
            error: error.message
        });
    }
};

// @desc    Accept friend request
// @route   PUT /api/friends/accept/:id
// @access  Private
exports.acceptFriendRequest = async (req, res) => {
    try {
        const friendship = await Friend.findById(req.params.id);

        if (!friendship) {
            return res.status(404).json({
                success: false,
                message: 'Friend request not found'
            });
        }

        // Check if user is the recipient
        if (friendship.friendId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to accept this request'
            });
        }

        // Update status
        friendship.status = 'accepted';
        await friendship.save();

        const populatedFriendship = await Friend.findById(friendship._id)
            .populate('userId', 'username email avatar')
            .populate('friendId', 'username email avatar');

        res.status(200).json({
            success: true,
            message: 'Friend request accepted',
            friendship: populatedFriendship
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error accepting friend request',
            error: error.message
        });
    }
};

// @desc    Reject friend request
// @route   PUT /api/friends/reject/:id
// @access  Private
exports.rejectFriendRequest = async (req, res) => {
    try {
        const friendship = await Friend.findById(req.params.id);

        if (!friendship) {
            return res.status(404).json({
                success: false,
                message: 'Friend request not found'
            });
        }

        // Check if user is the recipient
        if (friendship.friendId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to reject this request'
            });
        }

        // Update status
        friendship.status = 'rejected';
        await friendship.save();

        res.status(200).json({
            success: true,
            message: 'Friend request rejected'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error rejecting friend request',
            error: error.message
        });
    }
};

// @desc    Remove friend
// @route   DELETE /api/friends/:id
// @access  Private
exports.removeFriend = async (req, res) => {
    try {
        const friendship = await Friend.findById(req.params.id);

        if (!friendship) {
            return res.status(404).json({
                success: false,
                message: 'Friendship not found'
            });
        }

        // Check if user is part of this friendship
        if (friendship.userId.toString() !== req.user.id && 
            friendship.friendId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to remove this friendship'
            });
        }

        await friendship.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Friend removed successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error removing friend',
            error: error.message
        });
    }
};

// @desc    Get mutual friends
// @route   GET /api/friends/mutual/:userId
// @access  Private
exports.getMutualFriends = async (req, res) => {
    try {
        const mutualFriendIds = await Friend.getMutualFriends(req.user.id, req.params.userId);

        const mutualFriends = await User.find({
            _id: { $in: mutualFriendIds }
        }).select('username email avatar');

        res.status(200).json({
            success: true,
            count: mutualFriends.length,
            friends: mutualFriends
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching mutual friends',
            error: error.message
        });
    }
};

