import axios from 'axios';


const instance = axios.create({
  baseURL: (process.env.REACT_APP_DEV_MODE === 'local') ? 'http://localhost:5000' : 'https://mesharch.studio',  
});

export default instance;
