import axios from 'axios';


const instance = axios.create({
  baseURL: (process.env.REACT_APP_DEV_MODE === 'local') ? 'http://localhost:5000' : 'https://mesharch.studio',
});

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));

export default instance;
