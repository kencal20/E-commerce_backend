const express = require('express')
const router = express.Router()
const Product = require('../schemas/productSchema')
const Category = require('../schemas/categorySchema')
module.exports = function () {
    router.get('/', async (req, res) => {
        const products = await Product.find()
        res.json({ message: "This is the list of Products", products })
    })


 
    return router
}