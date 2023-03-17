import {container} from "tsyringe";
import {ContactService} from "../../../core/modules/services/contact-service/contact.service";
import {successAlert} from "../../../core/shared/alert/alert";

const service = container.resolve(ContactService);

export const postContactList = (data: any ) => (
    () => {
        return service.postContact(data).then((res) => {
            if(res.status === 201){
                let language:any = localStorage.getItem('lang');
                successAlert(language)
            }
        }).catch((err) => {
            return Promise.reject(err);
        })
    }
)

export const postScheduleDemoList = (data: any) => (
    () => {
        return service.postScheduleDemo(data).then((res) =>{
            if(res.status === 201){
                let language:any = localStorage.getItem('lang');
                successAlert(language)
            }
        }).catch((err) => {
            return Promise.reject(err);
        })
    }
)