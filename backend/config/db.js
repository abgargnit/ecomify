import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const ConnectDB = async() =>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
     // mongoose.connect will return the promise, thats why await is used here..
        console.log(`Mongodb connection is established`)
    } catch (error) {
        console.log('Error while connecting to mongodb')
        process.exit(1)
    }
}

export default ConnectDB;