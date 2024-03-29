import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBlogList} from "../../../src/store/modules/blog-store/blog-action";
import scss from './blog.module.scss';
import {AppProps} from "next/app";
import ReactPaginate from 'react-paginate';
import ChildRootLayoutComponent from "../../../src/core/layouts/public/child-root-layout/child-root-layout.component";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import EmptyIcon from '../../../src/assets/images/empty.jpg';
import CalendarIcon from '../../../src/assets/images/calendar-day.svg';
import EyeIcon from '../../../src/assets/images/fontAwsome-eye.svg';
import * as data from '../../../src/assets/db/db.json';
import {ICategories, ITags} from "../../../src/core/modules/models/blog-model/types/blog";
import {decodeURL, encodeURL} from "../../../src/core/helpers/common-functions/common-functions";
import LeftIcon from '../../../src/assets/images/chevron-left-solid.svg';
import RightIcon from '../../../src/assets/images/chevron-right-solid.svg';
import NotFoundInfoIcon from '../../../src/assets/images/icons/group-187.svg';

const Blog = () => {
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)
    const dispatch: any = useDispatch();
    const [staticContent,setStaticContent] = useState<any>(null);
    const [params,setParams] = useState<any>({
        page:1,
        limit: 10,
        title: '',
        tagIds: null,
        categoryIds: null
    })
    const blogList = useSelector((state: any) => state.blogReducers.blogs);
    const blogCount = useSelector((state: any) => state.blogReducers.blogCount);
    const router = useRouter();
    const {queryParams}: any = router.query;

    useEffect(() => {
        if(queryParams){
            let decoded: any = decodeURL(queryParams);
            setParams(() => {
                return {
                    ...decoded
                }
            })
            dispatch(getBlogList(decoded));
        }else {
            let obj = {
                page:1,
                limit:10,
                title: '',
                tagIds: null,
                categoryIds: null
            }
            setParams(() => {
                return {
                    ...obj
                }
            })
            dispatch(getBlogList(obj));
        }
    }, [dispatch,router])

    useEffect(() => {
        let dataList: any = data;
        setStaticContent(dataList[lang]?.blog);
    },[lang])


    const handlePageClick = useCallback((val: any) => {
        if(val){
            let obj: any = {
                page:params.page,
                limit:params.limit,
                title: params.title,
                tagIds: params.tagIds,
                categoryIds: params.categoryIds
            }
            obj.page = val.selected + 1;

            setParams((prev: any) => {
                return {
                    ...prev,
                    page: val.selected + 1,
                }
            })
            if (window !== undefined) {
                window.scrollTo(0, 0);
            }


            router.replace({pathname:router.pathname,query: {...router.query, queryParams:`${encodeURL(obj)}`}})
        }
    }, [params])

    const gotoBlogId = (id: number) => {
        router.replace({pathname: router.pathname+'/'+id,query:{...router.query}})
    }

    return (
        <ChildRootLayoutComponent>
            <div className={scss.blog}>
                <>
                    {
                        blogList && blogList.length ? blogList.map((listItem: any, index: number) => {
                            return (
                                <div onClick={() => gotoBlogId(listItem.id)} key={index} className={scss.blog__list}>
                                    <div className={scss.blog__img}>
                                        <Image src={listItem.img && listItem.img.length ? listItem.img : EmptyIcon} alt={'test'}/>
                                    </div>
                                    <div className={scss.blog__content}>
                                        <div className={scss.blog__title}>
                                            <h4>{listItem.title}</h4>
                                        </div>
                                        <div className={scss.blog__category}>
                                            <span>{staticContent?.category}:</span>
                                            <ul>
                                                {
                                                    listItem.blogCategories && listItem.blogCategories.length ? listItem.blogCategories.map((categoriesList:ICategories,index: number) => {
                                                        return (
                                                            <li key={index}>{categoriesList?.title},</li>
                                                        )
                                                    }) : null
                                                }
                                            </ul>
                                        </div>
                                        <div className={scss.blog__tag}>
                                            <ul>
                                                {
                                                    listItem.blogTags && listItem.blogTags.length ? listItem.blogTags.map((tagList:ITags,index: number) => {
                                                        return (
                                                            <li key={index}>{tagList?.title}</li>
                                                        )
                                                    }) : null
                                                }
                                            </ul>
                                        </div>
                                        <div className={scss.blog__info}>
                                            <div className={scss.blog__date}>
                                                <Image src={CalendarIcon} alt={'CalendarIcon'}/>
                                                <span>{listItem.createdAt}</span>
                                            </div>
                                            <div className={scss.blog__eye}>
                                                <Image src={EyeIcon} alt={'EyeIcon'}/>
                                                <span>{listItem.seen}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :
                            <div className={scss.blog__empty}>
                                <h1>{staticContent?.notInfo}</h1>
                                <Image src={NotFoundInfoIcon} alt={'NotFoundInfoIcon'}/>
                            </div>
                    }
                    {
                        blogList && blogList.length && blogCount > 10 ?
                        <ReactPaginate
                            nextLabel={
                                <Image src={RightIcon} alt={'Right'}/>
                            }
                            previousLabel={
                                <Image src={LeftIcon} alt={'left'}/>
                            }
                            containerClassName={scss.blog__pagination}
                            activeClassName={scss.blog__pagination__active}
                            pageClassName={scss.blog__pagination__btn}
                            previousClassName={scss.blog__pagination__previous}
                            nextClassName={scss.blog__pagination__next}
                            marginPagesDisplayed={1}
                            breakLabel='...'
                            pageRangeDisplayed={3}
                            forcePage={params.page - 1}
                            onPageChange={handlePageClick}
                            pageCount={Math.ceil(blogCount / params.limit)}/> : null
                    }
                </>
            </div>
        </ChildRootLayoutComponent>

    )
}

export default Blog;