import {BlogService} from "../../../core/modules/services/blog-service/blog-service";
import {container} from "tsyringe";
import {Dispatch} from "redux";
import {BlogCategoriesModel} from "../../../core/modules/models/blog-categories-model/blog-categories.model";
import {getBlogCategoriesSuccess, getBlogSuccess, getMobPrefixSuccess} from "./blog-reducers";
import {MobilePrefixModel} from "../../../core/modules/models/mob-prefix-model/mobile-prefix.model";

const service = container.resolve(BlogService);

export const getBlogList = (params: any) => (
    (dispatch: Dispatch<any>) => {
        return service.getBlogList(params).then((res) => {
            console.log(res);
            dispatch(getBlogSuccess(res))
        }).catch((err) => {
            console.log(err);
        })
    }
)

export const getBlogCategories = () => (
    (dispatch: Dispatch<any>) => {
        return service.getBlogCategories().then((res) => {
            return res.map((blogCategoriesList:any) => {
                return new BlogCategoriesModel(blogCategoriesList)
            })
        }).then((result) => {
            dispatch(getBlogCategoriesSuccess(result))
        }).catch((err) => {
            return Promise.reject(err);
        })
    }
)

export const getMobPrefix = () => (
    (dispatch: Dispatch<any>) => {
        return service.getMobilePrefix().then((res) => {
            console.log(res)
            return res.map((mobPrefixList: any) => {
                return new MobilePrefixModel(mobPrefixList);
            })
        }).then((result) => {
            dispatch(getMobPrefixSuccess(result))
        }).catch((err) => {
            return Promise.reject(err)
        })
    }
)