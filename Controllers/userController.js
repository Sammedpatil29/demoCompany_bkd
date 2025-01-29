const User = require('../Models/user');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services (e.g., Outlook, SendGrid, etc.)
  auth: {
    user: 'democompany2025@gmail.com', // Your email address
    pass: 'nlpf fgrs jpvv jgbx',  // Your email password or App Password (if using Gmail with 2FA enabled)
  },
});


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY); // Replace with your secret key
    req.user = decoded;  // Attach the decoded user data to the request object
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

exports.updatePassword = async (req, res) => {
  const { email , password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    // Find the user based on the data in the token (assuming the token contains the user's email or username)
    const user = await User.findOne({email});  // Assuming `id` is stored in the JWT payload

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

 
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, contact, password, package, amountPaid, selectedCourse, joiningDate, expiryDate, role, promoCode } = req.body;
 
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
      joiningDate, expiryDate, role, promoCode
    });
 
    // Save the user to the database
    await newUser.save();

    const mailOptions = {
      from: 'democompany2025@gmail.com', // Sender email
  to: email,                      // Receiver email (this will come from the user input)
  subject: "Welcome to demoCompany",            // Subject line
  html: `
    <html>
      <body>
        <h2>Welcome to Our Platform!</h2>
        <p>Dear ${username},</p>
        <p>Thank you for registering with us. Your account has been created successfully.</p>
        <p><strong>Your Login Details:</strong></p>
        <table style="border: 1px solid #ccc; padding: 10px; width: 100%; max-width: 400px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold; background-color: #f4f4f4;">Username:</td>
            <td style="padding: 8px;">${username}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; background-color: #f4f4f4;">Password:</td>
            <td style="padding: 8px;">${password}</td>
          </tr>
        </table>
        <p style="background-color:rgb(231, 211, 27)">Joining Letter is generated in the website. or else you can download it in your Dashboard</p>
        <p>Please keep your login details secure. If you did not register with us, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Team, <b>demoCompany</b></p>
      </body>
    </html>
  `,                  // Email body text
    };
 
    res.status(201).json({
      message: 'User created successfully!',
      user: newUser,
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ' + error.message);
      } else {
        console.log('Email sent successfully: ' + info.response);
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.userCheck = async (req, res) => {
  try {
    const { username, email, contact} = req.body;
 
    // Ensure all mandatory fields are present
    if (!username || !email || !contact) {
      return res.status(400).json({ message: 'Username, email, and contact are required!' });
    }

    const emailCheck = await User.findOne({ email: req.body.email });
    const contactCheck = await User.findOne({ contact: req.body.contact });

if(emailCheck || contactCheck){
  res.status(201).json({
    message: 'duplicate values'
  })
} else {
  res.json({
    message: 'User validation done'
  })
}
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
  const username = req.params.username;
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
    const { email, password } = req.body;
   
    const user = await User.findOne({ email });
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

exports.updateUser = async (req, res) => {
  const { userId } = req.params;  // Assuming you're passing the user ID in the URL
  const updateFields = req.body;  // The fields to update, coming from the request body
  
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only the fields that are present in the request body
    Object.keys(updateFields).forEach(key => {
      if (updateFields[key]) {
        user[key] = updateFields[key];  // Update the user's field with the new value
      }
    });

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};