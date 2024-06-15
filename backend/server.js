import express from 'express';
import products from './data/products.js'
import ConnectDB from './config/db.js';
import dotenv from 'dotenv';


dotenv.config();
ConnectDB() // connect to database....

const port = process.env.PORT || 8000;
const app = express();


app.get('/',(req,res)=>{
    res.send("API is running...") // creating routes
})

//creating routes for all products...

app.get('/api/products',(req,res)=>{
    res.send(products);
})

//creating routes for specific product... as inside products.js, products are stored in the form of array.

app.get('/api/products/:id',(req,res)=>{
    const product = products.find((p)=> p._id === req.params.id);
    res.send(product);
})

app.listen(port,()=>{
    console.log(`Running on ${port}`)
}) //this will start the server