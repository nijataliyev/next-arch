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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
    const [lang,setLang] = useState<any>('az');
    const [sliderList,setSliderList] = useState<any>([]);

    useEffect(() => {
        let imageList = [
            {link: require('../../assets/images/lorex_1.svg')},
            {link: require('../../assets/images/lorex_2.svg')},
            {link: require('../../assets/images/lorex_3.svg')},
            {link: require('../../assets/images/lorex_4.svg')},
        ]
        let language: any = window.localStorage.getItem('lang');
        setLang(language);
        let dataList: any = data;
        let list = dataList[language]?.slider;
        let myList: any;
        if(Array.isArray(list)){
            myList = list.map((itemList: any,index: number) => {
                return {
                    title: itemList.title,
                    text: itemList.text,
                    link: require(`../../assets/images/lorex_${index+1}.svg`)
                }
            })
        }
        setSliderList(myList);
    },[lang])

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        spaceBetween: 10,
        autoplay: true,
        arrows: false,
        speed: 2000,
        autoplaySpeed: 2000,
        fade: true,
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
        // cssEase: "linear"
    };
    const settingsTwo = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        spaceBetween: 10,
        autoplay: true,
        arrows: false,
        speed: 2000,
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
        // cssEase: "linear"
    };


    return (
        <div className={css.slider}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-3">
                        <div className={css.slider__content}>
                            <div className={css.slider__content__inner}>
                                <Slider {...settings}>
                                    {
                                        sliderList && sliderList?.map((listItem: any, index: number) => {
                                            return (
                                                <>
                                                    <Image src={listItem.link} alt={'lorexOne'}/>
                                                </>
                                            )
                                        })
                                    }
                                </Slider>
                                {/*<Swiper className={css.slider__content__inner__swiper}*/}
                                {/*        effect={'flip'}*/}
                                {/*        modules={[Autoplay, EffectFlip]} slidesPerView={1}*/}
                                {/*        speed={1000} loop={true}*/}
                                {/*        autoplay={{delay: 1000}}>*/}
                                {/*    {*/}
                                {/*        sliderList && sliderList?.map((listItem: any,index: number) => {*/}
                                {/*            return (*/}
                                {/*                <SwiperSlide key={index} className={css.slider__content__inner__swiper__slide}>*/}
                                {/*                    <Image src={listItem.link} alt={'lorexOne'}/>*/}
                                {/*                </SwiperSlide>*/}
                                {/*            )*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*    /!*<SwiperSlide className={css.slider__content__inner__swiper__slide}>*!/*/}
                                {/*    /!*    <Image src={LorexOne} alt={'lorexOne'}/>*!/*/}
                                {/*    /!*</SwiperSlide>*!/*/}
                                {/*    /!*<SwiperSlide className={css.slider__content__inner__swiper__slide}>*!/*/}
                                {/*    /!*    <Image src={LorexTwo} alt={'lorexTwo'}/>*!/*/}
                                {/*    /!*</SwiperSlide>*!/*/}
                                {/*    /!*<SwiperSlide className={css.slider__content__inner__swiper__slide}>*!/*/}
                                {/*    /!*    <Image src={LorexThree} alt={'lorexThree'}/>*!/*/}
                                {/*    /!*</SwiperSlide>*!/*/}
                                {/*    /!*<SwiperSlide className={css.slider__content__inner__swiper__slide}>*!/*/}
                                {/*    /!*    <Image src={LorexFour} alt={'lorexFour'}/>*!/*/}
                                {/*    /!*</SwiperSlide>*!/*/}
                                {/*</Swiper>*/}
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
                    <div className="col-md-12 col-lg-9">
                        <div className={css.slider__content__text}>
                            <Slider {...settingsTwo}>
                                {
                                    sliderList && sliderList?.map((item: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                <h1>{item.title}</h1>
                                                <p>{item.text}</p>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                            {/*<Swiper modules={[Autoplay]} slidesPerView={1} speed={1000} loop={true} autoplay={{delay: 1000, disableOnInteraction: false}}>*/}
                            {/*    {*/}
                            {/*        sliderList && sliderList?.map((item: any, index: number) => {*/}
                            {/*            return (*/}
                            {/*                <SwiperSlide key={index}>*/}
                            {/*                    <h1>{item.title}</h1>*/}
                            {/*                    <p>{item.text}</p>*/}
                            {/*                </SwiperSlide>*/}
                            {/*            )*/}
                            {/*        })*/}
                            {/*    }*/}
                            {/*</Swiper>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderComponent;