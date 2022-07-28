const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    url: {
        required: true,
        type: String
    },
    sharer: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Video', videoSchema)