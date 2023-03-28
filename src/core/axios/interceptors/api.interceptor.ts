import axios from '../instances/axios';
import store from "../../../store";
import {setLoader} from "../../../store/modules/public-store/public-actions";
import Swal from "sweetalert2";

export const Interceptor = () => {
    axios.interceptors.request.use((request) =>  {
        request.headers['Accept-language'] = localStorage.getItem('lang') || 'az';
        const loading = store.getState().publicReducers.loading;
        if(!loading){
            // @ts-ignore
            store.dispatch(setLoader(true));
        }
        return request;
    }, (error) => {
        return Promise.reject(error);
    })

    axios.interceptors.response.use((response) => {
        const loading = store.getState().publicReducers.loading;
        // @ts-ignore
        loading && store.dispatch(setLoader(false));
        return response;
    }, (error) => {
        const loading = store.getState().publicReducers.loading;
        // @ts-ignore
        loading && store.dispatch(setLoader(false));
        if(error.response){
            switch (error.response.status){
                case 500:
                    Swal.fire({
                        icon: 'error'
                    })
                break;
                default:
                    break;
            }
        }
        return Promise.reject(error);
    })
}