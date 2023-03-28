import {useEffect, useState} from "react";
import * as data from '../../src/assets/db/db.json';
import NotFoundICon from '../../src/assets/images/oops-404.png';
import scss from './404.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const NotFoundPage = () => {
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)
    const [staticContent,setStaticContent] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        let dataList: any = data;
        setStaticContent(dataList[lang || 'az']?.notFound)
    },[lang])

    const goTo = () => {
        router.replace({pathname:'/',query:{...router.query}})
    }

    return (
        <div className={scss.notfound}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={scss.notfound__content}>
                            <Image src={NotFoundICon} alt='NotFoundICon'/>
                            <h1>{staticContent?.title}</h1>
                            <p>{staticContent?.desc}</p>
                            <button onClick={() => goTo()}>{staticContent?.text}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;