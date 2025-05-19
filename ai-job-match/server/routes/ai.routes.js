const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const auth = require('../middleware/auth.middleware');

// @route   GET api/ai/job-recommendations
// @desc    Get AI job recommendations for the current user
// @access  Private
router.get('/job-recommendations', auth, aiController.getJobRecommendations);

module.exports = router;