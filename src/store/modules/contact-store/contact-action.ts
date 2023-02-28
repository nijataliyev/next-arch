import {container} from "tsyringe";
import {ContactService} from "../../../core/modules/services/contact-service/contact.service";
import {Dispatch} from "redux";
import Swal from 'sweetalert2';
import * as data from '../../../assets/db/db.json';

const service = container.resolve(ContactService);
const dataList: any = data;
let language: any;
if(typeof window !== "undefined"){
    language = window.localStorage.getItem('lang');
}
let staticContent: any = dataList[language]?.successAlert;

export const postContactList = (data: any) => (
    (dispatch: Dispatch<any>) => {
        return service.postContact(data).then((res) => {
            console.log(res.status)
            if(res.status === 201){
                Swal.fire({
                    title: staticContent,
                    position:'top',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }).catch((err) => {
            return Promise.reject(err);
        })
    }
)