const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const courseController = require('../Controllers/coursesController');
 
// Route to create a user
router.post('/create', userController.createUser);
 
// Route to get all users
router.get('/all', userController.getAllUsers);

router.post('/login', userController.login);
router.post('/protected', userController.protected);
router.get('/getUser/:username', userController.getUser);
router.get('/getTopic/:id', courseController.getCourse);
router.patch('/updateUser/:userId', userController.updateUser);
router.post('/userCheck', userController.userCheck);
router.post('/addNewTopic', courseController.addNewTopic);
router.post('/updatePassword', userController.updatePassword);
 
module.exports = router;