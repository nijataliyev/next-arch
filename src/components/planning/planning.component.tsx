import css from './planning.module.scss';
import {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {getPlansList, setPlanId} from "../../store/modules/plan-store/plan-actions";
import PlanLeftImage from '../../assets/images/plan-left.svg';
import PlanNumImage from '../../assets/images/plan-num.svg';
import PlanManImage from '../../assets/images/plan-man.svg';
import * as data from '../../assets/db/db.json';
import {useRouter} from "next/router";
const PlanningComponent = () => {
    const dispatch: any = useDispatch();
    const router = useRouter();
    const plansList = useSelector((state: any) => state.planReducers.plans)
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)
    const [planList, setPlanList] = useState<any>(null);
    useEffect(() => {
        dispatch(getPlansList())
    },[dispatch,router.query])

    useEffect(() => {
        let dataList: any = data
        let list = dataList[lang]?.plan
        setPlanList(list);
    },[lang])

    const scroolTo = useCallback((item: any,id: string) => {
        if(id && id.length){
            if (typeof window !== "undefined") {
                dispatch(setPlanId(item))
                let element = document.getElementById(id);
                if(element){
                    element.scrollIntoView({behavior: 'smooth'})
                }
            }
        }
    },[])


    return (
        <div id='planning' className={css.plan}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div className={css.plan__left}>
                            <div className={css.plan__left__title}>
                                <h1>{planList?.title}</h1>
                                <p>{planList?.description}</p>
                            </div>
                            <div className={css.plan__left__img}>
                                <Image src={PlanLeftImage} alt={'PlanLeftImage'}/>
                                <Image src={PlanNumImage} alt={'PlanNumImage'}/>
                                <Image src={PlanManImage} alt={'PlanManImage'}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div className={css.plan__right}>
                            {
                                plansList && plansList.map((item: any,index: number) => {
                                    return (
                                        <div key={index} className={css.plan__right__items}>
                                            <div className={css.plan__right__items__content}>
                                                <div className={css.plan__right__items__content__head}>
                                                    <h5>{item.title}</h5>
                                                    <p>{item.description}</p>
                                                </div>
                                                <div className={css.plan__right__items__content__responsive}>
                                                    <h3>{item.members}</h3>
                                                    <p>{item.memberUnit}</p>
                                                </div>
                                            </div>
                                            <div className={css.plan__right__items__price}>
                                                <div className={css.plan__right__items__price__left}>
                                                    <h3>{item.members}</h3>
                                                    <p>{item.memberUnit}</p>
                                                </div>
                                                <div className={css.plan__right__items__price__right}>
                                                    <h3>{item.price}</h3>
                                                    <pre>{item.priceUnit}</pre>
                                                </div>
                                            </div>
                                            <div className={css.plan__right__items__mobile}>
                                                <div className={css.plan__right__items__mobile__info}>
                                                    <h3>{item.price}</h3>
                                                    <pre>{item.priceUnit}</pre>
                                                </div>
                                                <div className={css.plan__right__items__mobile__mob}>
                                                    <button onClick={() => scroolTo(item,'contact')}>{planList?.btn}</button>
                                                </div>
                                            </div>
                                            <button onClick={() => scroolTo(item,'contact')} className={css.plan__right__items__btn}>{planList?.btn}</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanningComponent;