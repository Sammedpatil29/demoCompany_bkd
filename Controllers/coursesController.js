const Topics = require('../Models/course');
const mongoose = require('mongoose');

exports.getCourse = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
  try {
    const topic = await Topics.findById(id)
    res.status(200).json(topic);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addNewTopic = async (req, res) => {
    const {courseTitle, duration, modules} = req.body;
  try {
    const newTopic = new Topics({
        courseTitle,
        duration,
        modules
        });
     
        // Save the user to the database
        await newTopic.save();
     
        res.status(201).json({
          message: 'User created successfully!',
          user: newTopic,
        });
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
};