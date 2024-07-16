import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../components/loader.jsx';
import Message from '../components/message.jsx';
import { useGetProductsQuery } from '../slices/productsApislice.js';
import Product from '../components/product';
import Paginate from '../components/Paginate.jsx';



const HomeScreen = () => {
  const {pageNumber=1} = useParams();
  const { data, isLoading, error } = useGetProductsQuery({pageNumber});

  return (
  <>
  {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
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
          />
        </>
      )}
  </>
  )
}

export default HomeScreen