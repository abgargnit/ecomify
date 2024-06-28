import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import dotenv from 'dotenv';


// we will create protected routes and admin routes here
dotenv.config();
const Protect = asyncHandler(async (req,res,next)=>{
    let token;

    // now we will read the jwt from cookie;
    token = req.cookies.jwt; // its cookies not cookie***
    
    if(token){
            try {
                const decoded = jwt.verify(token,process.env.SECRET_KEY); // this is for verification of jwt token
                req.user = await User.findById(decoded.userId).select('-password');
                next();
            } catch (error) {
                console.log(error);
                res.status(401);
                throw new Error('Not authorised,token failed');
            }
    }else{
        res.status(401);
        throw new Error('Not authorised, no token');
    }
}) 


// Admin middleware

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error('Not authorised as admin');
    }
}

export {Protect,admin};
