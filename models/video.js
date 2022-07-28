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

const Video = mongoose.model("Video", videoSchema);
module.exports = { Video, videoSchema };