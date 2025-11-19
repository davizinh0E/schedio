const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const { protect } = require('../middleware/auth');
const {
    getFriends,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    getMutualFriends
} = require('../controllers/friendController');

// Validation rules
const friendRequestValidation = [
    body('friendId')
        .notEmpty()
        .withMessage('Friend ID is required')
        .isMongoId()
        .withMessage('Invalid friend ID'),
    handleValidationErrors
];

// All routes are protected
router.use(protect);

// Routes
router.get('/', getFriends);
router.post('/request', friendRequestValidation, sendFriendRequest);
router.put('/accept/:id', acceptFriendRequest);
router.put('/reject/:id', rejectFriendRequest);
router.delete('/:id', removeFriend);
router.get('/mutual/:userId', getMutualFriends);

module.exports = router;

