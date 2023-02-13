import scss from './header.module.scss'
import Image from "next/image";
import Logo from '../../../../assets/images/logo.svg';
import {useCallback, useEffect, useState} from "react";
import * as data from '../../../../assets/db/db.json';
import HeaderItemComponent from "./components/header-item/header-item.component";
import {setLoader, setLocalization} from "../../../../store/modules/public-store/public-actions";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store";

const HeaderComponent = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [nav, setNav] = useState<any>([]);
    const [lang, setLang] = useState<string | any>('az');

    useEffect(() => {
        let lang = localStorage.getItem('lang');
        setLang(lang)
    },[lang])

    useEffect(() => {
        let datas: any = data;
        let lang: any = localStorage.getItem('lang');
        console.log(data)
        setNav(datas[lang].header)
    },[lang])

    const handleSelect = useCallback((e: any) => {
        console.log(e.target.value)
        dispatch(setLocalization(e.target.value))
        setLang(e.target.value)
        localStorage.setItem('lang', e.target.value);
    },[lang])

    return (
        <div className={scss.header}>
            <div className="container" style={{height: '100%'}}>
                <div className="row" style={{height: '100%'}}>
                    <div className="col-3">
                        <div className={scss.header__left}>
                            <Image src={Logo} alt="logo"/>
                        </div>
                    </div>
                    <div className="col-5">
                        <HeaderItemComponent nav={nav}/>
                    </div>
                    <div className={'col-4'}>
                        <select name="" id="" value={lang} onChange={handleSelect}>
                            <option value="az">AZ</option>
                            <option value="en">EN</option>
                            <option value="ru">RU</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;