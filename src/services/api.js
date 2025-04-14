import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/services`;
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

const getAllServices = async () => {
    try {
      const response = await api.get('/services');
      console.log('Services data:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error.response?.data || error.message;
    }
  }

 const getServiceById =  async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      throw error.response?.data || error.message;
    }
  }

  const scheduleService =  async (serviceId, slotData) => {
    try {
      const response = await api.put(`/services/${serviceId}`, {
        schedule: slotData
      });
      return response.data;
    } catch (error) {
      console.error(`Error scheduling service ${serviceId}:`, error);
      throw error.response?.data || error.message;
    }
  }

  const createService = async (serviceData) => {
    try {
      const response = await api.post('/services/new', serviceData);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error.response?.data || error.message;
    }
  }

  export{
    getAllServices,
    getServiceById,
    scheduleService,
    createService
  }
