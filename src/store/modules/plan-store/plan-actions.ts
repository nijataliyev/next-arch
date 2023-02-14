import {container} from "tsyringe";
import {PlanService} from "../../../core/modules/services/plan-service/plan.service";
import {Dispatch} from "redux";
import {PlanModule} from "../../../core/modules/models/plan-module/plan.module";
import {IPlan} from "../../../core/modules/models/plan-module/types/plan";
import {getPlansSuccess} from "./plan-reducers";

const service = container.resolve(PlanService);

export const getPlansList = () => (
    (dispatch: Dispatch<any>) => {
        return service.getPlans().then((res) => {
            return res.map((planList: IPlan) => {
                return new PlanModule(planList)
            })
        }).then((resultModel) => {
            console.log(resultModel)
            dispatch(getPlansSuccess(resultModel))
        }).catch((err) => {
            console.log(err)
        })
    }
)