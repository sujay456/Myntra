const mongoose = require('mongoose'); 

const BiddingSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    bidding_time:{
        type:Number,
        required:true
    },
    base_bid:{
        type:Number,
        required:true,
    },
    curr_max_bid:{
        type:Number,
    },
    curr_winning_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const bidding=mongoose.model('Bidding',BiddingSchema);

module.exports=bidding;