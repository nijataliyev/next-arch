import React from 'react';
import HeaderComponent from "../../components/header/header.component";
import FooterComponent from "../../components/footer/footer.component";
import LoadingComponent from "../../../packages/RLoading/loading.component";
import {useSelector} from "react-redux";

function RootLayoutComponent({children}:any) {
    const loading = useSelector((state: any) => state.publicReducers.loading);

    return (
        <div>
            <HeaderComponent/>
            <div className="main-content">
                {loading && <LoadingComponent/>}
                {children}
            </div>
            <FooterComponent/>
        </div>
    );
}

export default RootLayoutComponent;