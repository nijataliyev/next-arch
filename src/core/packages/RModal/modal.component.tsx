import {IModalProps} from "./types/modal";
import css from './modal.module.scss';
import {SyntheticEvent} from "react";

const ModalComponent = (props: IModalProps) => {
    return (
        <>
            <div className={`${css.modal} fade ${props.show ? css.modal_show : ''}`}>
                <div className={css.modal_overlay} onClick={() => {
                    props.setShow(false)
                    document.body.style.overflow = 'auto'
                }}>
                    <div onClick={(e: SyntheticEvent) => e.stopPropagation()}
                         className={`${css.modal__xl || css.modal__md} ${css.modal__dialog} modal__dialog__${props.position}`}>
                        <div className={css.modal__content}>
                            {!props.hideHeader &&
                                <div className={css.modal__header}>
                                    <h5 className={`${css.modal__title} ${props.header}`}>{props.title}</h5>
                                    <button onClick={() => {
                                        props.setShow(false);
                                        document.body.style.overflow = 'auto'
                                    }} type={'button'} className={css.modal__close}>
                                        X
                                    </button>
                                </div>
                            }
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalComponent;