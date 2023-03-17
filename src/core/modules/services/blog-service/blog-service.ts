import {injectable} from "tsyringe";
import axios from '../../../axios/instances/axios';
import serverAxios from "../../../axios/instances/axios-server";
import {API} from "../../../config/api.config";

@injectable()
export class BlogService{
    getBlogList(params: any): Promise<any> {
        return axios.get(API.blogs,{params: {...params}}).then((res) => res.data);
    }

    getBlogCategories(): Promise<any> {
        return axios.get(API.blogCategories).then((res) => res.data.rows)
    }

    getBlogTags(): Promise<any> {
        return axios.get(API.blogTags).then((res) => res.data.rows)
    }

    getBlogDetail(id: number,langId: string): Promise<any> {
        return serverAxios.get(API.blogs+`/${id}`,{headers:{'accept-language': langId}}).then((res) => res.data)
    }

    getMobilePrefix(): Promise<any> {
        return axios.get(API.mobPrefix).then((res) => res.data)
    }
}