const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
 
// Route to create a user
router.post('/create', userController.createUser);
 
// Route to get all users
router.get('/all', userController.getAllUsers);

router.post('/login', userController.login);
router.post('/protected', userController.protected);
router.get('/getUser/:username', userController.getUser);
 
module.exports = router;