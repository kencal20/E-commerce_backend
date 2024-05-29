const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')

module.exports =  function () {
    router.get('/',async (req, res) => {
        const user = await User.find()
        res.json({ message: 'Hello all users', user })
    })

    return router
}