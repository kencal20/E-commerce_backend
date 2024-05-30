const express = require('express')
const router = express.Router()
const Product = require('../schemas/productSchema')

module.exports = function () {
    router.get('/', (req, res) => {
        res.send({ message: "Welcome to products" })
    })

    return router
}