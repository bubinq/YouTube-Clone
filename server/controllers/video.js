import user from "../models/user.js";
import Video from "../models/video.js";

export const createVideo = async (req, res) => {
  try {
    const createdVideo = await Video.create({
      ownerId: req.user.id,
      ...req.body,
    });
    const saved = await createdVideo.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const searchVideo = async (req, res) => {
  const queryParam = req.body.search;
  try {
    const searchedVideo = await Video.find({
      title: { $regex: queryParam, $options: "i" },
    });
    console.log(searchedVideo);
    res.status(200).json(searchedVideo);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("No video");
  }
};

export const editVideo = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      req.params.Id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(video);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const deleteVideo = async (req, res) => {
  try {
    await Video.findOneAndDelete(req.params.Id);
    res.status(200).json("Video Deleted Successfully!");
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.Id);
    res.status(200).json(video);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const increaseViews = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      req.params.Id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.status(200).json(video);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const getRandomVideos = async (req, res) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 50 } }]);
    res.status(200).json(videos);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const getTrendingVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const getSubscribedVideos = async (req, res) => {
  try {
    const currentUser = await user.findById(req.user.id);
    const subscriptions = currentUser.subscribedChannels;

    const channels = await Promise.all(
      subscriptions.map((channels) => {
        return Video.find({ ownerId: channels });
      })
    );

    res.status(200).json(channels.flat());
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong!");
  }
};

export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      { _id: req.params.videoId },
      { $addToSet: { likes: req.user.id }, $pull: { dislikes: req.user.id } },
      { new: true }
    );
    res.status(200).json({ video, message: "Video liked!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      { _id: req.params.videoId },
      { $pull: { likes: req.user.id }, $addToSet: { dislikes: req.user.id } },
      { new: true }
    );
    res.status(200).json({ video, message: "Video disliked!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};
