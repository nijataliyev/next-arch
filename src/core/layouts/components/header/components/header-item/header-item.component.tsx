import module from './header-item.module.scss';
import {useCallback} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const HeaderItemComponent = ({nav}: any) => {
    const router = useRouter();
    const lang = useSelector(({publicReducers}: any) => publicReducers.lang);

    const scroolElement = useCallback((link: string, str: string) => {
        if (str && str.length) {
            router.replace({pathname: link ?? router.pathname, query: {...router.query}}).then(() => {
                let element: any = document.querySelector("#" + str);
                if (element) {
                    element.scrollIntoView({behavior: 'smooth'})
                }
            })
        }
    }, [router])

    return (
        <ul className={module.header_item}>
            {
                nav && nav?.map((item: any, index: number) => {
                    return (
                        <li className={(router.pathname === item?.linkto) && !item.routeId ? module.header__activeClass : ''}
                            key={index}>
                            {!item.routeId ?
                                <Link shallow href={{
                                    pathname: item?.linkto || undefined,
                                    query: {langId: lang}
                                }}>{item.text}</Link> :
                                <a onClick={() => scroolElement(item.linkto, item.routeId)}
                                   className={module.header__static}>{item.text}</a>}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default HeaderItemComponent;