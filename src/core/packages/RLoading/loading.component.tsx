import React from 'react';
import './loading.component.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ILoadingProps} from "./types/loading.type";
const LoadingComponent = (props : ILoadingProps)=> {
    return (
        <div className={`loading ${props.scoped ? 'loading--absolute' : ''}`}>
            <div className={`loading__icon-wrapper ${props.scoped ? 'loading--absolute__icon-wrapper' : ''}`}>
                <FontAwesomeIcon
                    className={ props.scoped ? 'loading--absolute__icon-wrapper__icon' : 'loading__icon-wrapper__icon'}
                    icon={props.icon || 'spinner'}
                    spin={props.spin || true}/>
            </div>
        </div>
    );
}

export default LoadingComponent;