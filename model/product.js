const mongoose = require('mongoose');

const ProducSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating:
    {
        type: Number,
        required: true
    },
    Desc:
    {
        type: String
    },
    image:
    {
        typr: String
    }
},
    {
        timestamps: true
    });

const product = mongoose.model("Product", ProducSchema);

module.exports = product;