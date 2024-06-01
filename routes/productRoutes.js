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
        const { productName, description, price, category, stock, imageUrl } = req.body;
        console.log('Request body:', req.body);
    
        if (!category) {
            return res.status(400).json({ message: "Category name is required" });
        }
    
        try {
            const foundCategory = await Category.findOne({ name: category });
    
            if (!foundCategory) {
                console.log(`Category ${category} cannot be found`);
                return res.status(404).json({ message: `Category ${category} cannot be found` });
            }
    
            const product = new Product({
                productName,
                description,
                price,
                category: foundCategory._id,
                stock,
                imageUrl
            });
    
            const newProduct = await product.save();
            res.status(201).json({ message: "New Product Created", newProduct });
    
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    });
    

    return router
}