import {container} from "tsyringe";
import {PlanService} from "../../../core/modules/services/plan-service/plan.service";
import {Dispatch} from "redux";
import {PlanModel} from "../../../core/modules/models/plan-model/plan.model";
import {IPlan} from "../../../core/modules/models/plan-model/types/plan";
import {getPlansSuccess} from "./plan-reducers";

const service = container.resolve(PlanService);

export const getPlansList = () => (
    (dispatch: Dispatch<any>) => {
        return service.getPlans().then((res) => {
            return res.map((planList: IPlan) => {
                return new PlanModel(planList)
            })
        }).then((resultModel) => {
            dispatch(getPlansSuccess(resultModel))
        }).catch((err) => {
            return Promise.reject(err)
        })
    }
)