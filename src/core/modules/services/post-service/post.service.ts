import axios from "axios";
import { injectable } from "tsyringe";
import { API } from "../../../config/api.config";


@injectable()
export class PostServices {
    getPostsList(): Promise<any>{
        return axios.get(API.posts)
    }
}