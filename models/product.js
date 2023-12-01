const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    isbm: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
