import css from './planning.module.scss';
import {useEffect} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {getPlansList} from "../../store/modules/plan-store/plan-actions";
import PlanLeftImage from '../../assets/images/plan-left.svg';
import PlanNumImage from '../../assets/images/plan-num.svg';
import PlanManImage from '../../assets/images/plan-man.svg';
const PlanningComponent = () => {
    const dispatch: any = useDispatch();
    const plansList = useSelector((state: any) => state.planReducers.plans)
    useEffect(() => {
        dispatch(getPlansList())
    },[dispatch])


    return (
        <div id='planning' className={css.plan}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className={css.plan__left}>
                            <div className={css.plan__left__title}>
                                <h1>title</h1>
                                <p>description</p>
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
                                plansList && plansList.map((item: any) => {
                                    return (
                                        <div className={css.plan__right__items}>
                                            <div className={css.plan__right__items__content}>
                                                dwdw
                                            </div>
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