import scss from './header.module.scss'
import Image from "next/image";
import Logo from '../../../../assets/images/logo.svg';
import {useCallback, useEffect, useState} from "react";
import * as data from '../../../../assets/db/db.json';
import HeaderItemComponent from "./components/header-item/header-item.component";
import {setLoader, setLocalization} from "../../../../store/modules/public-store/public-actions";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store";
import ModalComponent from "../../../packages/RModal/modal.component";
import BodyComponent from "../../../packages/RModal/components/body.component";
import {str} from "video.js";
import {changeInputValue} from "../../../helpers/common-functions/common-functions";

const HeaderComponent = () => {

    const dispatch: any = useDispatch<AppDispatch>();
    const [nav, setNav] = useState<any>([]);
    const [staticContent, setStaticContent] = useState<any>(null);
    const [lang, setLang] = useState<string | any>('az');
    const [show, setShow] = useState(true);
    const [inputState, setInputState] = useState({
        inputs: {
            fullName: {
                type: 'text',
                label: 'Tip',
                value: '',
                rules: {
                    required: {
                        value: true,
                        errorText: `Soyad, ad əlavə edin`
                    },
                },
                currentErrTxt: '',
                touched: false,
                isValid: false
            },
            email: {
                type: 'text',
                label: 'Tip',
                value: '',
                rules: {
                    required: {
                        value: true,
                        errorText: `Elektron poçt əlavə edin`
                    },
                    regexp: {
                        value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                        errorText: 'Elektron poçt düzgün daxil edilməyib'
                    }
                },
                currentErrTxt: '',
                touched: false,
                isValid: false
            },
            phone: {
                type: 'text',
                label: 'Tip',
                value: '',
                rules: {
                    required: {
                        value: true,
                        errorText: `Əlaqə nömrəsi əlavə edin`
                    },
                    regexp: {
                        value: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$',
                        errorText: '()+0-9 simvollarından istifadə edin'
                    }
                },
                currentErrTxt: '',
                touched: false,
                isValid: false
            },
        }
    })

    useEffect(() => {
        let lang = localStorage.getItem('lang');
        setLang(lang)
    }, [lang])

    useEffect(() => {
        let datas: any = data;
        let lang: any = localStorage.getItem('lang');
        console.log(data)
        setNav(datas[lang].header)
        setStaticContent(datas[lang].modal)
    }, [lang])

    const handleSelect = useCallback((e: any) => {
        console.log(e.target.value)
        dispatch(setLocalization(e.target.value))
        setLang(e.target.value)
        localStorage.setItem('lang', e.target.value);
    }, [lang])

    const closeModal = () => {
        setShow(false)
    }

    const handleInputChange = useCallback((val: string, inputName: string) => {
        changeInputValue({target: {value: val}}, inputName, inputState.inputs, setInputState)
    }, [])

    return (
        <>
            <div className={scss.header}>
                <div className="container" style={{height: '100%'}}>
                    <div className="row" style={{height: '100%'}}>
                        <div className="col-3">
                            <div className={scss.header__left}>
                                <Image src={Logo} alt="logo"/>
                            </div>
                        </div>
                        <div className="col-6">
                            <HeaderItemComponent nav={nav}/>
                        </div>
                        <div className={'col-3'}>
                            <select name="" id="" value={lang} onChange={handleSelect}>
                                <option value="az">AZ</option>
                                <option value="en">EN</option>
                                <option value="ru">RU</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <ModalComponent size={'lg'} show={show} setShow={closeModal}>
                <BodyComponent>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className={scss.header__title}>
                                    <h1>{staticContent?.title}</h1>
                                    <p>{staticContent?.text}</p>
                                </div>
                                <div className={scss.header__form}>
                                    <form action="">
                                        <div className={scss.header__form__content}>
                                            <label htmlFor="">{staticContent?.username}</label>
                                            <input type={inputState.inputs.fullName.type} value={inputState.inputs.fullName.value}
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'fullname')}/>
                                            <span>{inputState.inputs.fullName.currentErrTxt}</span>
                                        </div>
                                        <div className={scss.header__form__content}>
                                            <label htmlFor="">{staticContent?.email}</label>
                                            <input type={inputState.inputs.email.type} value={inputState.inputs.email.value}
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'fullname')}/>
                                            <span>{inputState.inputs.email.currentErrTxt}</span>
                                        </div>
                                        <div className={scss.header__form__content}>
                                            <label htmlFor="">{staticContent?.phone}</label>
                                            <input type={inputState.inputs.phone.type} value={inputState.inputs.phone.value}
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'fullname')}/>
                                            <span>{inputState.inputs.phone.currentErrTxt}</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </BodyComponent>
            </ModalComponent>
        </>
    )
}

export default HeaderComponent;