import axios from "axios";

axios.interceptors.request.use(function (config) {
    return config;
}, (error) => {
    return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
})