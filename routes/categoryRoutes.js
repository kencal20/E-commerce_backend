const express = require('express')
const router = express.Router()
const Category = require('../schemas/categorySchema')

module.exports = function () {
    
    router.post('/create', async (req, res) => {
        const { categoryName } = req.body
        try {
            const category = new Category({
                categoryName
            })

            const newCategory = await category.save()
            res.json({ message: "New Category Saved", newCategory })
        } catch (error) {
            res.json({ error: error.message })
        }
    })


    router.get('/', async (req, res) => {
        const categories = await Category.find()
        res.json({ message: "List of Categories are ", categories })
    })

    router.get('/:id', async (req, res) => {
        const { id } = req.params
        try {
            const category = await Category.findById(id)
            if (!category) {
                return res.json({ message: "Category id Did not match" })
            }
            res.json({ message: "Category info is the following ", category })
        } catch (error) {
            res.json({ error: error.message })
        }
    })


    router.put('/:id', async (req, res) => {
        const { id } = req.params
        try {
            const { categoryName } = req.body
            const updatedCategory = await Category.findByIdAndUpdate(
                id, { categoryName }, { new: true, runValidators: true })

            if (!updatedCategory) {
                return res.json({ message: "Category to Update Failed" })
            }

            res.json({ message: "Category Updated successfully", updatedCategory })
        } catch (error) {
            res.json({ error: error.message })
        }
    })

    return router
}
