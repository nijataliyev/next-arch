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
import {useDispatch, useSelector} from "react-redux";
import * as data from '../../../../../../assets/db/db.json';
import FaceBookIcon from '../../../../../../assets/images/icons/facebook-f-brands.svg';
import InstagramIcon from '../../../../../../assets/images/icons/instagram-brands.svg';
import LinkedinIcon from '../../../../../../assets/images/icons/linkedin-in-brands.svg';
import YoutubeIcon from '../../../../../../assets/images/icons/youtube-brands.svg';

const MobileHeaderItemComponent = ({showModal, setModalDropShow, nav}: any) => {
    const dispatch: any = useDispatch();
    const router = useRouter();
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang);
    const [staticContent,setStaticContent] = useState<any>(null);
    const toGo = useCallback(() => {
        router.push('/'+lang)
    }, [])

    useEffect(() => {
        let dataList: any = data;
        setStaticContent(dataList[lang]?.demo)
    },[lang])

    const scroolElement = (link:string,routeName: string) => {
        if(routeName && routeName.length){
            router.replace({pathname: link ?? router.pathname, query:{...router.query}}).then(() => {
                let element: any = document.querySelector("#"+routeName);
                if(element){
                    element.scrollIntoView({behavior: 'smooth'})
                    setModalDropShow(false)
                }
            })
        }
    }
    
    const handleClick = useCallback((language: string) => {
        dispatch(setLocalization(language))
        localStorage.setItem('lang', language);
        router.replace({pathname: router.pathname, query:{...router.query,langId:language}})
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
                                        <Link href={{pathname:'/',query:{...router.query,langId:lang}}} onClick={() => setModalDropShow(false)}>
                                            <Image src={Logo} alt="logo"/>
                                        </Link>
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
                                                <li className={(router.pathname === navList?.linkto) && !navList.routeId ? scss.mobile__activeClass : scss.mobile__content__list}
                                                    key={index}>
                                                    {!navList.routeId ?
                                                        <Link shallow={true} href={{pathname: navList?.linkto || undefined,query:{langId:lang}}} onClick={() => setModalDropShow(false)}>{navList.text}</Link> :
                                                        <a onClick={() => scroolElement(navList.linkto,navList.routeId)}
                                                           className={module.header__static}>{navList.text}</a>}
                                                </li>
                                            )
                                        })
                                    }
                                    <li className={router.pathname === `/[langId]/demo` ? scss.mobile__activeClass : scss.mobile__content__list}>
                                        <Link href={{pathname:'/'+lang+'/demo'}} onClick={() => setModalDropShow(false)}>{staticContent?.demoBtn}</Link>
                                    </li>
                                    <li className={router.pathname === '/[langId]/contact' ? scss.mobile__activeClass : scss.mobile__content__list}>
                                        <Link href={{pathname:'/'+lang+'/contact'}} onClick={() => setModalDropShow(false)}>{staticContent?.navContact}</Link>
                                    </li>
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
                        <div className="row">
                            <div className="col-12">
                                <ul className={scss.mobile__socials}>
                                    <li>
                                        <Image src={FaceBookIcon} alt={'FaceBookIcon'}/>
                                    </li>
                                    <li>
                                        <Image src={InstagramIcon} alt={'InstagramIcon'}/>
                                    </li>
                                    <li>
                                        <Image src={LinkedinIcon} alt={'LinkedinIcon'}/>
                                    </li>
                                    <li>
                                        <Image src={YoutubeIcon} alt={'YoutubeIcon'}/>
                                    </li>
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