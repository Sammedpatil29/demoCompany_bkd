const mongoose = require('mongoose')

const leadsSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true
      },
      email: {
        type: String
      },
      contact: {
        type: String
      },
      comment: {
        type: String
      },
      isChecked: {
        type: Boolean
      }
})

module.exports = mongoose.model('Leads', leadsSchema);