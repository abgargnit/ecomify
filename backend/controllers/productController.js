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

export { getProducts, getProductById, createProduct };



