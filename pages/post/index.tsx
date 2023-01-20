import { NextPage } from "next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../src/hooks/redux";
import { getPostList } from "../../src/store/modules/post-store/post-actions";

const Post: NextPage = ({}) => {
    const dispatch = useAppDispatch();
    const {} = useAppSelector(state => state.postReducers.posts)

    useEffect(() => {
        getPostList()
    },[dispatch])

    return (
        <div>
            post list
        </div>
    )
}

export default Post;