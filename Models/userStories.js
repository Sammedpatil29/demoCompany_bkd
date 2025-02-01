const mongoose = require('mongoose')

const userStoriesSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
      },
    createDate: {
        type: Date
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    closeDate: {
        type: Date
    },
    projectName: {
        type: String
    },
    moduleName: {
        type: String
    },
    userStoryId: {
        type: String
    }
})

module.exports = mongoose.model('userStories', userStoriesSchema);