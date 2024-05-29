const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    stock: {
        type: Number
    },
    imageUrl: {
        type: String
    }
},
    {
        timestamps: true
    }
)

const Product = mongoose.model('products', productSchema)

module.exports = Product