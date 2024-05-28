const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send({ message: 'Welcome to users home', users })
})

module.exports = router