import { NextPage } from "next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../src/hooks/redux";
import {getPostSuccess} from "../../src/store/modules/post-store/post-reducers";
import {getPostList} from "../../src/store/modules/post-store/post-actions";
import {container} from "tsyringe";
import {PostServices} from "../../src/core/modules/services/post-service/post.service";
const service = container.resolve(PostServices);

const Users: NextPage = () => {
    const dispatch = useAppDispatch();
    const postList = useAppSelector(state => state.postReducers.posts)

    useEffect(() => {
        dispatch( getPostList())
        console.log(postList)
    },[dispatch])

    return (
        <div>
            dwdwdwdwdwwwdwdwddwdwdwdaaaaaaaaaaa
            {/*{*/}
            {/*    users.map((userList: any) => {*/}
            {/*        return (*/}
            {/*            <div>*/}
            {/*                <h3>{userList.name}</h3>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}
        </div>
    )
}

// export const  getStaticProps = async () => {
//
//     const  data = await service.getPostsList();
//     console.log(data)
//     return {
//         props: {
//             users: data
//         }
//     }
// }

export default Users;