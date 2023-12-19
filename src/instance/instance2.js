// axiosInstance.js

import axios from 'axios';


const token = JSON.parse(localStorage.getItem("authUser"));

const apiWT = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/', // Set your base URL
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        "access_token": token?.accessToken
    },
});

export default apiWT