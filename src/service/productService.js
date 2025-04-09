import axios from "axios";

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/product`;
  
  const api = axios.create({
      baseURL: BASE_URL 
  });
  
  api.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  });
  
  const getAllProducts = async () => {
      try {
          const res = await api.get('/'); 
          console.log('res', res.data);
          return res.data;
      } catch (error) {
          console.log('Error fetching data:', error);
      }
  };


    
  const getOneProduct = async (id) => {
    try {
        const res = await api.get(`/${id}`); 
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

async function deleteProduct(id){
    try{
        const res = await api.delete(`/${id}`)
        return res.data
    }catch(err){
        console.log(err)
    }
}

async function createProduct(formData){
    try{
        const res = await api.post(`/new`,formData)
        return res.data
    }catch(err){
        console.log(err)
    }
}

  


  export { 
    getAllProducts,
    getOneProduct,
    deleteProduct,
    createProduct
  };