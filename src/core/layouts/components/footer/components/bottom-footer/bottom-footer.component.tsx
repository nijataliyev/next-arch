import scss from './bottom-footer.module.scss';
import Image from 'next/image';
import Logo from '../../../../../../assets/images/Group 128.svg';
import FaceBook from '../../../../../../assets/images/facebook-f-brands.svg';
import Instagram from '../../../../../../assets/images/instagram-brands.svg';
import Linkedin from '../../../../../../assets/images/linkedin-in-brands.svg';
import Youtube from '../../../../../../assets/images/youtube-brands.svg';
import {useEffect, useState} from "react";
import * as data from "../../../../../../assets/db/db.json";

const BottomFooterComponent = () => {
    const [lang,setLang] = useState('az');
    const [staticContent,setStaticContent] = useState<any>(null);

    useEffect(() => {
        let datalist: any = data;
        let language: any = localStorage.getItem('lang');
        setLang(language);
        setStaticContent(datalist[language]?.footer)
    },[lang])

    return (
        <div className={scss.bottom}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className={scss.bottom__img}>
                            <Image src={Logo} alt={'Logo'}/>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={scss.bottom__info}>
                            <p>{staticContent?.bottomText}</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={scss.bottom__social}>
                            <ul>
                                <li>
                                    <Image src={FaceBook} alt={'facebook'}/>
                                </li>
                                <li>
                                    <Image src={Instagram} alt={'instagram'}/>
                                </li>
                                <li>
                                    <Image src={Linkedin} alt={'linkedin'}/>
                                </li>
                                <li>
                                    <Image src={Youtube} alt={'youtube'}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomFooterComponent;