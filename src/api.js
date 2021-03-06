import axios from 'axios';


const api = axios.create({
    baseURL: 'https://www.postman.com/collections/e6afe4028c2a1e56e577'
})

export default api;