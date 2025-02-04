const express = require('express');
const router = express.Router();
const userStoryController = require('../Controllers/userStoryController');
 
// Route to create a user
router.post('/create', userStoryController.createUserStory);
router.post('/update/:userStoryId', userStoryController.updateUserStory);
router.get('/getAllStories', userStoryController.getAllUserStories);
router.get('/getStories/:userName', userStoryController.getUserStories);

 
module.exports = router;