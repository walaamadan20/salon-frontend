import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router'
import { createProduct } from '../service/productService'

function UpdateProduct() {
    const [formData,setFormData] = useState({
        name: "",
        price: 1.00,
        description: "",
        stock:0
    })
    const navigate = useNavigate()
    const {productId} = useParams()

    function handleChange(e){
    
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()

        try{
            const token = localStorage.getItem("token")

            const createdProduct = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/product/${productId}`,formData,{headers:{Authorization:`Bearer ${token}`}})
    
            navigate("/")

        }
        catch(err){
            console.log(err)
        }
    
    }

    async function getProduct(){
        console.log("GET product")
        const token = localStorage.getItem("token")

        const foundProduct = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${productId}`,{headers:{Authorization:`Bearer ${token}`}})
        setFormData(foundProduct.data)
    }

    useEffect(()=>{
        getProduct()
        // getHoot()
    },[])

    return (
        <div>
          <h1>Edit Product</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input 
            type="text" 
            name='name'
            id='name'
            value={formData.name}
            onChange={handleChange}
            />
    
            <label htmlFor="description">Description:</label>
            <textarea
            name='description'
            id='description'
            value={formData.description}
            onChange={handleChange}
            required
            >
                
            </textarea>


            <label htmlFor="price">Price</label>
            <input 
            type="decimle" 
            name='price'
            id='price'
            value={formData.price}
            onChange={handleChange}
            />

            <label htmlFor="stock">Stock</label>
            <input type="number"
                    id='stock'
                    name='stock' 
                    value={formData.stock}
                    onChange={handleChange}
                    min={0}
                    />
            
            <button>Submit</button>
            </form>
          </div>
    )

          

}

export default UpdateProduct


