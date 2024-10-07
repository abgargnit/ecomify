import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import Message from './message.jsx'
import { useGetTopProductsQuery } from '../slices/productsApislice.js'


const ProductCarousel = () => {
    const { data: products, error } = useGetTopProductsQuery();
    return error ? (
        <Message>{error}</Message>
    ) : (
        products && products.length > 0 && (
            <Carousel pause='hover' className='bg-primary mb-4'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <h2>{product.name} (${product.price})</h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    );
};

export default ProductCarousel