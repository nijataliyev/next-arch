import Swal from "sweetalert2";
import * as data from '../../../assets/db/db.json';

export const successAlert = (lang: string,onFinish?: () => void) => {

    const dataList:any = data;
    let staticContent: any = dataList[lang]?.successAlert;

    Swal.fire({
        title: staticContent,
        position:'top',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    })
}