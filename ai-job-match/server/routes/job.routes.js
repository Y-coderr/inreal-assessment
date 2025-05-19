const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const jobController = require('../controllers/job.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', jobController.getAllJobs);

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', jobController.getJobById);

// @route   POST api/jobs
// @desc    Create a job
// @access  Private (would typically be admin-only in a real app)
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('requirements', 'Requirements are required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
      check('jobType', 'Job type is required').isIn(['remote', 'onsite', 'hybrid']),
      validate
    ]
  ],
  jobController.createJob
);

// @route   PUT api/jobs/:id
// @desc    Update a job
// @access  Private (would typically be admin-only in a real app)
router.put('/:id', auth, jobController.updateJob);

// @route   DELETE api/jobs/:id
// @desc    Delete a job
// @access  Private (would typically be admin-only in a real app)
router.delete('/:id', auth, jobController.deleteJob);

module.exports = router;