import express from 'express';
import {
    getMyorders,
    getOrders,
    getorderbyid,
    updateOrderstobedeleivered,
    updateOrdertopaid,
    addOrderitems
} from '../controllers/orderController.js';
import {Protect,admin} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route('/').post(Protect,addOrderitems).get(Protect, admin, getOrders); // admin
router.route('/mine').get(Protect,getMyorders);
router.route('/:id').get(Protect,getorderbyid); 
router.route('/:id/pay').put(Protect,updateOrdertopaid);
router.route('/:id/deliver').put(Protect,admin,updateOrderstobedeleivered); // admin



export default router;