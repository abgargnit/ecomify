import { LinkContainer } from "react-router-bootstrap"
import { Table,Button,Row,Col } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useParams } from "react-router-dom"
import Message from "../../components/message"
import Loader from "../../components/loader"
import { useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation } from "../../slices/productsApislice"
import {toast} from 'react-toastify'
import Paginate from "../../components/Paginate"


const ProductListScreen = () => {
    const {pageNumber} = useParams();
    const { data, isLoading, error,refetch } = useGetProductsQuery({pageNumber});
    const [createProduct, { isLoading:loadingCreate }] = useCreateProductMutation();
    const [deleteProduct,{ isLoading:loadingDelete}] = useDeleteProductMutation();

    const createProductHandler = async ()=>{
        if(window.confirm('Sure,you want to create a product ?')){
            try {
                await createProduct();
                refetch();
                toast.success('Product created!');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    const deleteHandler = async (id)=>{
        if(window.confirm('Are you sure, this will remove the item')){
            try {
                await deleteProduct(id);
                refetch();
                toast.success('Product deleted!');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

  return <>
    <Row className="align-items-center">
        <Col>
        <h1>Products</h1>
        </Col>
        <Col className="text-end">
        <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit/> Create Product
        </Button>
        </Col>
    </Row>
    {loadingCreate && <Loader/>}
    {loadingDelete && <Loader/>}
    {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <>
            <Table striped hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.products.map((product)=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button  variant="light" className="btn-sm mx-2">
                                    <FaEdit/>
                                </Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm"
                                onClick={()=>deleteHandler(product._id)}>
                                    <FaTrash/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate
          pages = {data.pages}
          page = {data.page}
          isAdmin={true}
          />
            </>
    )}
    </>
  
}

export default ProductListScreen