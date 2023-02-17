import {injectable} from "tsyringe";
import axios from "axios";
import {API} from "../../../config/api.config";

@injectable()
export class PartnersService {

    getPartners(): Promise<any>{
        return axios.get(API.partners).then((res) => res.data)
    }
}