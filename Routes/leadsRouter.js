const express = require('express');
const router = express.Router();
const userController = require('../Controllers/leadsController');
 
// Route to create a user
router.post('/create', userController.leadGenerate);
router.get('/getAllLeads', userController.getAllLeads);
 
module.exports = router;