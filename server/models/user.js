import mongoose, { Schema } from "mongoose";

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
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedChannels: {
        type: [String],
        default: []
    },
    recommendedVideos: {
        type: mongoose.Schema.Types.Mixed
    },
}, {timestamps: true})

export default mongoose.model('User', userSchema)