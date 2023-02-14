import css from './slider.module.scss';
import * as data from '../../assets/db/db.json';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFlip} from "swiper";
import LorexOne from '../../assets/images/lorex_1.svg';
import LorexTwo from '../../assets/images/lorex_2.svg';
import LorexThree from '../../assets/images/lorex_3.svg';
import LorexFour from '../../assets/images/lorex_4.svg';
import 'swiper/css';
import "swiper/css/effect-flip";
import Image from "next/image";
import {useEffect, useState} from "react";

const SliderComponent = () => {
    const [lang,setLang] = useState<any>('az');
    const [sliderList,setSliderList] = useState<any>([]);
    const text = [
        {
            title: "Lorex LMS",
            text: "Lorex LMS istənilən biznes sahəsi üçün ideal bir həlldir."
        },
        {
            title: "Lorex LMS",
            text: "Lorex LMS ilə təlimlərinizi asanlıqla yaradın."
        },
        {
            title: "Lorex LMS",
            text: "Kadr hazırlığı, biznesin inkişafına edilən uğurlu investisiyadır."
        },
        {
            title: "Lorex LMS",
            text: "Onlayn kurslar dünyanı təhsilə doğru dəyişdirə bilən inanılmaz şansdır."
        }
    ]


    useEffect(() => {
        let language: any = window.localStorage.getItem('lang');
        setLang(language);
        let dataList: any = data;
        let list = dataList[language].slider;
        setSliderList(list);
        console.log(list)
    },[lang])


    return (
        <div className={css.slider}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className={css.slider__content}>
                            <div className={css.slider__content__inner}>
                                <Swiper className={css.slider__content__inner__swiper}
                                        modules={[Autoplay, EffectFlip]} centeredSlides={true} slidesPerView={1}
                                        speed={1000} loop={true} effect={'flip'} scrollbar={false} navigation={false}
                                        autoplay={{delay: 1000, disableOnInteraction: false}}>
                                    <SwiperSlide className={css.slider__content__inner__swiper__slide}>
                                        <Image src={LorexOne} alt={'lorexOne'}/>
                                    </SwiperSlide>
                                    <SwiperSlide className={css.slider__content__inner__swiper__slide}>
                                        <Image src={LorexTwo} alt={'lorexTwo'}/>
                                    </SwiperSlide>
                                    <SwiperSlide className={css.slider__content__inner__swiper__slide}>
                                        <Image src={LorexThree} alt={'lorexThree'}/>
                                    </SwiperSlide>
                                    <SwiperSlide className={css.slider__content__inner__swiper__slide}>
                                        <Image src={LorexFour} alt={'lorexFour'}/>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className={css.slider__content__first}>
                                <Image src={LorexOne} alt={'lorexOne'}/>
                            </div>
                            <div className={css.slider__content__second}>
                                <Image src={LorexTwo} alt={'lorexOne'}/>
                            </div>
                            <div className={css.slider__content__third}>
                                <Image src={LorexThree} alt={'lorexOne'}/>
                            </div>
                            <div className={css.slider__content__fourth}>
                                <Image src={LorexFour} alt={'lorexOne'}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className={css.slider__content__text}>
                            <Swiper modules={[Autoplay]} slidesPerView={1} speed={1000} loop={true} autoplay={{delay: 1000, disableOnInteraction: false}}>
                                {
                                    sliderList.map((item: any, index: number) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <h1>{item.title}</h1>
                                                <p>{item.text}</p>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderComponent;