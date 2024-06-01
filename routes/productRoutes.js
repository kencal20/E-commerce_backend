const express = require('express')
const router = express.Router()
const Product = require('../schemas/productSchema')
const Category = require('../schemas/categorySchema')

module.exports = function () {
    router.get('/', async (req, res) => {
        const products = await Product.find()
        res.json({ message: "This is the list of Products", products })
    })

    router.get('/:id', async (req, res) => {
        const { id } = req.params
        try {
            const product = await Product.findById(id)
            if (!product) {
                return res.json({ message: "The id Cannot be found" })
            }
            res.json({ messsage: "The result for the id inouted is ", product })
        } catch (error) {
            res.json({error:error.message})
        }
    })
    router.post('/create', async (req, res) => {
        const { productName, description, price, categoryName, stock, imageUrl } = req.body
        try {
            const category = await Category.findOne({ categoryName })

            console.log('Request body:', req.body);
            if (!category) {
                console.log(`Category ${category} cannot be found`);
                return res.json({ message: `Category ${category} cannot be found` })
            }

            const product = new Product({
                productName,
                description,
                price,
                category: category._id,
                stock,
                imageUrl
            })

            const newProduct = await product.save()
            res.json({ message: "New Product Created", newProduct })

        } catch (error) {
            res.json({ error: error.message })

        }
    })

    return router
}