import scss from './child-layout.module.scss';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useCallback, useEffect, useState} from "react";
import * as data from '../../../../assets/db/db.json';
import {useDispatch, useSelector} from "react-redux";
import {getBlogCategories, getBlogTags} from "../../../../store/modules/blog-store/blog-action";
import debounce from "lodash.debounce";
import {useRouter} from "next/router";
import {decodeURL, encodeURL} from "../../../helpers/common-functions/common-functions";

function ChildRootLayoutComponent({children}: any){
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)
    const [staticContent,setStaticContent] = useState<any>(null);
    const dispatch: any = useDispatch();
    const blogCategories: any = useSelector((state: any) => state.blogReducers.blogCategories);
    const blogTags: any = useSelector((state: any) => state.blogReducers.blogTags);
    const [params,setParams] = useState<any>({
        page:1,
        limit: 5,
        title: '',
        tagIds: null,
        categoryIds: null
    })
    const router = useRouter();
    let {queryParams,langId}: any | undefined = router.query;

    useEffect(() => {
        let dataList: any = data;
        setStaticContent(dataList[lang]?.blog)
    },[lang])

    useEffect(() => {
        if(queryParams){
            let decoded: any = decodeURL(queryParams);
            let obj = {
                page:decoded.page,
                limit:decoded.limit,
                title: decoded.title,
                tagIds: decoded.tagIds,
                categoryIds: decoded.categoryIds
            }
            setParams(() => {
                return {
                    ...obj
                }
            })
        }else {
            let obj = {
                page:1,
                limit:5,
                title: '',
                tagIds: null,
                categoryIds: null
            }
            setParams(obj)
        }
    },[router])

    // const urlChangeHandler = (searchValue: string,blogCategoryId: number,blogTagId: number){
    //     router.push({query:})
    // }

    const getCategoryId = useCallback((id: number) => {
        if(queryParams){
            let decoded: any = decodeURL(queryParams);
            let obj = {
                page:decoded.page,
                limit:decoded.limit,
                title: decoded.title,
                tagIds: decoded.tagIds,
                categoryIds: id
            }
            router.replace({pathname:router.pathname,query: {...router.query, queryParams:`${encodeURL(obj)}`}})
        }else {
            let obj: any = {
                page:1,
                limit: 5,
                title: '',
                tagIds: null,
                categoryIds: id
            }
            obj.categoryIds = id
            router.replace({pathname:router.pathname,query: {...router.query, queryParams:`${encodeURL(obj)}`}})
        }
    },[router])

    const getTagId = (id: number) => {
        if(queryParams){
            let decoded: any = decodeURL(queryParams);
            let obj = {
                page:decoded.page,
                limit:decoded.limit,
                title: decoded.title,
                tagIds: id,
                categoryIds: decoded.categoryIds
            }
            console.log(router.pathname)
            router.replace({pathname:router.pathname,query: {...router.query,queryParams:`${encodeURL(obj)}`}})
        }else {
            let obj: any = {
                page:1,
                limit: 5,
                title: '',
                tagIds: id,
                categoryIds: null
            }
            obj.tagIds = id
            console.log(router.pathname)
            router.replace({pathname:router.pathname,query: {...router.query, queryParams:`${encodeURL(obj)}`}})
        }
    }

    useEffect(() => {
        console.log(router)
        dispatch(getBlogCategories())
        dispatch(getBlogTags())
    },[dispatch,router])

    const queryParamChange = useCallback(debounce((obj)=>{
        console.log(obj)
        if(obj !== null){
            router.replace({pathname:router.pathname,query: {...router.query, queryParams:`${encodeURL(obj)}`}})
        }else {
            return false;
        }
    }, 500),[router])


    const handleInputChange = useCallback((val: string)=>{
        let obj: any = null
            if(val?.trim()?.length > 0 && val?.trim() !== ''){
                if(queryParams){
                    let decoded: any = decodeURL(queryParams);
                    console.log(decoded)
                    obj = {
                        page:1,
                        limit:decoded.limit,
                        title: val,
                        tagIds: decoded.tagIds,
                        categoryIds: decoded.categoryIds
                    }

                    console.log(obj)
                    setParams(obj)
                }else {
                    obj = {
                        page:1,
                        limit:5,
                        title: val,
                        tagIds: null,
                        categoryIds: null
                    }
                    setParams(() => {
                        return {
                            ...obj
                        }
                    })
                    console.log('swsw')
                }
                console.log(val)
                console.log('valid')
                // dispatch(getContactForm(pageParams, {searchParams: e.target.value?.trim()}))
            }else if(val?.length === 0) {
                if(queryParams){
                    let decoded: any = decodeURL(queryParams);
                    obj = {
                        page:1,
                        limit:decoded.limit,
                        title: val,
                        tagIds: decoded.tagIds,
                        categoryIds: decoded.categoryIds
                    }
                    setParams((prev: any) => {
                        return {
                            ...obj
                        }
                    })
                }
                console.log('invalid')
                // dispatch(getContactForm({PageSize: 10, PageNumber: 1}, {searchParams: ''}))
            }
            // this.setState((prev: any) =>{
            //     return {
            //         ...prev,
            //         searchValue: val
            //     }
            // })
            // if (val && val !== '') {
            //     // this.getMyOrders(this.state.currentPage,this.state.pageSize, this.state.searchValue)
            // }
        queryParamChange(obj)
    },[queryParamChange, router.query])

    return (
        <div className={scss.child}>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className={scss.child__search}>
                            <div className={scss.child__inp}>
                                <input value={params.title} type="text" onChange={(e: any) => handleInputChange(e.target.value)}/>
                                <FontAwesomeIcon icon={faSearch}/>
                            </div>
                        </div>
                        <div className={scss.child__category}>
                            <h1>{staticContent?.category}</h1>
                            <ul>
                                {
                                    blogCategories && blogCategories.map((listCategory:any,index: number) => {
                                        return (
                                            <li onClick={() => getCategoryId(listCategory.id)} className={params.categoryIds === listCategory.id ? scss.child__category__active : ''} key={index}>{listCategory.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={scss.child__tags}>
                            <h1>{staticContent?.tag}</h1>
                            <ul>
                                {
                                    blogTags && blogTags.map((listTags:any,index: number) => {
                                        return (
                                            <li onClick={() => getTagId(listTags.id)} className={params.tagIds === listTags.id ? scss.child__tags__active : ''} key={index}>{listTags.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChildRootLayoutComponent;