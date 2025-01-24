const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
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
    type: Date
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
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  github: {
    type: String,
  },
  selectedCourse: {
    type: String,
    enum: ['design', 'frontend', 'backend', 'MEAN'],
  },
  promocode: {
    type: String
  },

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