const express = require('express');
const router = express.Router();
const userController = require('../Controllers/metaController');
 
// Route to create a user
router.post('/create', userController.createMetaData);
router.get('/getMetaData', userController.getMetaData);
 
module.exports = router;