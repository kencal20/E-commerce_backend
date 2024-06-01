const express = require('express')
const router = express.Router()
const Category = require('../schemas/categorySchema')

module.exports = function () {
    router.get('/', async (req, res) => {
        const categories = await Category.find()
        res.json({ message: "List of Categories are ", categories })
    })


    return router
}
