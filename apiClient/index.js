import axios from "axios";

const apiCLient = axios.create({
    baseURL: '/api',
})

export default apiCLient;