const User = require('../Models/metaData');

exports.createMetaData = async (req, res) => {
    const {joiningDate} = req.body;

    if (!joiningDate){
        return res.status(400).json({message : 'fill all the details'})
    }

    try {
        const metaData = new User({
            joiningDate
        });
         
            // Save the user to the database
            await metaData.save();
         
            res.status(201).json({
              message: 'Updated successfully!',
              user: metaData,
            });
          } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
          }
}

exports.getMetaData = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateMetaData = async (req, res) => {
  const { joiningDate, id } = req.body;

  // Check if joiningDate is provided
  if (!joiningDate) {
    return res.status(400).send('Joining date is empty');
  }

  try {
    // Find the user by id
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).send('Meta data not found');
    }

    // Update the joiningDate or any other field
    user.joiningDate = joiningDate;

    // Save the updated user data
    await user.save();

    // Return the updated user or a success message
    res.status(200).send('User metadata updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
