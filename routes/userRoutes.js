const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');

module.exports = function (admin) {
    (async () => {
        try {
            const count = await User.countDocuments().exec();

            // If no users exist, create a default user
            if (count === 0) {
                console.log('Creating default user...');
                const defaultUserData = {
                    email: process.env.DEFAULT_USER_EMAIL,
                    password: process.env.DEFAULT_USER_PASSWORD,
                    name: process.env.DEFAULT_USER_NAME,
                    age: process.env.DEFAULT_USER_AGE,
                    userType: process.env.DEFAULT_USER_TYPE,
                    birthdate: process.env.DEFAULT_USER_BIRTHDATE, // Include birthdate
                    target: process.env.DEFAULT_USER_TARGET // Include target
                };

                // Create user in Firebase
                const userRecord = await admin.auth().createUser({
                    email: defaultUserData.email,
                    password: defaultUserData.password,
                    emailVerified: false,
                    disabled: false
                });

                // Save user data in MongoDB
                const newUser = new User(defaultUserData);
                await newUser.save();

                console.log('Default user created successfully.');
            }
        } catch (error) {
            console.error('Error checking user count:', error);
        }
    })()
    router.get('/', async (req, res) => {
        const users = await User.find();
        res.json({ message: 'Hello all users', users });
    });

    router.get('/:email', async (req, res) => {
        const { email } = req.params;
        try {
            const user = await User.findOne({ email });
            res.json({ message: 'The user you are searching for is ', user });
        } catch (error) {
            res.send({ error: error.message });
        }
    });

    router.post('/create', async (req, res) => {
        const { name, email, password, address, phone, role } = req.body;
        try {
            const firebaseUser = await admin.auth().createUser({
                email,
                password
            });

            const user = new User({
                name,
                email,
                address,
                phone,
                role,
                firebaseUid: firebaseUser.uid
            });
            const newUser = await user.save();
            res.send({ message: 'New User Created', newUser });
        } catch (error) {
            res.send({ error: error.message });
        }
    });

    router.put('/:email', async (req, res) => {
        const { email } = req.params;
        const { name, password, address, phone, role } = req.body;
        try {


            const updatedUser = await User.findOneAndUpdate(
                { email },
                { name, address, phone, role },
                { new: true, runValidators: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            // If password is provided, update it in Firebase
            if (password) {
                const userRecord = await admin.auth().getUserByEmail(email);
                const uid = userRecord.uid;

                // Update the user's password using their UID
                await admin.auth().updateUser(uid, { password });
            }

            // Update other user details in MongoDB

            res.json({ message: 'User has been updated', updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    });

    router.delete('/:email', async (req, res) => {
        const { email } = req.params;
        try {
            const deleteUser = await User.findOneAndDelete({ email });

            if (!deleteUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            const userRecord = await admin.auth().getUserByEmail(email);
            await admin.auth().deleteUser(userRecord.uid);
            res.json({ message: 'User deleted successfully', deleteUser });
        } catch (error) {
            res.json({ message: 'Error deleting user', error: error.message });
        }
    });

    return router;
};
