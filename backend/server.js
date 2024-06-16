import express from 'express';
import productRoutes from './routes/productsRoutes.js';
import ConnectDB from './config/db.js';
import dotenv from 'dotenv';
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';


dotenv.config();
ConnectDB() // connect to database....

const port = process.env.PORT || 8000;
const app = express();


app.get('/',(req,res)=>{
    res.send("API is running...") // creating routes
});

app.use('/api/products',productRoutes);

app.use(notFound);
app.use(errorHandler);



app.listen(port,()=>{
    console.log(`Running on ${port}`)
}) //this will start the server