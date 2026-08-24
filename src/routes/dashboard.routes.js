const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller.js');
const { adminAuth } = require('../middleware/auth.middleware.js'); 

// GET /api/dashboard
router.get('/', adminAuth, dashboardController.getDashboardData);

module.exports = router;