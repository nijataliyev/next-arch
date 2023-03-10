import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBlogList} from "../../src/store/modules/blog-store/blog-action";
import scss from './blog.module.scss';
import {AppProps} from "next/app";
import ReactPaginate from 'react-paginate';
import ChildRootLayoutComponent from "../../src/core/layouts/public/child-root-layout/child-root-layout.component";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";
import EmptyIcon from '../../src/assets/images/empty.jpg';
import CalendarIcon from '../../src/assets/images/FontAwsome (calendar-day).svg';
import EyeIcon from '../../src/assets/images/FontAwsome (eye).svg';
import * as data from '../../src/assets/db/db.json';
import {ICategories, ITags} from "../../src/core/modules/models/blog-model/types/blog";
import {decodeURL, encodeURL} from "../../src/core/helpers/common-functions/common-functions";
import LeftIcon from '../../src/assets/images/chevron-left-solid.svg';
import RightIcon from '../../src/assets/images/chevron-right-solid.svg';

const Blog = () => {
    const dispatch: any = useDispatch();
    const [lang,setLang] = useState('az');
    const [staticContent,setStaticContent] = useState<any>(null);
    const [searchParams, setSearchParams] = useState({page: 1, limit: 5})
    const [params,setParams] = useState<any>({
        page:1,
        limit: 5,
        title: '',
        tagIds: null,
        categoryIds: null
    })
    const blogList = useSelector((state: any) => state.blogReducers.blogs);
    const blogCount = useSelector((state: any) => state.blogReducers.blogCount);
    const router = useRouter();
    const {queryParams}: any = router.query;
    // const {search,state} = useLocation();
    // const url:any = search?.split('?')[1];

    useEffect(() => {
        if(queryParams){
            console.log(queryParams)
            let decoded: any = decodeURL(queryParams);
            console.log(decoded)
            setParams(() => {
                return {
                    ...decoded
                }
            })
            dispatch(getBlogList(decoded));
        }else {
            let obj = {
                page:1,
                limit:5,
                title: '',
                tagIds: null,
                categoryIds: null
            }
            setParams(() => {
                return {
                    ...obj
                }
            })
            console.log('dededededed')
            dispatch(getBlogList(obj));
        }
    }, [dispatch,router])

    // useEffect(() => {
    //     if(url){
    //         console.log(url)
    //        let decodedData = decodeURL(url)
    //         console.log(decodedData)
    //     }
    //     console.log(router.query)
    // },[router])

    useEffect(() => {
        let language: any = localStorage.getItem('lang');
        setLang(language);
        let dataList: any = data;
        setStaticContent(dataList[language]?.blog);
    },[lang])


    const handlePageClick = useCallback((val: any) => {
        if(val){
            console.log(params)
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


            router.replace({pathname:'/blog',query: {queryParams:`${encodeURL(obj)}`}})
        }
    }, [params])

    const gotoBlogId = (id: number) => {
        console.log(id)
        router.replace(`/blog/${id}`)
    }

    return (
        <ChildRootLayoutComponent>
            <div className={scss.blog}>
                <>
                    {
                        blogList && blogList.map((listItem: any, index: number) => {
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
                        })
                    }
                    {
                        blogList && blogList.length ?
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