import css from './planning.module.scss';
import {useEffect, useState} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {getPlansList} from "../../store/modules/plan-store/plan-actions";
import PlanLeftImage from '../../assets/images/plan-left.svg';
import PlanNumImage from '../../assets/images/plan-num.svg';
import PlanManImage from '../../assets/images/plan-man.svg';
import * as data from '../../assets/db/db.json';
const PlanningComponent = () => {
    const dispatch: any = useDispatch();
    const plansList = useSelector((state: any) => state.planReducers.plans)
    const [lang,setLang] = useState('az');
    const [planList, setPlanList] = useState<any>(null);
    useEffect(() => {
        dispatch(getPlansList())
    },[dispatch])

    useEffect(() => {
        let language: any = localStorage.getItem('lang');
        setLang(language);
        let dataList: any = data
        let list = dataList[language].plan
        setPlanList(list);

    },[lang])


    return (
        <div id='planning' className={css.plan}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
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
                    <div className="col-lg-6">
                        <div className={css.plan__right}>
                            {
                                plansList && plansList.map((item: any,index: number) => {
                                    return (
                                        <div key={index} className={css.plan__right__items}>
                                            <div className={css.plan__right__items__content}>
                                                <h5>{item.title}</h5>
                                                <p>{item.description}</p>
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
                                            <button className={css.plan__right__items__btn}>dede</button>
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