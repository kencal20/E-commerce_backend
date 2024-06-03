const express = require('express');
const router = express.Router()
const Order = require('../schemas/orderSchema')

module.exports = function(){
    router.get('/', async (req, res) => {
        const orders = await Order.find();
        res.json({ message: 'List of Orders', orders });
        
    });

    return router;
}