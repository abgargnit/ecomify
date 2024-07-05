import asyncHandler from '../middlewares/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc    Create new Order
// @route   POST /api/orders
// @access  Private
const addOrderitems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = req.body;
    if(!Order && !orderItems){
        res.status(400);
        throw new Error('No Order items');
    } else{
        const order = new Order({
            orderItems : orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id:undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }

});

// @desc    Get logged in users order
// @route   GET /api/orders/myorders
// @access  Private
const getMyorders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user : req.user._id});
    res.status(200).json(orders);
});

// @desc    Get Orders by id
// @route   GET /api/orders/:id
// @access  Private
const getorderbyid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user','name email');

    if(order){
        res.status(201).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found!');
    }


});

// @desc    Update order to be paid
// @route   PUT /api/orders/:id/paid
// @access  Private
const updateOrdertopaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid  = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body._id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }
    else{
        res.status(404);
        throw new Error('Order not found!');
    }


});

// @desc    Update to deleivered
// @route   PUT /api/orders/:id/delievered
// @access  Private/admin
const updateOrderstobedeleivered = asyncHandler(async (req, res) => {
    res.send('Delievered order');
});

// @desc    Get all orders
// @route   POST /api/orders
// @access  Private/admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('Get all orders');
});

export {
    getMyorders,
    getOrders,
    getorderbyid,
    updateOrderstobedeleivered,
    updateOrdertopaid,
    addOrderitems
}
