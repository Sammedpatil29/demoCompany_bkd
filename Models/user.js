const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  package: {
    type: String,
    enum: ['3', '7'],
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
  },
  role: {
    type: String,
  },
  selectedCourse: {
    type: String,
    enum: ['design', 'frontend', 'backend', 'MEAN'],
  }
});
 
// Middleware to calculate expiry date
// userSchema.pre('save', function(next) {
//   if (this.isNew) {
//     const joiningDate = this.joiningDate;
//     const packageDuration = this.package === '3' ? 3 : 7; // 3 or 7 months package
//     const expiryDate = new Date(joiningDate.setMonth(joiningDate.getMonth() + packageDuration));
//     this.expiryDate = expiryDate;
//   }
//   next();
// });
 
module.exports = mongoose.model('User', userSchema);