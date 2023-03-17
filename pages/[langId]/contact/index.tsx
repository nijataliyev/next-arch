import scss from './contact.module.scss';
import * as data from '../../../src/assets/db/db.json';
import {useCallback, useEffect, useState} from "react";
import {changeInputValue, touchInputs} from "../../../src/core/helpers/common-functions/common-functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {postContactList} from "../../../src/store/modules/contact-store/contact-action";
import {useDispatch} from "react-redux";

const Contact = () => {
    const dispatch: any = useDispatch();
    const [lang, setLang] = useState('az');
    const [staticContent, setStaticContent] = useState<any>(null);
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

    useEffect(() => {
        let language: any = localStorage.getItem('lang');
        let dataList: any = data;
        let langContent: any = dataList[language]?.modal;
        setStaticContent(dataList[language]?.modal)
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
            prevInputState = {...prevInputState, inputs: {...prevInput}}

            return {
                ...prevInputState
            }
        })
    }, [lang])

    const handleInputChange = useCallback((val: string, inputName: string) => {
        changeInputValue({target: {value: val}}, inputName, inputState.inputs, setInputState)
    }, [inputState.inputs])

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (inputState.formValid) {
            let requestBody = {
                fullname: '',
                email: '',
                contact: ''
            }
            requestBody.fullname = inputState.inputs.fullName.value;
            requestBody.email = inputState.inputs.email.value;
            requestBody.contact = inputState.inputs.phone.value;
            dispatch(postContactList(requestBody))

            setInputState((prev: any) => {
                let prevInputState = {...prev};
                let prevInput = prevInputState.inputs;
                prevInput.fullName = {...prevInput.fullName, value: '', isValid: false, touched: false}
                prevInput.email = {...prevInput.email, value: '', isValid: false, touched: false}
                prevInput.phone = {...prevInput.phone, value: '', isValid: false, touched: false}
                prevInputState = {...prevInputState, formValid: false, inputs: prevInput}

                return {
                    ...prevInputState
                }
            })
        } else {
            touchInputs(['fullName', 'email', 'phone'], setInputState)
            return false;
        }
    }

    return (
        <div className={scss.contact}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={scss.contact__title}>
                            <h1>{staticContent?.title}</h1>
                            <p>{staticContent?.text}</p>
                        </div>
                        <div className={scss.contact__form}>
                            <form action="[lang]/contact" onSubmit={handleSubmit}>
                                <div className={scss.contact__form__content}>
                                    <label htmlFor="">{staticContent?.username}
                                        <sup>
                                            <FontAwesomeIcon icon={faStar}/>
                                        </sup>
                                    </label>
                                    <input
                                        className={!inputState.inputs.fullName.isValid && inputState.inputs.fullName.touched ? scss.contact__form__content__inp : ''}
                                        type={'text'}
                                        value={inputState.inputs.fullName.value}
                                        onChange={(e: any) => handleInputChange(e.target.value, 'fullName')}/>
                                    {
                                        !inputState.inputs.fullName.isValid && inputState.inputs.fullName.touched && (
                                            <span
                                                className={scss.contact__form__content__error}>{inputState.inputs.fullName.currentErrTxt}</span>
                                        )
                                    }
                                </div>
                                <div className={scss.contact__form__content}>
                                    <label htmlFor="">{staticContent?.email}
                                        <sup>
                                            <FontAwesomeIcon icon={faStar}/>
                                        </sup>
                                    </label>
                                    <input className={!inputState.inputs.email.isValid && inputState.inputs.email.touched ? scss.contact__form__content__inp : ''} type={inputState.inputs.email.type}
                                           value={inputState.inputs.email.value}
                                           onChange={(e: any) => handleInputChange(e.target.value, 'email')}/>
                                    {
                                        !inputState.inputs.email.isValid && inputState.inputs.email.touched && (
                                            <span
                                                className={scss.contact__form__content__error}>{inputState.inputs.email.currentErrTxt}</span>
                                        )
                                    }
                                </div>
                                <div className={scss.contact__form__content}>
                                    <label htmlFor="">{staticContent?.phone}
                                        <sup>
                                            <FontAwesomeIcon icon={faStar}/>
                                        </sup>
                                    </label>
                                    <input className={!inputState.inputs.phone.isValid && inputState.inputs.phone.touched ? scss.contact__form__content__inpc : scss.contact__form__content__contacts}
                                           type={inputState.inputs.phone.type}
                                           value={inputState.inputs.phone.value}
                                           onChange={(e: any) => handleInputChange(e.target.value, 'phone')}/>
                                    <div className={scss.contact__form__content__num}>(+994)</div>
                                    {
                                        !inputState.inputs.phone.isValid && inputState.inputs.phone.touched && (
                                            <span
                                                className={scss.contact__form__content__error}>{inputState.inputs.phone.currentErrTxt}</span>
                                        )
                                    }
                                </div>
                                <div className={scss.contact__form__btn}>
                                    <button
                                        className={!inputState.formValid ? scss.contact__form__btn__btnError : scss.contact__form__btn__btnSuccess}>{staticContent?.btn}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;