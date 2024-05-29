const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')

module.exports = function (admin) {
    router.get('/', async (req, res) => {
        const user = await User.find()
        res.json({ message: 'Hello all users', user })
    })
    router.get('/:id', async (req, res) => {
        const { id } = req.params
        try {
            const user = await User.findById(id)
            res.json({ message: 'The user You are searching for is ', user })

        } catch (error) {
            res.send({ error: error.message })
        }

    })

    router.post('/create', async (req, res) => {
        const { name, email, password, address, phone, role } = req.body
        try {
            const firebaseUser = admin.auth().createUser({
                email,
                password
            })

            const user = new User({
                name,
                email,
                password,
                address,
                phone,
                role,
                firebaseUid: firebaseUser.uid
            })
            const newUser = await user.save()
            res.send({ message: 'New User Created', newUser })
        } catch (error) {
            res.send({ error: error.message })
        }
    })

    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { name, email, password, address, phone, role } = req.body;
        try {
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // If password is provided, update it in Firebase
            if (password) {
                await admin.auth().updateUser(user.firebaseUid, { password });
            }

            // Update other user details in MongoDB
            const updates = { name, email, address, phone, role };
            const updatedUser = await User.findByIdAndUpdate(
                id,
                updates,
                { new: true, runValidators: true }
            );

            res.json({ message: 'User has been updated', updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    });




    router.delete('/delete/:id', async (req, res) => {
        const { id } = req.params
        try {
            const deletedUser = await User.findByIdAndDelete(id)
            res.send({ message: "User has been deleted", deletedUser })
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message })
        }
    })

    return router
}