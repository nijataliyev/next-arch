import {injectable} from "tsyringe";
import axios from "axios";
import {API} from "../../../config/api.config";

@injectable()
export class ContactService {
    postContact(data: any):Promise<any> {
        return axios.post(API.contactRequest, {...data})
    }

    postScheduleDemo(data: any):Promise<any> {
        return axios.post(API.scheduleDemo, {...data})
    }
}