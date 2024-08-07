import path from 'path'
import express from 'express';
import productRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import ConnectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();
ConnectDB() // connect to database....

const port = process.env.PORT || 8000;
const app = express();

// Body parser middlewware...

app.use(express.json());
app.use(express.urlencoded({extended: true }));

// cookie parser middleware 
app.use(cookieParser());



app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.get('/api/config/paypal',(req,res)=>res.send({clientId: process.env.PAYPAL_CLIENT_ID}))
app.use('/api/upload',uploadRoutes);



const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,`/frontend/build`)));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
} 
else{
    app.get('/',(req,res)=>{
        res.send("API is running...") // creating routes
    });
}

app.use(notFound);
app.use(errorHandler);



app.listen(port,()=>{
    console.log(`Running on ${port}`)
}) //this will start the server