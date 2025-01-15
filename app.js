const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./Routes/userRoutes');
const leadRoutes = require('./Routes/leadsRouter');
const metaRoutes = require('./Routes/metaDataRoute');

const SECRET_KEY = "your_secret_key";

 
// Load environment variables
// dotenv.config();
 
const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());
 
// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://Sammed:Sudu12345@sammed.6vgbg.mongodb.net/demoCompany?retryWrites=true&w=majority&appName=Sammed', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));
 
// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/metaData', metaRoutes);
 
// Define the server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});