import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBlogList} from "../../src/store/modules/blog-store/blog-action";
import scss from './blog.module.scss';
import {AppProps} from "next/app";
import ReactPaginate from 'react-paginate';
import ChildRootLayoutComponent from "../../src/core/layouts/public/child-root-layout/child-root-layout.component";

const Blog = ({Component, pageProps}: AppProps) => {
    const dispatch: any = useDispatch();
    const [searchParams, setSearchParams] = useState({page: 1, limit: 5})
    const blogList = useSelector((state: any) => state.blogReducers.blogs);
    const blogCount = useSelector((state: any) => state.blogReducers.blogCount);

    useEffect(() => {
        dispatch(getBlogList(searchParams));
    }, [dispatch,searchParams])

    const handlePageClick = useCallback((val: any) => {
        console.log(val);

        setSearchParams((prev: any) => {
            return {
                ...prev,
                page: val.selected + 1,
            }
        })
        if(window !== undefined){
            window.scrollTo(0,0);
        }
    }, [])

    return (
        <div className={scss.blog}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        left
                    </div>
                    <div className={'col-lg-8'}>
                        <ChildRootLayoutComponent>
                            <>
                                {
                                    blogList && blogList.map((listItem: any, index: number) => {
                                        return (
                                            <div key={index} className={scss.blog__list}>
                                                <h1>{listItem.title}</h1>
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
                        </ChildRootLayoutComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog;