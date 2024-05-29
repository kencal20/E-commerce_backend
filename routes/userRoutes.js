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
            res.send({ error: error.message })
        }
    })

    router.put('/:id', async (req, res) => {
        const { id } = req.params
        const updates = req.body

        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                updates,
                { new: true, runValidators: true }
            )
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json({ message: 'User has been updated', updatedUser })
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message })
        }
    })


    return router
}