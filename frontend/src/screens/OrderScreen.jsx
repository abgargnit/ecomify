import { useEffect } from 'react';
import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Button,Card} from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import Message from '../components/message'
import { useSelector } from 'react-redux';
import Loader from '../components/loader'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery , useUpdateOrderMutation} from '../slices/ordersapiSlice';

export const OrderScreen = () => {
    const {id:orderId} = useParams();
    const {data: order,refetch,isLoading, error} = useGetOrderDetailsQuery(orderId);

    const [payOrder,{ isLoading : loadingPay }] = usePayOrderMutation();

    const [deliverOrder,{isLoading: loadingDeliver}] = useUpdateOrderMutation();

    const [{isPending},paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal , isLoading:loadingpaypal,error:errorpaypal } = useGetPayPalClientIdQuery();

    const userInfo = useSelector((state)=>state.auth.userInfo);

    useEffect(() => {
        if(!errorpaypal && !loadingpaypal && paypal.clientId){
            const loadpaypalscript = async() =>{
                paypalDispatch({
                    type: 'resetOptions',
                    value:{
                        'clientId': paypal.clientId,
                        currency: 'USD',
                    }
                });
                paypalDispatch({type: 'setLoadingStatus', value: 'pending'});
            }
            if(order && !order.isPaid) {
                if(!window.paypal){
                    loadpaypalscript();
                }
            }
        }

    

    }, [order,paypal,paypalDispatch,loadingpaypal,errorpaypal]);


    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
          try {
            await payOrder({ orderId, details });
            refetch();
            toast.success('Order is paid');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        });
      }

//   async function onApproveTest() {
//     await payOrder({ orderId, details: { payer: {} } });
//     refetch();

//     toast.success('Order is paid');
//   }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverOrderHandler = async () =>{
    try {
        await deliverOrder(orderId);
        refetch();
        toast.success('Order Delivered !');
    } catch (err) {
        toast.error(err?.data?.message || err.message)
    }
  }


    
    
    return isLoading ? <Loader/> : error ? <Message variant='danger' /> : 
    (<>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>
                            Name:
                        </strong>
                        {order.user.name}
                    </p>
                    <p>
                        <strong>
                            Email:
                        </strong>
                        {order.user.email}
                    </p>
                    <p>
                        <strong>
                            Address:
                        </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalcode}, {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                        <Message variant='success'>
                            Delivered on {order.deliveredAt}
                            </Message>
                    ) : (<Message variant='danger'>
                        Not delivered
                    </Message>)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>
                            Payment Method: 
                        </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <Message variant='success'>
                            Paid at {order.paidAt}
                            </Message>
                    ) : (<Message variant='danger'>
                        Not Paid
                    </Message>)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    { order.orderItems.map((item,index)=>(
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col>
                                <Link to={`/products/${item.product}`}>
                                {item.name}
                                </Link>
                                </Col>
                                <Col md={4}>
                                {item.qty} x {item.price} = ${item.qty * item.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup.Item>
            </ListGroup>
            </Col>
            <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Items
                            </Col>
                            <Col>
                            ${order.itemsPrice}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Shipping
                            </Col>
                            <Col>
                            ${order.shippingPrice}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Tax
                            </Col>
                            <Col>
                            ${order.taxPrice}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            Total
                            </Col>
                            <Col>
                            ${order.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {/* Pay Order Placeholder */}
                    {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        style={{ marginBottom: '10px' }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button> */}

                      <div>
                    <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}>
                    </PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
                    {/* Mark as delivered */}
                    {loadingDeliver && <Loader/>}
                    {userInfo &&  userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>
                                Mark as Delivered
                            </Button>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
            </Col>
        </Row>

    </>)
}

