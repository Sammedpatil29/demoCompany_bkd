const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String
    },
    duration: {
        type: String
    },
    modules: {
        type: Object
    }
});

module.exports = mongoose.model('Topics', courseSchema);