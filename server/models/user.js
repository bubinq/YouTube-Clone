import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    img: {
        type: String
    },
    subscribedChannels: {
        type: [String],
        default: []
    },
    recommendedVideos: {
        type: [String],
        default: []
    },
}, {timestamps: true})

export default mongoose.model('User', userSchema)