import scss from './header.module.scss'
import Image from "next/image";
import Logo from '../../../../assets/images/logo.svg';
import {useCallback, useEffect, useState} from "react";
import * as data from '../../../../assets/db/db.json';
import HeaderItemComponent from "./components/header-item/header-item.component";
import {setLocalization} from "../../../../store/modules/public-store/public-actions";
import {useDispatch, useSelector} from "react-redux";
import ModalComponent from "../../../packages/RModal/modal.component";
import BodyComponent from "../../../packages/RModal/components/body.component";
import {changeInputValue} from "../../../helpers/common-functions/common-functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar,faBars} from "@fortawesome/free-solid-svg-icons";
import CallCenter from '../../../../assets/images/call-center-bro.svg';
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import MobileHeaderItemComponent from "./components/mobile-header-item/mobile-header-item.component";
import {postContactList} from "../../../../store/modules/contact-store/contact-action";
import Link from "next/link";

const HeaderComponent = () => {
    const router = useRouter();
    const dispatch: any = useDispatch();
    const [nav, setNav] = useState<any>([]);
    const [staticContent, setStaticContent] = useState<any>(null);
    const [staticModalText,setStaticModalText] = useState<any>(null);
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)
    const [show, setShow] = useState(false);
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
        }, formValid: false
    })
    const [openDropMenu,setOpenDropMenu] = useState(false);

    useEffect(() => {
        let dataList: any = data;
        setNav(dataList[lang]?.header)
        let langContent: any = dataList[lang]?.modal;
        setStaticContent(dataList[lang]?.modal)
        setStaticModalText(dataList[lang]?.modalContactButton)

        setInputState((prev: any) => {
            let prevInputState = {...prev}
            let prevInput = prevInputState.inputs;

            prevInput.fullName = {
                ...prevInput.fullName,
                rules: {
                    ...prevInput.fullName.rules,
                    required: {...prevInput.fullName.rules.required, errorText: langContent?.errorFullname}
                }
            }
            prevInput.email = {
                ...prevInput.email,
                rules: {
                    ...prevInput.email.rules,
                    required: {...prevInput.email.rules.required, errorText: langContent?.errorEmailRequired},
                    regexp: {...prevInput.email.rules.regexp, errorText: langContent?.errorEmailPattern}
                }
            }
            prevInput.phone = {
                ...prevInput.phone,
                rules: {
                    ...prevInput.phone.rules,
                    required: {...prevInput.phone.rules.required, errorText: langContent?.errorPhoneRequired},
                    regexp: {...prevInput.phone.rules.regexp, errorText: langContent?.errorPhonePattern}
                }
            }
            prevInputState = {...prevInputState,inputs:{...prevInput}}

            return {
                ...prevInputState
            }
        })

    }, [lang])

    const handleSelect = useCallback((e: any) => {
        dispatch(setLocalization(e.target.value))
        localStorage.setItem('lang', e.target.value);
        router.replace({pathname: router.pathname,query:{...router.query, langId: e.target.value}})
    }, [router,lang])

    const openDropMenuContent = () => {
        setOpenDropMenu(true)
    }

    const closeDropMenuContent = () => {
        setOpenDropMenu(false)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleInputChange = useCallback((val: string, inputName: string) => {
        changeInputValue({target: {value: val}}, inputName, inputState.inputs, setInputState)
    }, [inputState.inputs])

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if(inputState.formValid){
            let requestBody = {
                fullname: '',
                email: '',
                contact: ''
            }

            requestBody.fullname = inputState.inputs.fullName.value;
            requestBody.email = inputState.inputs.email.value;
            requestBody.contact = inputState.inputs.phone.value;

            dispatch(postContactList(requestBody))
            setShow(false)
            setInputState((prev: any) => {
                let prevInputState = {...prev};
                let prevInput = prevInputState.inputs;
                prevInput.fullName = {...prevInput.fullName, value: '', isValid: false, touched: false}
                prevInput.email = {...prevInput.email, value: '', isValid: false, touched: false}
                prevInput.phone = {...prevInput.phone, value: '', isValid: false, touched: false}
                prevInputState = {...prevInputState, formValid: false,inputs:prevInput}

                return {
                    ...prevInputState
                }
            })
        }else {
            return false;
        }
    }

    return (
        <>
            <div className={scss.header}>
                <div className="container" style={{height: '100%'}}>
                    <div className="row" style={{height: '100%'}}>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                            <div className={scss.header__left}>
                                <Link href={{pathname:'/',query:{...router.query,langId:lang}}}>
                                    <Image src={Logo} alt="logo"/>
                                </Link>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                            <HeaderItemComponent nav={nav}/>
                            <div className={scss.header__bars}>
                                <FontAwesomeIcon onClick={openDropMenuContent} icon={faBars}/>
                            </div>
                        </div>
                        <div className={`col-1 col-sm-3 col-md-3 col-lg-3 ${scss.header__right}`}>
                            <div className={scss.header__info}>
                                <div className={scss.header__info__btn}>
                                    <button onClick={() => setShow(true)} className={scss.header__info__btn__contact}>
                                        <FontAwesomeIcon icon={faPhone}/>
                                        {staticModalText}
                                    </button>
                                </div>
                                <div className={scss.header__info__dropdown}>
                                    <select name="" id="" value={lang} onChange={handleSelect}>
                                        <option value="az">AZ</option>
                                        <option value="en">EN</option>
                                        <option value="ru">RU</option>
                                    </select>
                                </div>
                            </div>
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
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className={scss.header__form__content}>
                                            <label htmlFor="">{staticContent?.username}
                                                <sup>
                                                    <FontAwesomeIcon icon={faStar}/>
                                                </sup>
                                            </label>
                                            <input type={'text'}
                                                   value={inputState.inputs.fullName.value}
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'fullName')}/>
                                            {
                                                !inputState.inputs.fullName.isValid && inputState.inputs.fullName.touched && (
                                                    <span className={scss.header__form__content__error}>{inputState.inputs.fullName.currentErrTxt}</span>
                                                )
                                            }
                                        </div>
                                        <div className={scss.header__form__content}>
                                            <label htmlFor="">{staticContent?.email}
                                                <sup>
                                                    <FontAwesomeIcon icon={faStar}/>
                                                </sup>
                                            </label>
                                            <input type={inputState.inputs.email.type}
                                                   value={inputState.inputs.email.value}
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'email')}/>
                                            {
                                                !inputState.inputs.email.isValid && inputState.inputs.email.touched && (
                                                    <span className={scss.header__form__content__error}>{inputState.inputs.email.currentErrTxt}</span>
                                                )
                                            }
                                        </div>
                                        <div className={scss.header__form__content}>
                                            <label htmlFor="">{staticContent?.phone}
                                                <sup>
                                                    <FontAwesomeIcon icon={faStar}/>
                                                </sup>
                                            </label>
                                            <input className={scss.header__form__content__contacts} type={inputState.inputs.phone.type}
                                                   value={inputState.inputs.phone.value}
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'phone')}/>
                                            <div className={scss.header__form__content__num}>(+994)</div>
                                            {
                                                !inputState.inputs.phone.isValid && inputState.inputs.phone.touched && (
                                                    <span className={scss.header__form__content__error}>{inputState.inputs.phone.currentErrTxt}</span>
                                                )
                                            }
                                        </div>
                                        <div className={scss.header__form__btn}>
                                            <button className={!inputState.formValid ? scss.header__form__btn__btnError : scss.header__form__btn__btnSuccess}>{staticContent?.btn}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className={'col-lg-5'}>
                                <div className={scss.header__image}>
                                    <Image src={CallCenter} alt={'Call center'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </BodyComponent>
            </ModalComponent>
            <MobileHeaderItemComponent nav={nav} showModal={openDropMenu} setModalDropShow={closeDropMenuContent}/>
        </>
    )
}

export default HeaderComponent;