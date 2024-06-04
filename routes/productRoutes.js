const express = require('express')
const router = express.Router()
const Product = require('../schemas/productSchema')
const Category = require('../schemas/categorySchema')

module.exports = function () {

    router.post('/create', async (req, res) => {
        const { productName, description, price, category, stock, imageUrl } = req.body;


        if (!category) {
            return res.status(400).json({ message: "Category name is required" });
        }

        try {
            const foundCategory = await Category.findOne({ categoryName: category });


            if (!foundCategory) {
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


    router.get('/', async (req, res) => {
        try {
            const products = await Product.find().populate('category', 'categoryName')
            res.json({ message: "This is the list of Products", products })
        } catch (error) {
            res.json({ error: error.message })
        }
    })


    router.get('/:id', async (req, res) => {
        const { id } = req.params
        try {
            const product = await Product.findById(id).populate('category', 'categoryName')
            if (!product) {
                return res.json({ message: "The id Cannot be found" })
            }
            res.json({ messsage: "The result for the id inouted is ", product })
        } catch (error) {
            res.json({ error: error.message })
        }
    })




    router.put('/:id', async (req, res) => {
        const { id } = req.params
        const { productName, description, price, stock, imageUrl } = req.body

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id,
                { productName, description, price, stock, imageUrl }, { new: true, runValidators: true }
            ).populate('category', 'name')
            if (!updatedProduct) {
                return res.json({ message: "The id to be updated does not exist" })
            }
            res.json({ message: "Product has been Updated Sucessfully", updatedProduct })
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(500).json({ error: error.message });
        }
    });



    router.delete('/:id', async (req, res) => {

        const { id } = req.params
        try {
            const deletedProduct = await Product.findByIdAndDelete(id)
            if (!deletedProduct) {
                return res.json({ message: "Product id Cannot be found" })
            }

            res.json({ message: "Product has been deleted Successfully", deletedProduct })
        } catch (error) {
            res.json({ error: error.message })
        }
    })

    return router
}