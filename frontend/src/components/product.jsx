import React from 'react'
import {Card} from 'react-bootstrap' /* as we want our products to be shown in the form of cards */
import { Link } from 'react-router-dom'
import Rating from './rating'




const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
    <Link to={`/products/${product._id}`}>
    <Card.Img src={product.image} variant='top'/>
    </Link>

    <Card.Body>
    <Link to={`/products/${product._id}`}>
        <Card.Title as='div'>                                   {/* as div,h3 card can be any typle of element */}
        <strong>{product.name}</strong>
        </Card.Title>
    </Link>

    <Card.Text as='div'>
      <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
    </Card.Text>

    <Card.Text as='h3'>
    ${product.price}
    </Card.Text>
    </Card.Body>
    </Card>
  )
}

export default Product