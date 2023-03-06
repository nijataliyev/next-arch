import scss from './child-layout.module.scss';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import * as data from '../../../../assets/db/db.json';
import {useDispatch, useSelector} from "react-redux";
import {getBlogCategories, getBlogTags} from "../../../../store/modules/blog-store/blog-action";
import debounce from "lodash.debounce";
import {useRouter} from "next/router";

function ChildRootLayoutComponent({children}: any){
    const [lang,setLang] = useState('az');
    const [staticContent,setStaticContent] = useState<any>(null);
    const dispatch: any = useDispatch();
    const blogCategories: any = useSelector((state: any) => state.blogReducers.blogCategories);
    const blogTags: any = useSelector((state: any) => state.blogReducers.blogTags);
    const router = useRouter();

    useEffect(() => {
        let language: any = localStorage.getItem('lang');
        let dataList: any = data;
        setLang(language);
        setStaticContent(dataList[language]?.blog)
        console.log(router)
    },[lang])

    // const urlChangeHandler = (searchValue: string,blogCategoryId: number,blogTagId: number){
    //     router.push({query:})
    // }

    const getCategoryId = (id: number) => {
        console.log(id);
    }

    const getTagId = (id: number) => {
        console.log(id);
    }

    useEffect(() => {
        dispatch(getBlogCategories())
        dispatch(getBlogTags())
    },[dispatch])

    const handleInputChange = debounce((val: string) => {
        console.log(val);
        // this.setState((prev: any) =>{
        //     return {
        //         ...prev,
        //         searchValue: val
        //     }
        // })
        // if (val && val !== '') {
        //     // this.getMyOrders(this.state.currentPage,this.state.pageSize, this.state.searchValue)
        // }
    },500)

    return (
        <div className={scss.child}>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className={scss.child__search}>
                            <div className={scss.child__inp}>
                                <input type="text" onChange={(e: any) => handleInputChange(e.target.value)}/>
                                <FontAwesomeIcon icon={faSearch}/>
                            </div>
                        </div>
                        <div className={scss.child__category}>
                            <h1>{staticContent?.category}</h1>
                            <ul>
                                {
                                    blogCategories && blogCategories.map((listCategory:any,index: number) => {
                                        return (
                                            <li onClick={() => getCategoryId(listCategory.id)} key={index}>{listCategory.title}</li>
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
                                            <li onClick={() => getTagId(listTags.id)} key={index}>{listTags.title}</li>
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