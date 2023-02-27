import css from './contact.module.scss';
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as data from '../../assets/db/db.json';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {changeInputValue} from "../../core/helpers/common-functions/common-functions";
import {getBlogCategories, getMobPrefix} from "../../store/modules/blog-store/blog-action";
import ReactFlagsSelect from "react-flags-select";
import Image from 'next/image';
import FirstImg from '../../assets/images/freepik--background-simple--inject-46.svg';
import SecondImg from '../../assets/images/computer.svg';
import ThirdImg from '../../assets/images/freepik--Hands--inject-46.svg';

const ContactComponent = () => {
    const dispatch: any = useDispatch();
    const blogCategoriesList = useSelector((state: any) => state.blogReducers.blogCategories)
    const mobPrefix = useSelector((state: any) => state.blogReducers.mobPrefix)
    const plansList = useSelector((state: any) => state.planReducers.plans)
    const [flags, setFlags] = useState<string[]>([]);
    const [prefix, setPrefix] = useState('');
    const [lang, setLang] = useState('az');
    const [select, setSelect] = useState("AZ");
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
            country: {
                type: 'select',
                label: 'Tip',
                value: 'AZ',
                rules: {
                    required: {
                        value: true,
                        errorText: `Öləkə əlavə edin`
                    },
                },
                options: [],
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
        dispatch(getMobPrefix())
    }, [dispatch])

    useEffect(() => {
        setInputState((prev: any) => {
            console.log(prev)
            let prevInputState: any = {...prev}
            const prevInput: any = prevInputState.inputs
            prevInput.profession = {...prevInput.profession, options: [...blogCategoriesList]}
            prevInputState = {...prevInputState, inputs: prevInput}
            return {
                ...prevInputState
            }
        })
    }, [blogCategoriesList])

    // useEffect(() => {
    //     setInputState((prev: any) => {
    //         console.log(prev)
    //         let prevInputState: any = {...prev}
    //         const prevInput: any = prevInputState.inputs
    //         prevInput.plan = {...prevInput.plan, options: [...plansList]}
    //         prevInputState = {...prevInputState, inputs: prevInput}
    //         return {
    //             ...prevInputState
    //         }
    //     })
    // }, [plansList])

    useEffect(() => {
        const list = mobPrefix.map((item: any) => {
            return item.code
        })
        setFlags(list)
    }, [mobPrefix])

    useEffect(() => {
        let language: any = localStorage.getItem('lang');
        let dataList: any = data;
        const langContent = dataList[language].contact
        setStaticContent(langContent)
        setLang(language);

        setInputState((prev: any) => {
            let prevInputState: any = {...prev}
            const prevInput: any = prevInputState.inputs
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
            prevInput.country = {
                ...prevInput.country,
                rules: {
                    ...prevInput.country.rules,
                    required: {...prevInput.country.rules.required, errorText: langContent?.errorCountryRequired},
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
            prevInput.company = {
                ...prevInput.company,
                rules: {
                    ...prevInput.company.rules,
                    required: {...prevInput.company.rules.required, errorText: langContent?.errorCompany},
                }
            }
            prevInput.profession = {
                ...prevInput.profession,
                rules: {
                    ...prevInput.profession.rules,
                    required: {...prevInput.profession.rules.required, errorText: langContent?.errorProfession},
                }
            }
            prevInput.plan = {
                ...prevInput.plan,
                rules: {
                    ...prevInput.plan.rules,
                    required: {...prevInput.plan.rules.required, errorText: langContent?.errorPlan},
                }
            }
            prevInput.message = {
                ...prevInput.message,
                rules: {
                    ...prevInput.message.rules,
                    required: {...prevInput.message.rules.required, errorText: langContent?.errorMessage},
                }
            }
            console.log(prevInput)
            prevInputState = {...prevInputState,inputs:{...prevInput}}
            return {
                ...prevInputState
            }
        })
    }, [lang])

    const handleInputChange = useCallback((val: string, inputName: string) => {
        changeInputValue({target: {value: val}}, inputName, inputState.inputs, setInputState)
    }, [])

    const onSelect = (code: any) => {
        setSelect(code)
        if (mobPrefix) {
            let selectedItem = mobPrefix.find((item: any) => item.code === code)
            setPrefix(selectedItem.dialCode)
        }
    }

    return (
        <div id={'contact'} className={css.contact}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-6">
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
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'fullName')}
                                                   value={inputState.inputs.fullName.value}/>
                                            <span
                                                className={css.contact__left__error}>{inputState.inputs.fullName.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.email}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <input type={inputState.inputs.email.type}
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'email')}
                                                   value={inputState.inputs.email.value}/>
                                            <span
                                                className={css.contact__left__error}>{inputState.inputs.email.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.country}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <ReactFlagsSelect className={css.contact__left__form__items__label__fla}
                                                              searchable searchPlaceholder={staticContent?.search}
                                                              onSelect={(e) => {
                                                                  handleInputChange(e, 'country'), onSelect(e)
                                                              }} selected={inputState.inputs.country.value}
                                                              countries={[...flags]}/>
                                            {/*<input type={inputState.inputs.country.type} onChange={(e: any) => handleInputChange(e.target.value, 'country')}/>*/}
                                            <span
                                                className={css.contact__left__error}>{inputState.inputs.country.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.phone}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <span
                                                className={css.contact__left__form__items__label__prefix}>{prefix ? prefix : '+994'}</span>
                                            <input onChange={(e: any) => handleInputChange(e.target.value, 'phone')}
                                                   value={inputState.inputs.phone.value}
                                                   className={css.contact__left__form__items__label__pre} type="text"
                                                   placeholder={'XXX-XX-XX'}/>
                                            <span
                                                className={css.contact__left__error}>{inputState.inputs.phone.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.company}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <input type="text"
                                                   onChange={(e: any) => handleInputChange(e.target.value, 'company')}
                                                   value={inputState.inputs.company.value}/>
                                            <span
                                                className={css.contact__left__error}>{inputState.inputs.company.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.profession}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <select
                                                onChange={(e: any) => handleInputChange(e.target.value, 'profession')}>
                                                <option selected={true} disabled>Seçin</option>
                                                {
                                                    inputState.inputs.profession.options.map((optionList: any, index: number) => {
                                                        return <option key={index}
                                                                       value={optionList.id}>{optionList.title}</option>
                                                    })
                                                }
                                            </select>
                                            <span
                                                className={css.contact__left__error}>{inputState.inputs.profession.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.plan}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <select onChange={(e: any) => handleInputChange(e.target.value, 'plan')}>
                                                <option selected={true} disabled>Seçin</option>
                                                {
                                                    plansList.map((plans: any, index: number) => {
                                                        return (
                                                            <option key={index} value={plans.id}>{plans.title}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span
                                                className={css.contact__left__error}>{inputState.inputs.plan.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <div className={css.contact__left__form__items__label}>
                                            <label htmlFor="">{staticContent?.message}</label>
                                            <sup>
                                                <FontAwesomeIcon icon={faStar}/>
                                            </sup>
                                            <textarea
                                                onChange={(e: any) => handleInputChange(e.target.value, 'message')}></textarea>
                                            <span
                                                className={css.contact__left__error}>{inputState.inputs.message.currentErrTxt}</span>
                                        </div>
                                    </div>
                                    <div className={css.contact__left__form__items}>
                                        <button
                                            className={css.contact__left__form__items__btn}>{staticContent?.btn}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={'col-md-12 col-lg-6'}>
                        <div className={css.contact__right}>
                            <div className={`${css.contact__first} ${css.contact__body}`}>
                                <Image src={FirstImg} alt={'first'}/>
                            </div>
                            <div className={`${css.contact__second} ${css.contact__body}`}>
                                <Image src={SecondImg} alt={'second'}/>
                            </div>
                            <div className={`${css.contact__third} ${css.contact__body}`}>
                                <Image src={ThirdImg} alt={'third'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactComponent;