import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User", // refrence..
    },
    name:{
        type: String,
        required: true,
    },
    Comment:{
        type: String,
        required: true,
    },
    rating:{
        type:Number,
        required:true,
    }
},{
    timestamps:true
})

const productSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User", // refrence..
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    reviews: [reviewSchema], // as review will be another type of schema thus will be declared later..
    rating:{
        type: Number,
        required: true,
        default:0,
    },
    numReviews:{
        type: Number,
        required: true,
        default:0,
    },
    price:{
        type: Number,
        required: true,
        default:0,
    },
    countinStock:{
        type: Number,
        required: true,
        default:0,
    },
},{
    timestamps:true // this will create the timestamps for products during thier formation...
})

const Product = mongoose.model("Product",productSchema);

export default Product;