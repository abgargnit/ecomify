
// import dotenv from 'dotenv'
// import colors from 'colors'
// import user from "./data/users.js";
// import products from "./data/products.js";
// import User from "./models/userModel.js";
// import Product from './models/productsModel.js'
// import Order from "./models/orderModel.js";
// import ConnectDB from "./config/db.js";


// dotenv.config();
// ConnectDB()

// const importdata = async () =>{
//     try {
//             await Order.deleteMany(); // delete multiple records...
//             await Product.deleteMany();
//             await User.deleteMany();
//             const createdUsers = await User.insertMany(user)

//             const adminUser = createdUsers[0]._id;
//             const sampleProducts = products.map(()=>{
//                 return {...products,user:adminUser} // ... we are using spread operator here to add all the data.
//             })

//             await Product.insertMany(sampleProducts)
//             console.log(`Data Imported!` .green.inverse)
//             process.exit() // we dont want to kill it thus we are not passing 1 unlike dbconnection...

//     } catch (error) {
//         console.log(`${error}`.red.inverse)
//         process.exit(1) // Here we want to kill the process..
//     }
// }


// const destroyData = async () =>{
//     try {
//         await Order.deleteMany(); // delete multiple records...
//         await Product.deleteMany();
//         await User.deleteMany();

//         console.log(`Data deleted!` .green.inverse)
//         process.exit()
        
//     } catch (error) {
//         console.log(`${error}`.red.inverse)
//         process.exit(1) // Here we want to kill the process..
//     }
// }
// // import colors from "colors"
// //  console.log(`hey`.green.inverse) // will return the first two fields as address and last field as whatever i will write after , example hello it will output the first two lines as addrress and last as hello :: process.argv[2]
// if(process.argv[2] === '-d'){
//     destroyData();
// }
// else{
//     importdata();
// }
// // now we will create a script as we dont want to run it like node backend/seeder -d .... which will be created in packagejson

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productsModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
