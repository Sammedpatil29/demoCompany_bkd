const mongoose = require('mongoose')

const metaDataSchema = new mongoose.Schema({
    joiningDate: {
        type: Date
      }
})

module.exports = mongoose.model('metaData', metaDataSchema);