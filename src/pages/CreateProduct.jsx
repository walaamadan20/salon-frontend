
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { createProduct } from '../services/productService'

function CreateProduct0() {
    const [formData,setFormData] = useState({
        name: "",
        price: 1.00,
        description: "",
        stock:0,
        image: null
    })

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            const token = localStorage.getItem("token")

            const createProduct0 = await createProduct(formData)
    
            navigate("/")

        } 
        catch(err){
            console.log(er)
        }
      
    }

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

  return (
    <div>
      <h1>Create Product</h1>

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

        <label htmlFor="image">Image</label>
        <input type="file"
         name="image"
          accept="image/*" 
          onChange={handleChange} />
        
        <button>Submit</button>
      </form>
    </div>
  )}


export default CreateProduct0
