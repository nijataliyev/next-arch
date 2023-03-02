import css from './learning.module.scss';
import * as data from '../../assets/db/db.json';
import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import ElementPic from '../../assets/images/element-pic.svg';
import ElementPicBack from '../../assets/images/element-pic-back.svg';
import GirlImage from '../../assets/images/Blog post-bro.svg';
import Image from "next/image";
const LearningComponent = () => {

    const [learning, setLearning] = useState<any>(null);

    useEffect(() => {
        let lang: any = localStorage.getItem('lang');
        let dataList: any = data;
        setLearning(dataList[lang]?.learning)

    },[])

    const scroolToElement = useCallback((id: string) => {
        console.log('scrool learning')
        if(id && id.length){
            if (typeof window !== "undefined") {
                let element = document.getElementById(id);
                if(element){
                    element.scrollIntoView({behavior: 'smooth'})
                }
            }
        }
    },[])

    const goDemo = useCallback(() => {

    },[])

    return (
        <div className={css.learning}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                        <div className={css.learning__left}>
                            <div className={css.learning__title}>
                                <h1>{learning?.title}</h1>
                                <p className={css.learning__first}>{learning?.text}</p>
                                <p className={css.learning__sub}>{learning?.subText}</p>
                            </div>
                            <div className={css.learning__btn}>
                                <div className={css.learning__btn__demo}>
                                    <button onClick={() => scroolToElement('contact')}>{learning?.btnText}</button>
                                </div>
                                <div className={css.learning__btn__more} onClick={() => goDemo()}>
                                    <Link href={"demo"}>{learning?.more}</Link>
                                    <FontAwesomeIcon icon={faArrowRight}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                        <div className={css.learning__right}>
                            <div className={css.learning__right__element}>
                                <Image src={ElementPic} alt={'element-pic'}/>
                            </div>
                            <div className={css.learning__right__back}>
                                <Image src={ElementPicBack} alt={'element-pic-back'}/>
                            </div>
                            <div className={css.learning__right__girl}>
                                <Image src={GirlImage} alt={'girl'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearningComponent;