const Profile = require('../models/Profile');
const Job = require('../models/Job');
const aiService = require('../services/ai.service');

// Get job recommendations based on user profile
exports.getJobRecommendations = async (req, res) => {
  try {
    // Get user profile
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Please create a profile first.' });
    }
    
    // Get all active jobs
    const jobs = await Job.find({ isActive: true });
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found in the system.' });
    }
    
    // Get job recommendations from AI service
    const recommendations = await aiService.getJobRecommendations(profile, jobs);
    
    res.json(recommendations);
  } catch (err) {
    console.error('Error in job recommendations:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};