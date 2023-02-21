import React from 'react';
import cssModule from './loading.module.scss';
import {ILoadingProps} from "./types/loading.type";

const LoadingComponent = (props : ILoadingProps)=> {

    return (
        <div className={cssModule.spinner}>
            <div className={cssModule.loader}>Loading...</div>
        </div>

    );
}

export default LoadingComponent;