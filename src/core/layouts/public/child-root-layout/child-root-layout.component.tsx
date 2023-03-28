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
import CancelBlueIcon from '../../../../assets/images/icons/cancel--blue-rounded.svg';
import CancelWhiteIcon from '../../../../assets/images/icons/cancel-white-rounded.svg';
import FilterIcon from '../../../../assets/images/icons/filter.svg';
import Image from "next/image";

function ChildRootLayoutComponent({children}: any) {
    const lang = useSelector(({publicReducers}: any) => publicReducers.lang)
    const [staticContent, setStaticContent] = useState<any>(null);
    const dispatch: any = useDispatch();
    const [isDropDown,setIsDropDown] = useState(false);
    const blogCategories: any = useSelector((state: any) => state.blogReducers.blogCategories);
    const blogTags: any = useSelector((state: any) => state.blogReducers.blogTags);
    const [params, setParams] = useState<any>({
        page: 1,
        limit: 10,
        title: '',
        tagIds: null,
        categoryIds: null
    })
    const router = useRouter();
    let {queryParams, langId}: any | undefined = router.query;

    useEffect(() => {
        let dataList: any = data;
        setStaticContent(dataList[lang]?.blog)
    }, [lang])

    useEffect(() => {
        if (queryParams) {
            let decoded: any = decodeURL(queryParams);
            let obj = {
                page: decoded.page,
                limit: decoded.limit,
                title: decoded.title,
                tagIds: decoded.tagIds,
                categoryIds: decoded.categoryIds
            }
            setParams(() => {
                return {
                    ...obj
                }
            })
        } else {
            let obj = {
                page: 1,
                limit: 10,
                title: '',
                tagIds: null,
                categoryIds: null
            }
            setParams(obj)
        }
    }, [router])

    const getCategoryId = useCallback((id: number) => {
        if (queryParams) {
            let decoded: any = decodeURL(queryParams);
            if (id !== decoded.categoryIds) {
                let obj = {
                    page: decoded.page,
                    limit: decoded.limit,
                    title: decoded.title,
                    tagIds: decoded.tagIds,
                    categoryIds: id
                }
                router.replace({pathname: router.pathname, query: {...router.query, queryParams: `${encodeURL(obj)}`}})
            } else {
                let obj = {
                    page: decoded.page,
                    limit: decoded.limit,
                    title: decoded.title,
                    tagIds: decoded.tagIds,
                    categoryIds: null
                }
                router.replace({pathname: router.pathname, query: {...router.query, queryParams: `${encodeURL(obj)}`}})
            }
        } else {
            let obj: any = {
                page: 1,
                limit: 10,
                title: '',
                tagIds: null,
                categoryIds: id
            }
            obj.categoryIds = id
            router.replace({pathname: router.pathname, query: {...router.query, queryParams: `${encodeURL(obj)}`}})
        }
    }, [router])

    const getTagId = (id: number) => {
        if (queryParams) {
            let decoded: any = decodeURL(queryParams);
            if (id !== decoded.tagIds) {
                let obj = {
                    page: decoded.page,
                    limit: decoded.limit,
                    title: decoded.title,
                    tagIds: id,
                    categoryIds: decoded.categoryIds
                }
                router.replace({pathname: router.pathname, query: {...router.query, queryParams: `${encodeURL(obj)}`}})
            } else {
                let obj = {
                    page: decoded.page,
                    limit: decoded.limit,
                    title: decoded.title,
                    tagIds: null,
                    categoryIds: decoded.categoryIds
                }
                router.replace({pathname: router.pathname, query: {...router.query, queryParams: `${encodeURL(obj)}`}})
            }
        } else {
            let obj: any = {
                page: 1,
                limit: 10,
                title: '',
                tagIds: id,
                categoryIds: null
            }
            obj.tagIds = id
            router.replace({pathname: router.pathname, query: {...router.query, queryParams: `${encodeURL(obj)}`}})
        }
    }

    useEffect(() => {
        dispatch(getBlogCategories())
        dispatch(getBlogTags())
    }, [dispatch, router])

    const queryParamChange = useCallback(debounce((obj) => {
        if (obj !== null) {
            router.replace({pathname: router.pathname, query: {...router.query, queryParams: `${encodeURL(obj)}`}})
        } else {
            return false;
        }
    }, 500), [router])


    const handleInputChange = useCallback((val: string) => {
        let obj: any = null
        if (val?.trim()?.length > 0 && val?.trim() !== '') {
            if (queryParams) {
                let decoded: any = decodeURL(queryParams);
                obj = {
                    page: 1,
                    limit: decoded.limit,
                    title: val,
                    tagIds: decoded.tagIds,
                    categoryIds: decoded.categoryIds
                }
                setParams(obj)
            } else {
                obj = {
                    page: 1,
                    limit: 10,
                    title: val,
                    tagIds: null,
                    categoryIds: null
                }
                setParams(() => {
                    return {
                        ...obj
                    }
                })
            }
        } else if (val?.length === 0) {
            if (queryParams) {
                let decoded: any = decodeURL(queryParams);
                obj = {
                    page: 1,
                    limit: decoded.limit,
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
        }
        queryParamChange(obj)
    }, [queryParamChange, router.query])

    const toggleDropDown = useCallback(() => {
        setIsDropDown(prev => !prev)
    },[])

    return (
        <>
            <div className={scss.child}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <div className={scss.child__search}>
                                <div className={scss.child__inp}>
                                    <input value={params.title} type="text"
                                           onChange={(e: any) => handleInputChange(e.target.value)}/>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </div>
                            </div>
                            <div className={scss.child__category}>
                                <h1>{staticContent?.category}</h1>
                                <ul>
                                    {
                                        blogCategories && blogCategories.map((listCategory: any, index: number) => {
                                            return (
                                                <li onClick={() => getCategoryId(listCategory.id)}
                                                    className={params.categoryIds === listCategory.id ? scss.child__category__active : ''}
                                                    key={index}>
                                                    {
                                                        params.categoryIds === listCategory.id ?
                                                            <Image className={scss.child__category__icon} src={CancelBlueIcon}
                                                                   alt={'CancelBlueIcon'}/> : null
                                                    }
                                                    {listCategory.title}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className={scss.child__tags}>
                                <h1>{staticContent?.tag}</h1>
                                <ul>
                                    {
                                        blogTags && blogTags.map((listTags: any, index: number) => {
                                            return (
                                                <li onClick={() => getTagId(listTags.id)}
                                                    className={params.tagIds === listTags.id ? scss.child__tags__active : ''}
                                                    key={index}>
                                                    {listTags.title}
                                                    {
                                                        params.tagIds === listTags.id ?
                                                            <Image className={scss.child__tags__icon} src={CancelWhiteIcon}
                                                                   alt={'CancelWhiteIcon'}/> : null
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className={scss.child__mobile}>
                                <div className={scss.child__mobile__search}>
                                    <input type="text" value={params.title} onChange={(e: any) => handleInputChange(e.target.value)}/>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </div>
                                <div className={scss.child__mobile__filter}>
                                    <button onClick={() => toggleDropDown()}>
                                        <Image src={FilterIcon} alt={'FilterIcon'}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8">
                            {!isDropDown && children}
                        </div>
                    </div>
                </div>
            </div>
            {
                isDropDown && (
                    <div className={scss.dropdown}>
                        <div className="container">
                            <div className="row mt-20">
                                <div className="col-12">
                                    <div className={scss.child__mobile}>
                                        <div className={scss.child__mobile__search}>
                                            <input type="text" value={params.title} onChange={(e: any) => handleInputChange(e.target.value)}/>
                                            <FontAwesomeIcon icon={faSearch}/>
                                        </div>
                                        <div className={scss.child__mobile__filter}>
                                            <button onClick={() => toggleDropDown()}>
                                                <Image src={FilterIcon} alt={'FilterIcon'}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className={scss.dropdown__category}>
                                        <h1>{staticContent?.category}</h1>
                                        <ul>
                                            {
                                                blogCategories && blogCategories.map((listCategory: any, index: number) => {
                                                    return (
                                                        <li onClick={() => getCategoryId(listCategory.id)}
                                                            className={params.categoryIds === listCategory.id ? scss.dropdown__category__active : ''}
                                                            key={index}>
                                                            {
                                                                params.categoryIds === listCategory.id ?
                                                                    <Image className={scss.dropdown__category__icon} src={CancelBlueIcon}
                                                                           alt={'CancelBlueIcon'}/> : null
                                                            }
                                                            {listCategory.title}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className={scss.dropdown__tags}>
                                        <h1>{staticContent?.tag}</h1>
                                        <ul>
                                            {
                                                blogTags && blogTags.map((listTags: any, index: number) => {
                                                    return (
                                                        <li onClick={() => getTagId(listTags.id)}
                                                            className={params.tagIds === listTags.id ? scss.dropdown__tags__active : ''}
                                                            key={index}>
                                                            {listTags.title}
                                                            {
                                                                params.tagIds === listTags.id ?
                                                                    <Image className={scss.dropdown__tags__icon} src={CancelWhiteIcon}
                                                                           alt={'CancelWhiteIcon'}/> : null
                                                            }
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ChildRootLayoutComponent;