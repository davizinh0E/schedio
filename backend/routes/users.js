const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    searchUsers,
    getUserProfile,
    getUserStats
} = require('../controllers/userController');

// All routes are protected
router.use(protect);

// Routes
router.get('/', searchUsers);
router.get('/:id', getUserProfile);
router.get('/:id/stats', getUserStats);

module.exports = router;

