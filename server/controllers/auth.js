import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = async(req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    try {
        if(req.body.repass !== req.body.password) {
            return res.status(400).json('Your passwords should match!')
        }
        const user = new User({...req.body, password: hash})
        const savedUser = await user.save()
        res.status(201).json(savedUser)

    } catch (error) {
        console.log(error.message);
        res.json('Meeeh')
    }
}

export const logIn = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json('User not found!')
        
        const isPasswordMatching = await bcrypt.compare(req.body.password, user.password) 

        if (!isPasswordMatching) return res.status(400).json('Incorrect Password!')

        const {password, ...details} = user._doc

        const token = jwt.sign({id: user._id}, process.env.JWT_KEY)
        res.cookie('accessToken', token, {httpOnly: true})
        res.status(200).json(details)
    } catch (error) {
        console.log(error.msg);
        res.status(400).json('Wrong Credentials!')
    }
}