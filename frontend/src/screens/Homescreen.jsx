import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/loader.jsx';
import Message from '../components/message.jsx';
import { useGetProductsQuery } from '../slices/productsApislice.js';
import Product from '../components/product';
import Paginate from '../components/Paginate.jsx';
import { FaBackward } from 'react-icons/fa';
import ProductCarousel from '../components/ProductCarousel.jsx';
import Meta from '../components/Meta.jsx';



const HomeScreen = () => {
  const {pageNumber, keyword} = useParams();
  const { data, isLoading, error } = useGetProductsQuery({keyword,pageNumber});

  return (
  <>
  {!keyword ? <ProductCarousel/> : <Link to='/' className='btn-btn-black mb-4' > <FaBackward/> </Link>}
  {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
        <Meta title='ecomify'/>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
          pages = {data.pages}
          page = {data.page}
          keyword={keyword ? keyword : ''}
          />
        </>
      )}
  </>
  )
}

export default HomeScreen