const User = require('../Models/user');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
 
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, contact, password, package, amountPaid, selectedCourse } = req.body;
 
    // Ensure all mandatory fields are present
    if (!username || !email || !contact) {
      return res.status(400).json({ message: 'Username, email, and contact are required!' });
    }
 
    // Create a new user object
    const newUser = new User({
      username,
      email,
      contact,
      password: contact, // Use contact as the password
      package,
      amountPaid,
      selectedCourse,
    });
 
    // Save the user to the database
    await newUser.save();
 
    res.status(201).json({
      message: 'User created successfully!',
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
 
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUser = async (req, res) => {
  const username = req.body.username;
  try {
    const user = await User.findOne({ username: username });
  
    if (!user) {
      // If no user is found, return a 404 or other appropriate response
      return res.status(404).json({ message: "User not found" });
    }
  
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
   
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
   
    // const isPasswordValid = await compare(password, user.password);
    if (password != user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
   
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, role: user.role });
}

exports.protected = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });
   
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
   
      res.json({ message: "Access granted", user: decoded });
    });
}