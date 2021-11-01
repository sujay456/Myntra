const mongoose = require('mongoose'); 

const CartSchema = new mongoose.Schema({
   
    productId: {
        type: String,
        required: true
    },name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
},
    {
        timestamps: true
    });

const cart = mongoose.model("Cart", CartSchema);

module.exports = cart;