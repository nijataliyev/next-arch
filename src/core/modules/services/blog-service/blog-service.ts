import {injectable} from "tsyringe";
import axios from "axios";
import {API} from "../../../config/api.config";

@injectable()
export class BlogService{
    getBlogList(params: any): Promise<any> {
        return axios.get(API.blogs,{params: {...params}}).then((res) => res.data);
    }

    getBlogCategories(): Promise<any> {
        return axios.get(API.blogCategories).then((res) => res.data.rows)
    }
}