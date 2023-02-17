import {BlogService} from "../../../core/modules/services/blog-service/blog-service";
import {container} from "tsyringe";
import {Dispatch} from "redux";
import {BlogCategoriesModule} from "../../../core/modules/models/blog-categories-module/blog-categories.module";
import {getBlogCategoriesSuccess} from "./blog-reducers";

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

export const getBlogCategories = () => (
    (dispatch: Dispatch<any>) => {
        return service.getBlogCategories().then((res) => {
            return res.map((blogCategoriesList:any) => {
                return new BlogCategoriesModule(blogCategoriesList)
            })
        }).then((result) => {
            dispatch(getBlogCategoriesSuccess(result))
        }).catch((err) => {
            return Promise.reject(err);
        })
    }
)