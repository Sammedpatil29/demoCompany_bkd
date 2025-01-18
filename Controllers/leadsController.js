const User = require('../Models/leadGeneration');

exports.leadGenerate = async (req, res) => {
    const {username, email, contact} = req.body;

    if (!username || !email || !contact){
        return res.status(400).json({message : 'fill all the details'})
    }

    try {
        const newUser = new User({
              username,
              email,
              contact
            });
         
            // Save the user to the database
            await newUser.save();
         
            res.status(201).json({
              message: 'Lead created successfully!',
              user: newUser,
            });
          } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
          }
}

exports.getAllLeads = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateLeads = async (req,res) => {
  const {id, comment, isChecked} = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { comment, isChecked }, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}