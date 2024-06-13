const express = require('express');
const router = express.Router()
const Order = require('../schemas/orderSchema')

module.exports = function () {
    router.get('/', async (req, res) => {
        const orders = await Order.find();
        res.json({ message: 'Hello all orders', orders });
    });

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const order = await Order.findById(id);
            if (!order) {
                return res.json({ message: "The id Cannot be found" })
            }
            res.json({ messsage: "The result for the id inputed is ", order })
        } catch (error) {
            res.json({ error: error.message })
        }

    });

    router.post('/create', async (req, res) => {
        const { userId, products, totalAmount, status, orderDate } = req.body;
        const order = new Order({
            userId,
            products,
            totalAmount,
            status,
            orderDate
        });
        await order.save();
        res.json({ message: "Order has been successfuly made", order });
    });

    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { userId, products, totalAmount, status } = req.body;
    
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                id,
                { userId, products, totalAmount, status },
                { new: true ,runValidators:true} 
            );
            if (!updatedOrder) {
                return res.json({ message: "Order not found" });
            }
            res.json({ message: "Order has been successfully updated", updatedOrder });
        } catch (error) {
            res.json({ error: error.message });
        }
    });
    

    router.delete('/:id', async (req, res) => {
        const { id } = req.params
        try {
            const trimmedId = id.trim();
            const deletedOrder = await Order.findByIdAndDelete(trimmedId);
            if (!deletedOrder) {
                res.json({ message: "Id stated for order is invalid" });
            } else {
                res.json({ message: "Order has been deleted Successfully", deletedOrder });
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    })


    return router
}