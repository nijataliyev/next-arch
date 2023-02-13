import React from 'react';
import cssModule from './loading.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ILoadingProps} from "./types/loading.type";
const LoadingComponent = (props : ILoadingProps)=> {
    return (
        <div className={`${cssModule.loading} ${props.scoped ? cssModule.loading__absolute : ''}`}>
            <div className={`${cssModule.loading__icon__wrapper} ${props.scoped ? cssModule.loading__absolute__icon__wrapper : ''}`}>
                <FontAwesomeIcon
                    className={ props.scoped ? cssModule.loading__absolute__icon__wrapper__icon : cssModule.loading__icon__wrapper__icon}
                    icon={props.icon || 'spinner'}
                    spin={props.spin || true}/>
            </div>
        </div>
    );
}

export default LoadingComponent;