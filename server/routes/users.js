import express from "express"
const router = express.Router()
import { deleteUser, getAllUsers, getUser, subscribeToChannel, unSubscribeToChannel, updateUser } from "../controllers/user.js"
import { verifyToken } from '../verifyToken.js'

router.get('/', getAllUsers)
router.get('/users/:userId', getUser)
router.patch('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.patch('/sub/:userId', verifyToken, subscribeToChannel)
router.patch('/unsub/:userId', verifyToken, unSubscribeToChannel)
export default router