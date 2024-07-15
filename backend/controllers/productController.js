import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productsModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Resource not found');
});


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name:'Sample Name',
    price:0,
    user:req.user._id,
    image:'/images/sample.jpg',
    brand:'Sample Brand',
    category:'Sample Category',
    description:'Sample Description',
    numReviews:0,
    countInStock:1,
  })

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);

});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/admin
const updateProduct = asyncHandler(async (req, res) => {
      const {name,price,image,brand,category,description,countInStock} = req.body;
      const product = await Product.findById(req.params.id);
      if(product){
        product.name = name;
        product.price = price;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.description = description;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
      }
      else{
        res.status(404);
        throw new Error('Resource not found!');
      }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product){
   await Product.deleteOne({_id: product._id});
   res.status(200).json({message: 'Product removed!'});
  }
  else{
    res.status(404);
    throw new Error('Resource not found!');
  }
});


export { getProducts, getProductById, createProduct, updateProduct,deleteProduct};



