// src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api/v1/auth' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (formData) => API.post('/register', formData);
export const loginUser = (formData) => API.post('/login', formData);
export const getUserProfile = () => API.get('/profile');
export const updateUserProfile = (formData) => API.put('/updateprofile', formData);
export const getProducts = () => API.get('/getproducts');
export const createOrder = (id, quantity) => API.post(`/createorders/${id}?quantity=${quantity}`);
export const getUserOrders = () => API.get('/getusersorders');