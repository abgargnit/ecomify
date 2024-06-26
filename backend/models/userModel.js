import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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

userSchema.methods.matchPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}


const User = mongoose.model("User", userSchema);

export default User;


// jwt is used for authentication
// json web tokens
// header payload and signature..