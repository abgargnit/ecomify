import { useState,useEffect } from 'react';
import {Form,Button,Table, Row, Col} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import  {toast} from 'react-toastify'
import Message from '../components/message'
import Loader from '../components/loader'
import { useProfileMutation } from '../slices/userApiSlice';
import {setCredentials} from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/ordersapiSlice';
import {FaTimes} from 'react-icons/fa'


const ProfileScreen = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const {userInfo} = useSelector((state)=>state.auth);

    useEffect(() => {
      if(userInfo){
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    
    }, [userInfo,userInfo.name,userInfo.email])

    const[updateProfile,{isLoading:loadingUpdateProfile}] = useProfileMutation();

    const { data: orders,isLoading,error } = useGetMyOrdersQuery();

    const submitHandler = async (e)=>{
        e.preventDefault();
        if(password !== confirmpassword){
            toast.error('Password do not match');
        }
        else{
            try {
                const res = await updateProfile({_id:userInfo._id, name,email,password}).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile Updated Successfully!');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    
  return (
    <Row>
        <Col md={3}>
        <h2>{name} Profile</h2>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmpassword' className='my-2'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmpassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Button onClick={submitHandler} variant='primary' className='my-2'>
        Update
        </Button>
        { loadingUpdateProfile && <Loader/> }
        </Form>
        </Col>
        <Col md={9}>
        <h2>{name} Orders</h2>
        {isLoading ? <Loader/> : error ? (
            <Message variant='danger'>
            {error?.data?.message || error.error}
            </Message>
        ) : (
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { orders.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                               { order.isPaid ? (order.paidAt.substring(0,10)) : (
                                <FaTimes style={{color:'red'}}/>
                               )}
                            </td>
                            <td>
                               { order.isDelivered ? (order.deliveredAt.substring(0,10)) : (
                                <FaTimes style={{color:'red'}}/>
                               )}
                            </td>
                               <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                <Button className='btn-sm' variant='light'>
                                    Details
                                </Button>
                                </LinkContainer>
                               </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
        </Col>
    </Row>
  )
  
}

export default ProfileScreen