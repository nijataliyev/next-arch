import {injectable} from "tsyringe";
import axios from "axios";
import {API} from "../../../config/api.config";

@injectable()
export class TopFooterService {
    postSubscribe(data: any): Promise<any> {
        return axios.post(API.subscribtion,{...data})
    }
}