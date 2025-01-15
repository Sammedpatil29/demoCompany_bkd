const mongoose = require('mongoose')

const metaDataSchema = new mongoose.Schema({
    joiningDate: {
        type: String
      }
})

module.exports = mongoose.model('metaData', metaDataSchema);