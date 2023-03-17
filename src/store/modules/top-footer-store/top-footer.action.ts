import {container} from "tsyringe";
import {TopFooterService} from "../../../core/modules/services/top-footer-service/top-footer.service";
import Swal from 'sweetalert2';
const service = container.resolve(TopFooterService);
import * as data from '../../../assets/db/db.json';
const dataList: any = data;
let language: any;

if(typeof window !== "undefined"){
    language = window.localStorage.getItem('lang');
}
let staticContent: any = dataList[language]?.successAlert;

export const postSubscribeList = (data: any) => (
    () => {
        return service.postSubscribe(data).then((res) => {
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