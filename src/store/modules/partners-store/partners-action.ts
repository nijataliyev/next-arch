import {container} from "tsyringe";
import {PartnersService} from "../../../core/modules/services/partners-service/partners.service";
import {Dispatch} from "redux";
import {IPartners} from "../../../core/modules/models/partners-model/types/partners";
import {PartnersModel} from "../../../core/modules/models/partners-model/partners.model";
import {getPartnersSuccess} from "./partners-reducers";

const service = container.resolve(PartnersService);

export const getPartners = () => (
    (dispatch: Dispatch<any>) => {
        return service.getPartners().then((res) => {
            return res.map((partnersList: IPartners) => {
                return new PartnersModel(partnersList)
            })
        }).then((resultModel: any) => {
            dispatch(getPartnersSuccess(resultModel))
        }).catch((err: any) => {
            return Promise.reject(err);
        })
    }
)