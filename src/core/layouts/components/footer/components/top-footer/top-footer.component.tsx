import scss from './top-footer.module.scss';
import {useCallback, useEffect, useState} from "react";
import * as data from '../../../../../../assets/db/db.json';
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import Logo from '../../../../../../assets/images/logo_idea-01.svg';
import {changeInputValue} from "../../../../../helpers/common-functions/common-functions";
import {useDispatch, useSelector} from "react-redux";
import {postSubscribeList} from "../../../../../../store/modules/top-footer-store/top-footer.action";

const TopFooterComponent = () => {
    const dispatch: any = useDispatch();
    const lang = useSelector(({publicReducers}: any) => publicReducers.lang);
    const [inputState, setInputState] = useState({
        inputs: {
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
            }
        }, formValid: false
    })
    const [staticContent, setStaticContent] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        let datalist: any = data;
        setStaticContent(datalist[lang]?.footer)
    }, [lang])

    const scoolElement = useCallback((link: string,str: any) => {
        if (str && str.length) {
            router.replace({pathname: link ?? router.pathname, query: {...router.query}}).then(() => {
                let element: any = document.querySelector("#" + str);
                if (element) {
                    element.scrollIntoView({behavior: 'smooth'})
                }
            })
        }
    }, [router])

    const handleInputChange = useCallback((val: string, inputName: string) => {
        changeInputValue({target: {value: val}}, inputName, inputState.inputs, setInputState)
    }, [inputState.inputs])

    const formSubmit = (e: any) => {
        e.preventDefault();
        if (inputState.inputs.email.isValid) {
            let obj: any = {
                email: inputState.inputs.email.value,
                lang: localStorage.getItem('lang')
            }
            dispatch(postSubscribeList(obj))
            setInputState((prev: any) => {
                let prevInputState = {...prev}
                let prevInput = prevInputState.inputs;
                prevInput = {...prevInput, value: ''}
                prevInputState = {...prevInputState, inputs: prevInput}
                return {
                    ...prevInputState
                }
            })
        } else {
            return false;
        }
    }

    return (
        <div className={scss.top}>
            <div className={'container'}>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div className={scss.top__left}>
                            <h3>{staticContent?.commonHeading}</h3>
                            <ul className={scss.top__nav}>
                                {
                                    staticContent?.nav?.map((navList: any, index: number) => {
                                        return (
                                            <li key={index}>
                                                {
                                                    !navList?.routeId ?
                                                        <Link shallow={true} href={{
                                                            pathname: navList?.linkto || undefined,
                                                            query: {langId: lang}
                                                        }}>{navList?.text}</Link> :
                                                        <a onClick={() => scoolElement(navList?.linkto,navList?.routeId)}>{navList?.text}</a>
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <div className={scss.top__middle}>
                            <h3>{staticContent?.contactHeading}</h3>
                            <div className={scss.top__info}>
                                <ul>
                                    <li>(+994 50) 700 04 06</li>
                                    <li>consultant@ideacs.az</li>
                                </ul>
                            </div>
                            <div className={scss.top__logo}>
                                <div className={scss.top__img}>
                                    <Image src={Logo} alt={'Logo'}/>
                                </div>
                                <p>{staticContent?.logoText}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"col-12 col-sm-12 col-md-12 col-lg-5"}>
                        <div className={scss.top__right}>
                            <h3>{staticContent?.subscribeHeading}</h3>
                            <p>{staticContent?.text}</p>
                            <form onSubmit={formSubmit}>
                                <div className={scss.top__form}>
                                    <input type={inputState.inputs.email.type}
                                           onChange={(e) => handleInputChange(e.target.value, 'email')}/>
                                    <button
                                        className={!inputState.inputs.email.isValid ? scss.top__form__btnError : scss.top__form__btnSuccess}>{staticContent?.btn}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopFooterComponent;