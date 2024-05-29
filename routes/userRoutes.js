const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')

module.exports = function () {
    router.get('/', async (req, res) => {
        const user = await User.find()
        res.json({ message: 'Hello all users', user })
    })

    router.post('/create', async (req, res) => {
        const { name, email, password, address, phone, role } = req.body
        try {
            const user = new User({
                name, email, password, address, phone, role
            })
            const newUser = await user.save()
            res.send({ message: 'New User Created', newUser })
        } catch (error) {
            const Error = error._message
            res.send({ message: Error })
        }
    })
    return router
}