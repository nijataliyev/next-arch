import ChildRootLayoutComponent from "../../../src/core/layouts/public/child-root-layout/child-root-layout.component";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBlogDetails} from "../../../src/store/modules/blog-store/blog-action";
import Image from "next/image";
import scss from './blogDetail.module.scss';
import EmptyIcon from '../../../src/assets/images/empty.jpg';
import * as data from '../../../src/assets/db/db.json';
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {container} from "tsyringe";
import {BlogService} from "../../../src/core/modules/services/blog-service/blog-service";

const BlogId = ({res}:any) => {
    const router = useRouter();
    const dispatch: any = useDispatch();
    const {blogId}: any = router.query;
    const blogDetail = useSelector((state: any) => state.blogReducers.blogDetail)
    const [staticContent,setStaticContent] = useState<any>(null);
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)

    useEffect(() => {
        let dataList: any = data;
        setStaticContent(dataList[lang]?.blog)
        console.log(res)
    },[lang])

    useEffect(() => {
        if(blogId){
            dispatch(getBlogDetails(res))
        }
    },[dispatch,router])

    return (
        <ChildRootLayoutComponent>
            <div className={scss.blogDetail}>
                <div className={scss.blogDetail__img}>
                    <Image src={blogDetail?.img ? blogDetail?.img : EmptyIcon} alt={'image'}/>
                </div>
                <div className={scss.blogDetail__title}>
                    <h1>{blogDetail?.title}</h1>
                </div>
                <div className={scss.blogDetail__body}>
                    <p dangerouslySetInnerHTML={{__html: blogDetail?.body}}></p>
                </div>
                <div className={scss.blogDetail__line}></div>
                <div className={scss.blogDetail__category}>
                    <span>{staticContent?.category}:</span>
                    <ul>
                        {
                            blogDetail?.blogCategories && blogDetail?.blogCategories.map((listCategory: any,index: number) => {
                                return (
                                    <li key={index}>{listCategory.title},</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={scss.blogDetail__tag}>
                    <ul>
                        {
                            blogDetail?.blogTags && blogDetail?.blogTags.map((listTag: any,index: number) => {
                                return (
                                    <li key={index}>{listTag.title}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={scss.blogDetail__see}>
                    <FontAwesomeIcon icon={faEye}/>
                    <p>{blogDetail?.seen}</p>
                </div>
            </div>
        </ChildRootLayoutComponent>
    )
}

export default BlogId;

export async function getServerSideProps(context:any) {
    const {blogId,langId}: any = context.query;
    const blogService = container.resolve(BlogService);
    const res = await blogService.getBlogDetail(blogId,langId).then((res) => res)
    return {
        props: {
            res
        }
    }
}