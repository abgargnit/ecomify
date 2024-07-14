import { useState,useEffect } from "react"
import { useNavigate,useParams,Link} from "react-router-dom"
import {Form,Button, FormLabel, FormControl} from 'react-bootstrap'
import {useDispatch,useSelector}from 'react-redux'
import Message from '../../components/message'
import Loader from '../../components/loader'
import FormContainer from '../../components/formContainer'
import { toast } from 'react-toastify'
import {useUpdateProductMutation,useGetProductDetailsQuery,useUploadProductImageMutation} from '../../slices/productsApislice'
 

const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const [name,setName] = useState('');
    const [price,setPrice]  = useState(0);
    const [image,setImage] = useState('');
    const [brand,setBrand] = useState('');
    const [category,setCategory] = useState('');
    const [countInStock,setCountInStock] = useState(0);
    const [description,setDesription] = useState('');

    const {data:product,isLoading,refetch,error} = useGetProductDetailsQuery(productId);
    const [updateProduct,{isLoading:loadingUpdate}] = useUpdateProductMutation();
    const [uploadProductImage,{isLoading:loadingUpload}] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDesription(product.description);
        }
    
    }, [product])

    const submitHandler = async (e)=>{
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }
        const result = await updateProduct(updatedProduct);
        if(result.error){
            toast.error(result.error);
        }
        else{
            toast.success('Successfully upadated!');
            navigate('/admin/productlist')
        }
    }

    const uploadFilehandler = async (e) => {
        const formData = new FormData()
        formData.append('image',e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }
    


  return <>
    <Link to='/admin/productlist' className="btn btn-light my-3">
    Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}
        {isLoading ? <Loader/> : error ? <Message>{error}</Message> : (
            <Form onSubmit={ submitHandler }>
                <Form.Group controlId="name">
                    <FormLabel>Name</FormLabel>
                    <Form.Control
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="price" className="my-2">
                    <FormLabel>Price</FormLabel>
                    <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                {/* {Input Image Placeholder} */}
                <Form.Group controlId="image" className="my-2">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e)=>setImage}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="brand" className="my-2">
                    <FormLabel>Brand</FormLabel>
                    <Form.Control
                    type="text"
                    placeholder="Enter Brand"
                    value={brand}
                    onChange={(e)=>setBrand(e.target.value)}>
                    </Form.Control>
                    <Form.Control type="file" label='Choose file' onChange={uploadFilehandler}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="countInStock" className="my-2">
                    <FormLabel>Count In Stock</FormLabel>
                    <Form.Control
                    type="number"
                    placeholder="Enter Stock Count"
                    value={countInStock}
                    onChange={(e)=>setCountInStock(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="category" className="my-2">
                    <FormLabel>Category</FormLabel>
                    <Form.Control
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="description" className="my-2">
                    <FormLabel>Description</FormLabel>
                    <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e)=>setDesription(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="my-2">
                    Update
                </Button>
            </Form>
        ) }
    </FormContainer>
    </>
  
}

export default ProductEditScreen