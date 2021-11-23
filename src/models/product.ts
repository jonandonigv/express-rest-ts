import mongoose, { mongo, SchemaTypes } from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please include the product name']
    },
    price: {
        type: Number,
        required: [true, 'Please include the product prize']
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;