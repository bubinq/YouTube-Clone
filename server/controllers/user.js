import User from '../models/user.js'
import Video from '../models/video.js'

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message)
    }
}

export const getUser = async (req, res) => {
    try {
        const currUser = await User.findById(req.params.userId)
        res.status(200).json(currUser)
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message)
    }
}

export const updateUser = async (req, res) => {
    if (req.user.id !== req.params.userId) return res.status(403).json('You cannot update other people profiles')
    try {
        const currUser = await User.findOneAndUpdate({ _id: req.params.userId }, { ...req.body }, { new: true })
        res.status(201).json(currUser)
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message)
    }
}

export const deleteUser = async (req, res) => {
    if (req.user.id !== req.params.userId) return res.status(403).json('You cannot update other people profiles')
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('User deleted successfully!')
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message)
    }
}

export const subscribeToChannel = async (req, res) => {
    if (req.user.id === req.params.userId) return res.status(400).json('You are not allowed to subscribe to yourself')
    try {
        const channel = await User.findById(req.params.userId)
        if (!channel) return res.status(400).json('Channel does not exist')
        const currUser = await User.findByIdAndUpdate({ _id: req.user.id }, { $push: { subscribedChannels: channel._id } }, { new: true })
        res.status(200).json(currUser)
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message)
    }
}

