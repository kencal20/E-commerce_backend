const express = require('express')
const router = express.Router()
const Category = require('../schemas/categorySchema')

module.exports = function () {
    router.get('/', async (req, res) => {
        const categories = await Category.find()
        res.json({ message: "List of Categories are ", categories })
    })


    router.post('/create', async (req, res) => {
        const { name } = req.body
        try {
            const category = new Category({
                name
            })

            const newCategory = await category.save()
            res.json({ message: "New Category Saved", newCategory })
        } catch (error) {
            res.json({ error: error.message })
        }
    })
    return router
}
