import {BlogService} from "../../../core/modules/services/blog-service/blog-service";
import {container} from "tsyringe";
import {Dispatch} from "redux";
import {BlogCategoriesModel} from "../../../core/modules/models/blog-categories-model/blog-categories.model";
import {getBlogCategoriesSuccess, getBlogSuccess, getBlogTagsSuccess,getBlogDetailSuccess, getMobPrefixSuccess} from "./blog-reducers";
import {MobilePrefixModel} from "../../../core/modules/models/mob-prefix-model/mobile-prefix.model";
import {BlogModel} from "../../../core/modules/models/blog-model/blog.model";
import {BlogTagsModel} from "../../../core/modules/models/blog-tags-model/blog-tags.model";
import {BlogDetailModel} from "../../../core/modules/models/blog-detail-model/blog-detail.model";

const service = container.resolve(BlogService);

export const getBlogList = (params: any) => (
    (dispatch: Dispatch<any>) => {
        return service.getBlogList(params).then((res) => {
            return {
                count: res.count,
                rows: res.rows.map((items: any) => {
                    return new BlogModel(items)
                })
            }
        }).then((result) => {
            dispatch(getBlogSuccess(result))
        }).catch((err) => {
            return Promise.reject(err);
        })
    }
)

export const getBlogDetails = (data: any) => (
    (dispatch: Dispatch<any>) => {
            dispatch(getBlogDetailSuccess(data))
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

export const getBlogTags = () => (
    (dispatch: Dispatch<any>) => {
        return service.getBlogTags().then((res) => {
            return res.map((blogTagsList:any) => {
                return new BlogTagsModel(blogTagsList)
            })
        }).then((result) => {
            dispatch(getBlogTagsSuccess(result))
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