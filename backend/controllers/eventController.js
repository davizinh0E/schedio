const Event = require('../../database/models/Event');
const EventParticipant = require('../../database/models/EventParticipant');

// @desc    Get all events for logged in user
// @route   GET /api/events
// @access  Private
exports.getEvents = async (req, res) => {
    try {
        const { startDate, endDate, category, completed } = req.query;

        // Build query
        let query = {
            $or: [
                { userId: req.user.id },
                { participants: req.user.id }
            ]
        };

        // Add filters
        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (category) {
            query.category = category;
        }
        if (completed !== undefined) {
            query.completed = completed === 'true';
        }

        const events = await Event.find(query)
            .populate('userId', 'username avatar')
            .populate('participants', 'username avatar')
            .sort({ date: 1, time: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            events
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching events',
            error: error.message
        });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Private
exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('userId', 'username email avatar')
            .populate('participants', 'username avatar');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user has access
        if (!event.isParticipant(req.user.id)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this event'
            });
        }

        res.status(200).json({
            success: true,
            event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching event',
            error: error.message
        });
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res) => {
    try {
        // Add user ID to event
        req.body.userId = req.user.id;

        const event = await Event.create(req.body);

        // If there are participants, create participant records
        if (req.body.participants && req.body.participants.length > 0) {
            const participantRecords = req.body.participants.map(userId => ({
                eventId: event._id,
                userId,
                invitedBy: req.user.id,
                status: 'invited'
            }));

            await EventParticipant.insertMany(participantRecords);
        }

        const populatedEvent = await Event.findById(event._id)
            .populate('userId', 'username avatar')
            .populate('participants', 'username avatar');

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event: populatedEvent
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating event',
            error: error.message
        });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user is owner
        if (event.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this event'
            });
        }

        event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('userId', 'username avatar')
         .populate('participants', 'username avatar');

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating event',
            error: error.message
        });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if user is owner
        if (event.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this event'
            });
        }

        await event.deleteOne();

        // Delete associated participant records
        await EventParticipant.deleteMany({ eventId: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting event',
            error: error.message
        });
    }
};

// @desc    Toggle event completion
// @route   PATCH /api/events/:id/complete
// @access  Private
exports.toggleComplete = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        if (!event.isParticipant(req.user.id)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this event'
            });
        }

        event.completed = !event.completed;
        await event.save();

        res.status(200).json({
            success: true,
            message: `Event marked as ${event.completed ? 'completed' : 'incomplete'}`,
            event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating event',
            error: error.message
        });
    }
};

