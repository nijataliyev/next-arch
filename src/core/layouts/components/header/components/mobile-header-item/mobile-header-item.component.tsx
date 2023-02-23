import scss from './mobile-header-item.module.scss';
import Image from "next/image";
import Logo from "../../../../../../assets/images/logo.svg";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import module from "../header-item/header-item.module.scss";
import Link from "next/link";
import {setLocalization} from "../../../../../../store/modules/public-store/public-actions";
import {useDispatch} from "react-redux";

const MobileHeaderItemComponent = ({showModal, setModalDropShow, nav}: any) => {
    const dispatch: any = useDispatch();
    const router = useRouter();
    const [lang,setLang] = useState('');
    const toGo = useCallback(() => {
        router.push('/')
    }, [])

    useEffect(() => {
        let language: any = localStorage.getItem('lang');
        setLang(language)
    },[lang])

    const scroolElement = (routeName: string) => {
        console.log(routeName)
    }
    
    const handleClick = useCallback((lang: string) => {
        dispatch(setLocalization(lang))
        setLang(lang)
        localStorage.setItem('lang', lang);
    },[dispatch,lang])

    return (
        <>
            {
                showModal ? <div className={scss.mobile}>
                    <div className={'container'}>
                        <div className="row">
                            <div className="col-12">
                                <div className={scss.mobile__header}>
                                    <div className={scss.mobile__header__logo}>
                                        <Image onClick={toGo} src={Logo} alt="logo"/>
                                    </div>
                                    <div className={scss.mobile__header__icon}>
                                        <FontAwesomeIcon onClick={() => setModalDropShow(false)} icon={faXmark}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <ul className={scss.mobile__content}>
                                    {
                                        nav.length && nav.map((navList: any, index: number) => {
                                            return (
                                                <li className={router.pathname === navList?.linkto ? scss.mobile__activeClass : scss.mobile__content__list}
                                                    key={index}>
                                                    {navList.linkto ?
                                                        <Link href={navList?.linkto || undefined}>{navList.text}</Link> :
                                                        <a onClick={() => scroolElement(navList.routeId)}
                                                           className={module.header__static}>{navList.text}</a>}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <ul className={scss.mobile__lang}>
                                    <li onClick={() => handleClick('az')} className={lang === 'az' ? scss.mobile__lang__activeClass: ''}>AZ</li>
                                    <li onClick={() => handleClick('en')} className={lang === 'en' ? scss.mobile__lang__activeClass: ''}>EN</li>
                                    <li onClick={() => handleClick('ru')} className={lang === 'ru' ? scss.mobile__lang__activeClass: ''}>RU</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> : null
            }
        </>
    )
}

export default MobileHeaderItemComponent;