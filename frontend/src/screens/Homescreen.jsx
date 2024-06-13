import React from 'react'
import {Row,Col} from 'react-bootstrap'
import products from '../products'
import Product from '../components/product'





const Homescreen = () => {
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