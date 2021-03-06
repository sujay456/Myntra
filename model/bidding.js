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
    },
    start_time:{
        type:String,
        required:true
    },
    end_time:{
        type:String,
        required:true
    },
    closed:{
        type:Boolean,
        required:true
    }
})

const bidding=mongoose.model('Bidding',BiddingSchema);

module.exports=bidding;