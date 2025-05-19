const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const profileController = require('../controllers/profile.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, profileController.getMyProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('location', 'Location is required').not().isEmpty(),
      check('yearsOfExperience', 'Years of experience is required').isNumeric(),
      check('skills', 'Skills are required').not().isEmpty(),
      check('preferredJobType', 'Preferred job type is required').isIn(['remote', 'onsite', 'any']),
      validate
    ]
  ],
  profileController.createProfile
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', profileController.getAllProfiles);

// @route   GET api/profile/user/:userId
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:userId', profileController.getProfileById);

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private
router.delete('/', auth, profileController.deleteProfile);

module.exports = router;