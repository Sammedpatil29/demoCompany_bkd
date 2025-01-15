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