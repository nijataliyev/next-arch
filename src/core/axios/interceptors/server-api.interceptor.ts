import axios from "../instances/axios-server";


export const ServerApiInterceptor = () => {
    axios.interceptors.request.use((request) =>  {
        return request;
    }, (error) => {
        return Promise.reject(error);
    })

    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    })
}