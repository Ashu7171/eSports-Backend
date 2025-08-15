const Feedback = require('../models/Feedback');

// Create Feedback
const createFeedback = async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Feedback
const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Feedback By ID
const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Feedback
const updateFeedback = async (req, res) => {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFeedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Feedback
const deleteFeedback = async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: 'Feedback deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createFeedback, getFeedbacks, getFeedbackById, updateFeedback, deleteFeedback };
