import {AppProps} from "next/app";
import {Provider, useSelector} from "react-redux";
import store from "../src/store";
import '../src/assets/styles/global.scss';
import 'reflect-metadata';
// import "@fortawesome/fontawesome-svg-core/style.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import HeaderComponent from "../src/core/layouts/components/header/header.component";
import {Interceptor} from "../src/core/interceptors/api.interceptor";
import LoadingComponent from "../src/core/packages/RLoading/loading.component";
import RootLayoutComponent from "../src/core/layouts/public/root-layout/root-layout.component";
import {useEffect} from "react";
config.autoAddCss = false;

function MyApp({Component, pageProps}: AppProps) {

    useEffect(() => {
        if(window.localStorage.getItem('lang') === null){
            window.localStorage.setItem('lang', 'az')
        }else {
            window.localStorage.getItem('lang')
        }
    },[])

    Interceptor();
    return (
        <Provider store={store}>
            <RootLayoutComponent>
                <Component {...pageProps}/>
            </RootLayoutComponent>
        </Provider>
    )
}

export default MyApp