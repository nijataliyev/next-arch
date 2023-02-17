import css from './contact.module.scss';
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as data from '../../assets/db/db.json';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {changeInputValue} from "../../core/helpers/common-functions/common-functions";
import {getBlogCategories} from "../../store/modules/blog-store/blog-action";
import Select from "react-select";

const ContactComponent = () => {
    const dispatch: any = useDispatch();
    const blogCategoriesList = useSelector((state: any) => state.blogReducers.blogCategories)
    const [lang, setLang] = useState('az');
    const [staticContent, setStaticContent] = useState<any>(null)
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
                        value: /^[\d\(\)\-+]+$/m,
                        errorText: '()+0-9 simvollarından istifadə edin'
                    }
                },
                currentErrTxt: '',
                touched: false,
                isValid: false
            },
            company: {
                type: 'text',
                label: 'Tip',
                value: '',
                rules: {
                    required: {
                        value: true,
                        errorText: `Şirkət əlavə edin`
                    },
                },
                currentErrTxt: '',
                touched: false,
                isValid: false
            },
            profession: {
                type: 'select',
                label: 'Tip',
                value: '',
                rules: {
                    required: {
                        value: true,
                        errorText: `Sahə əlavə edin`
                    },
                },
                options: [],
                currentErrTxt: '',
                touched: false,
                isValid: false
            },
            plan: {
                type: 'select',
                label: 'Tip',
                value: '',
                rules: {
                    required: {
                        value: true,
                        errorText: `Plan əlavə edin`
                    },
                },
                options: [],
                currentErrTxt: '',
                touched: false,
                isValid: false
            },
            message: {
                type: 'text',
                label: 'Tip',
                value: '',
                rules: {
                    required: {
                        value: true,
                        errorText: `Mesaj əlavə edin`
                    },
                },
                currentErrTxt: '',
                touched: false,
                isValid: false
            },
        }, formValid: false
    })

    useEffect(() => {
        dispatch(getBlogCategories())
    }, [dispatch])

    useEffect(() => {
        setInputState((prev: any) => {
            console.log(prev)
            let prevInputState: any = {...prev}
            const prevInput: any = prevInputState.inputs
            prevInput.profession = {...prevInput.profession, options: [...blogCategoriesList]}
            prevInputState = {...prevInputState, inputs: prevInput}
            console.log(prevInputState)
            return {
                ...prevInputState
            }
        })
    }, [blogCategoriesList])

    useEffect(() => {
        let language: any = localStorage.getItem('lang');
        let dataList: any = data;
        setStaticContent(dataList[language].contact)
        setLang(language);
    }, [lang])

    const handleInputChange = useCallback((val: string, inputName: string) => {
        changeInputValue({target: {value: val}}, inputName, inputState.inputs, setInputState)
    }, [])

    return (
        <div id={'contact'} className={css.contact}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className={css.contact__left}>
                            <div className={css.contact__left__title}>
                                <h3>{staticContent?.title}</h3>
                            </div>
                            <form action="">
                                <div className={css.contact__left__form}>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.fullname}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <input type={inputState.inputs.fullName.type}
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'fullName')}/>
                                            <span>{inputState.inputs.fullName.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.email}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <input type={inputState.inputs.email.type} onChange={(e: any) => handleInputChange(e.target.value, 'email')}/>
                                            <span>{inputState.inputs.email.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.phone}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <input type="text"/>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.company}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <input type="text"/>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.profession}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <Select
                                                options={inputState.inputs.profession.options}
                                                onChange={(e: any) => handleInputChange(e.value, 'profession')}/>
                                            {/*<select>*/}
                                            {/*    <option value="">dwd</option>*/}
                                            {/*</select>*/}
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.plan}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <select>
                                                <option value="">dwd</option>
                                            </select>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.message}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <textarea></textarea>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactComponent;