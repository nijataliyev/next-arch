import {container} from "tsyringe";
import {PartnersService} from "../../../core/modules/services/partners-service/partners.service";
import {Dispatch} from "redux";
import {IPartners} from "../../../core/modules/models/partners-module/types/partners";
import {PartnersModule} from "../../../core/modules/models/partners-module/partners.module";
import {getPartnersSuccess} from "./partners-reducers";

const service = container.resolve(PartnersService);

export const getPartners = () => (
    (dispatch: Dispatch<any>) => {
        return service.getPartners().then((res) => {
            return res.map((partnersList: IPartners) => {
                return new PartnersModule(partnersList)
            }).then((resultModel: any) => {
                dispatch(getPartnersSuccess(resultModel))
            }).catch((err: any) => {
                console.log(err)
            })
        })
    }
)