const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const { protect } = require('../middleware/auth');
const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    toggleComplete
} = require('../controllers/eventController');

// Validation rules
const eventValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Event title is required')
        .isLength({ max: 200 })
        .withMessage('Title cannot exceed 200 characters'),
    body('date')
        .notEmpty()
        .withMessage('Event date is required')
        .isISO8601()
        .withMessage('Please provide a valid date'),
    body('time')
        .notEmpty()
        .withMessage('Event time is required')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .withMessage('Time must be in HH:MM format'),
    body('category')
        .optional()
        .isIn(['work', 'personal', 'health', 'social', 'other'])
        .withMessage('Invalid category'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Invalid priority'),
    handleValidationErrors
];

// All routes are protected
router.use(protect);

// Routes
router.route('/')
    .get(getEvents)
    .post(eventValidation, createEvent);

router.route('/:id')
    .get(getEvent)
    .put(eventValidation, updateEvent)
    .delete(deleteEvent);

router.patch('/:id/complete', toggleComplete);

module.exports = router;

