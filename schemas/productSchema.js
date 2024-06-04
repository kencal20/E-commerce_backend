const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: { type: String },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imageUrl: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('products', productSchema);


