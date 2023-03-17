import {AppProps} from "next/app";
import {Provider} from "react-redux";
import store from "../src/store";
import '../src/assets/styles/global.scss';
import 'reflect-metadata';
import {config} from "@fortawesome/fontawesome-svg-core";
import {Interceptor} from "../src/core/axios/interceptors/api.interceptor";
import {ServerApiInterceptor} from "../src/core/axios/interceptors/server-api.interceptor";
import RootLayoutComponent from "../src/core/layouts/public/root-layout/root-layout.component";
import {useEffect, useMemo} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useRouter} from "next/router";
config.autoAddCss = false;
Interceptor();
ServerApiInterceptor();
function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()
    const {langId}: any = router.query
    useEffect(() => {
        // if(window.localStorage.getItem('lang') === null){
        //     window.localStorage.setItem('lang', 'az')
        // }else {
        //     window.localStorage.getItem('lang')
        // }
    },[])

    useEffect(() => {
        const lang = localStorage.getItem('lang')
        if (router.pathname === '/'){
            if (lang) {
                router.replace('/' + lang)
            } else router.replace('/az')
        }

    }, [router])

    return (
        <Provider store={store}>
            {
                (langId || router.pathname === '/404') &&
                <RootLayoutComponent>
                    <Component {...pageProps}/>
                </RootLayoutComponent>
            }

        </Provider>
    )
}

export default MyApp