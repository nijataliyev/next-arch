import {injectable} from "tsyringe";
import axios from "axios";
import {API} from "../../../config/api.config";

@injectable()
export class ContactService {
    postContact(data: any):Promise<any> {
        console.log(data)
        return axios.post(API.contactRequest, {...data})
    }
}