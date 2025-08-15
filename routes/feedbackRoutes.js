const express = require('express');
const {
    createFeedback,
    getFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
} = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', createFeedback);         // Create
router.get('/', getFeedbacks);             // Read all
router.get('/:id', getFeedbackById);       // Read one
router.put('/:id', updateFeedback);        // Update
router.delete('/:id', deleteFeedback);     // Delete

module.exports = router;
