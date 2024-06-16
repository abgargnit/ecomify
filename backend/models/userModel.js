import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,  // thus to make any user admin, we have to go to database and change this value...
    },

},{
    timestamps:true
})

const User = mongoose.model("User", userSchema);

export default User;