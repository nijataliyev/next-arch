import {BlogService} from "../../../core/modules/services/blog-service/blog-service";
import {container} from "tsyringe";
import {Dispatch} from "redux";

const service = container.resolve(BlogService);

export const getBlogList = (params: any) => (
    (dispatch: Dispatch<any>) => {
        return service.getBlogList(params).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
)