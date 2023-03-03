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
import * as data from '../../src/assets/db/db.json';
import {ICategories, ITags} from "../../src/core/modules/models/blog-model/types/blog";

const Blog = ({Component, pageProps}: AppProps) => {
    const dispatch: any = useDispatch();
    const [lang,setLang] = useState('az');
    const [staticContent,setStaticContent] = useState<any>(null);
    const [searchParams, setSearchParams] = useState({page: 1, limit: 5})
    const blogList = useSelector((state: any) => state.blogReducers.blogs);
    const blogCount = useSelector((state: any) => state.blogReducers.blogCount);
    const router = useRouter();

    useEffect(() => {
        dispatch(getBlogList(searchParams));
    }, [dispatch, searchParams])

    useEffect(() => {
        let language: any = localStorage.getItem('lang');
        setLang(language);
        let dataList: any = data;
        setStaticContent(dataList[language]?.blog);
    },[lang])


    const handlePageClick = useCallback((val: any) => {
        console.log(val);

        setSearchParams((prev: any) => {
            return {
                ...prev,
                page: val.selected + 1,
            }
        })
        if (window !== undefined) {
            window.scrollTo(0, 0);
        }
    }, [])

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
                                    </div>
                                </div>
                            )
                        })
                    }
                    <ReactPaginate
                        containerClassName={scss.blog__pagination}
                        activeClassName={scss.blog__pagination__active}
                        pageClassName={scss.blog__pagination__btn}
                        marginPagesDisplayed={1}
                        breakLabel='...'
                        pageRangeDisplayed={3}
                        forcePage={searchParams.page - 1}
                        onPageChange={handlePageClick}
                        pageCount={Math.ceil(blogCount / searchParams.limit)}/>
                </>
            </div>
        </ChildRootLayoutComponent>

    )
}

export default Blog;