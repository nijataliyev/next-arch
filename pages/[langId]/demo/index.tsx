import scss from './demo.module.scss';
import Image from "next/image";
import DemoOne from '../../../src/assets/images/demo1.svg';
import DemoTwo from '../../../src/assets/images/demo2.svg';
import DemoThree from '../../../src/assets/images/demo3.svg';
import DemoFour from '../../../src/assets/images/demo4.svg';
import * as data from '../../../src/assets/db/db.json';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const Demo = () => {
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)
    const router: any = useRouter();
    const [staticContent,setStaticContent] = useState<any>(null);
    useEffect(() => {
        let dataList: any = data;
        setStaticContent(dataList[lang]?.demo)
    },[lang])
    const goToHome = () => {
        router.replace('/'+lang)
    }

    return (
        <div className={scss.demo}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className={scss.demo__items}>
                            <div className={scss.demo__items__img}>
                                <Image src={DemoOne} alt={'DemoOne'}/>
                            </div>
                            <div className={scss.demo__items__content}>
                                <h3>{staticContent?.demoOneTitle}</h3>
                                <p>{staticContent?.demoOneText}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className={scss.demo__items}>
                            <div className={scss.demo__items__img}>
                                <Image src={DemoTwo} alt={'DemoTwo'}/>
                            </div>
                            <div className={scss.demo__items__content}>
                                <h3>{staticContent?.demoTwoTitle}</h3>
                                <p>{staticContent?.demoTwoText}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className={scss.demo__items}>
                            <div className={scss.demo__items__img}>
                                <Image src={DemoThree} alt={'DemoThree'}/>
                            </div>
                            <div className={scss.demo__items__content}>
                                <h3>{staticContent?.demoThreeTitle}</h3>
                                <p>{staticContent?.demoThreeText}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className={scss.demo__items}>
                            <div className={scss.demo__items__img}>
                                <Image src={DemoFour} alt={'DemoFour'}/>
                            </div>
                            <div className={scss.demo__items__content}>
                                <h3>{staticContent?.demoFourTitle}</h3>
                                <p>{staticContent?.demoFourText}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={scss.demo__btn}>
                            <button onClick={goToHome}>{staticContent?.demoBtn}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Demo;