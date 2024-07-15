import express from 'express'
import { getProductById, getProducts, createProduct,updateProduct,deleteProduct} from '../controllers/productController.js';
import { Protect,admin} from '../middlewares/authMiddleware.js'


const router  = express.Router()

//creating routes for all products...

router.route('/').get(getProducts).post(Protect,admin,createProduct);
router.route('/:id').get(getProductById).put(Protect,admin,updateProduct).delete(Protect,admin,deleteProduct);

export default router