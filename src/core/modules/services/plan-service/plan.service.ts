import {injectable} from "tsyringe";
import axios from "axios";
import {API} from "../../../config/api.config";

@injectable()
export class PlanService{
    getPlans():Promise<any>{
        return axios.get(API.plan).then((planList: any) => planList.data.rows)
    }
}