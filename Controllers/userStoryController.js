const userStory = require('../Models/userStories');

exports.createUserStory = async (req, res) => {
    const { userName, createDate, title, description, status, closeDate, projectName, moduleName } = req.body;

    // Check if any required fields are missing
    if (!userName) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Create a new user story object (you'll need to define this model elsewhere in your code)
        const newStory = new userStory({
            userName,
            createDate,
            title,
            description,
            status,
            closeDate,
            projectName,
            moduleName
        });

        // Save the new story to the database
        await newStory.save();

        // Return a success response
        return res.status(201).json({ message: "Story created successfully", data: newStory });
    } catch (error) {
        // Handle any errors that occur during the save operation
        console.error(error);
        return res.status(500).json({ message: "An error occurred while saving the story", error: error.message });
    }
}

exports.updateUserStory = async (req, res) => {
    const { userStoryId } = req.params;  // Assuming you're passing the user story ID in the URL
    const updateFields = req.body;  // The fields to update, coming from the request body
    
    try {
      // Find the user story by ID
      const userStory1 = await userStory.findById(userStoryId);
  
      if (!userStory1) {
        return res.status(404).json({ message: 'User story not found' });
      }
  
      // Update only the fields that are present in the request body
      Object.keys(updateFields).forEach(key => {
        if (updateFields[key]) {
          userStory1[key] = updateFields[key];  // Update the user story's field with the new value
        }
      });
  
      // Save the updated user story
      await userStory1.save();
  
      res.status(200).json({ message: 'User story updated successfully', userStory1 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  };

  exports.getAllUserStories = async (req, res) => {
    try {
        const userStories = await userStory.find();
        res.status(200).json(userStories);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
  }
  exports.getUserStories = async (req, res) => {
    const { userName } = req.params;
    try {
        const userStories = await userStory.find({userName});
        res.status(200).json(userStories);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
  }
  