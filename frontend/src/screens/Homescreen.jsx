import React from 'react'
import {Row,Col} from 'react-bootstrap'
import { useEffect ,useState } from 'react'
import Product from '../components/product'
import axios from 'axios'

const Homescreen = () => {

    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
          };
          fetchProducts()

    },[]) // [] is dependency array empty means it will run for only once...



  return (
   <>
   <h1>Latest Products</h1>
   <Row>
    {
        products.map((products)=>(
            <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{products.name}</h3> */}
                <Product product={products}></Product>
            </Col>
        ))
    }
   </Row>
   </>
  )
}

export default Homescreen