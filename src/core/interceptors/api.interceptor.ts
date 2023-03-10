import axios from "axios";
import store from "../../store";
import {useAppDispatch} from "../../hooks/redux";
import {setLoader} from "../../store/modules/public-store/public-actions";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";

export const Interceptor = () => {
    // const [lang, setLang] = useState('az');
    // useEffect(() => {
    //     let lang = localStorage.getItem('lang') || 'az';
    //     setLang(lang);
    // },[lang])

    // const dispatch = useAppDispatch();
    axios.interceptors.request.use((request) =>  {
        request.headers['Accept-language'] = localStorage.getItem('lang') || 'az';
        const loading = store.getState().publicReducers.loading;
        if(!loading){
            // @ts-ignore
            store.dispatch(setLoader(true));
        }
        // dispatch(setLoader(true));
        return request;
    }, (error) => {
        return Promise.reject(error);
    })

    axios.interceptors.response.use((response) => {
        const loading = store.getState().publicReducers.loading;
        // @ts-ignore
        loading && store.dispatch(setLoader(false));
        // dispatch(setLoader(false));
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
        // dispatch(setLoader(false));
        return Promise.reject(error);
    })
}