import css from './partners.module.scss';
import {useEffect, useState} from "react";
import * as data from '../../assets/db/db.json';
import {useDispatch, useSelector} from "react-redux";
import {getPartners} from "../../store/modules/partners-store/partners-action";
import Image from "next/image";
import {IPartners} from "../../core/modules/models/partners-model/types/partners";
import Slider from "react-slick";
import NatureOne from '../../assets/stattic-img/nature_5.jpg';
import {useRouter} from "next/router";

const PartnersComponent = () => {
    const dispatch: any = useDispatch();
    const partnersList = useSelector((state: any) => state.partnersReducers.partners)
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)
    const [staticContent, setStaticContent] = useState<any>(null)

    const settings = {
        dots: false,
        gap: 10,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        spaceBetween: 10,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    };

    useEffect(() => {
        dispatch(getPartners())
    }, [dispatch])

    useEffect(() => {
        let dataList: any = data;
        setStaticContent(dataList[lang]?.partners)
    }, [lang])

    return (
        <div className={css.partners}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={css.partners__title}>
                            <h2>{staticContent?.title}</h2>
                            <p>{staticContent?.text}</p>
                        </div>
                        <div className={css.partners__logos}>
                            <Slider {...settings}>
                                {
                                    partnersList.map((list: IPartners, index: number) => {
                                        return (
                                            <div key={index} className={css.partners__logos__images}>
                                                <Image src={list?.icon ? list?.icon : NatureOne}
                                                       alt={list?.title ? list?.title : ''}/>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PartnersComponent;