import * as data from '../../assets/db/db.json';
import css from './slider.module.scss';
import scss from "./slick-custom.module.scss";
import LorexOne from '../../assets/images/lorex_1.svg';
import LorexTwo from '../../assets/images/lorex_2.svg';
import LorexThree from '../../assets/images/lorex_3.svg';
import LorexFour from '../../assets/images/lorex_4.svg';
import Image from "next/image";
import {useEffect, useState} from "react";
import Slider from "react-slick";
import {useSelector} from "react-redux";



const SliderComponent = () => {
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)
    const [sliderList,setSliderList] = useState<any>([]);

    useEffect(() => {
        let dataList: any = data;
        let list = dataList[lang]?.slider;
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
        autoplay: true,
        arrows: false,
        speed: 1800,
        autoplaySpeed: 1800,
        fade: true,
        pauseOnHover: false
    };
    const settingsTwo = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        spaceBetween: 10,
        autoplay: true,
        arrows: false,
        speed: 1800,
        autoplaySpeed: 1800,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
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
                                <Slider {...settings} className={scss["slick-slider"]}>
                                    {
                                        sliderList && sliderList?.map((listItem: any, index: number) => {
                                            return (
                                                <div  className={scss["slider__content"]} key={index}>
                                                    <Image src={listItem.link} alt={'lorexOne'}/>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
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
                        <div className={css.slider__text}>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderComponent;