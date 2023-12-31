// axiosInstance.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api', // Set your base URL
    headers: {
      'Content-Type': 'application/json',
      // You can add other common headers here
    },
  });

export default api