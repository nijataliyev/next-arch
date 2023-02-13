import module from './header-item.module.scss';
import * as data from '../../../../../../assets/db/db.json';
import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const HeaderItemComponent = ({nav}: any) => {
    const router = useRouter();

    useEffect(() => {
        console.log(router)
    },[router])

    const scroolElement = useCallback((str: any) => {
        console.log(str)
        if(str && str.length){
            router.replace('/').then(() => {
                let element: any = document.querySelector("#"+str);
                if(element){
                    element.scrollIntoView({behavior: 'smooth'})
                }
            })
        }
    },[])

    return (
        <ul className={module.header_item}>
            {
                nav.map((item: any, index: number) => {
                    return (
                        <li className={router.pathname === item?.linkto ? module.header__activeClass : ''} key={index}>
                            {item.linkto ?
                                <Link href={item?.linkto || undefined}>{item.text}</Link> :
                                <a onClick={() => scroolElement(item.routeId)} className={module.header__static}>{item.text}</a>}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default HeaderItemComponent;