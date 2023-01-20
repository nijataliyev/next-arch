import {AppProps} from "next/app";
import {Provider} from "react-redux";
import {steupStore} from "../src/store/index";
import '../src/assets/styles/global.scss';
import 'reflect-metadata';
// import "@fortawesome/fontawesome-svg-core/style.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import HeaderComponent from "../src/core/layouts/components/header/header.component";
config.autoAddCss = false;
const store = steupStore();

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <HeaderComponent/>
            <Component {...pageProps}/>
        </Provider>
    )
}

export default MyApp