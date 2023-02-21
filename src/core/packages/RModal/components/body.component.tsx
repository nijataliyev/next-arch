import css from '../modal.module.scss';
import {IProps} from "../types/modal";
const BodyComponent = (props:IProps) => {
    return (
        <div className={css.modal__body}>
            {props.children}
        </div>
    )
}

export default BodyComponent;