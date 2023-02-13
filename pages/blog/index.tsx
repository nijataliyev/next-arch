import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getBlogList} from "../../src/store/modules/blog-store/blog-action";

const Blog = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState({page: 1, limit: 10})

    useEffect(() => {
        dispatch(getBlogList(searchParams));
    },[dispatch])

    return (
        <div>
            <h1>Blog</h1>
        </div>
    )
}

export default Blog;