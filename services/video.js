const { Video } = require("../models/video");
const ERROR = require("../types/error");

const shareVideo = (user, url) => {
    const newVideo = new Video({
        url,
        sharer: user.email
    });
    return newVideo.save();
};

const getVideos = async () => {
    const videos = await Video.aggregate()
        .limit(100)
        .sort({ createdAt: -1 })
        .exec();
    return videos;
};

module.exports = {
    shareVideo,
    getVideos
};