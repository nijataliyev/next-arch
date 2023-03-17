import React, {useEffect} from 'react';
import HeaderComponent from "../../components/header/header.component";
import FooterComponent from "../../components/footer/footer.component";
import LoadingComponent from "../../../packages/RLoading/loading.component";
import {useDispatch, useSelector} from "react-redux";
import {setLocalization} from "../../../../store/modules/public-store/public-actions";
import {useRouter} from "next/router";

function RootLayoutComponent({children}:any) {
    const loading = useSelector((state: any) => state.publicReducers.loading);

    const dispatch: any = useDispatch()
    const router = useRouter()
    const {langId}: any = router.query
    useEffect(()=>{
        let lanquaj: any = 'az'
        localStorage.getItem('lang') && (lanquaj = localStorage.getItem('lang'))
        langId && (lanquaj = langId)
        localStorage.setItem('lang', lanquaj)
        dispatch(setLocalization(lanquaj))
    }, [dispatch, langId])
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