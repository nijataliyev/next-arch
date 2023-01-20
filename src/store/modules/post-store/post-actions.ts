import { container } from "tsyringe";
import { PostServices } from "../../../core/modules/services/post-service/post.service";
import {AppDispatch} from "../../index";
import {postSlice} from "./post-reducers";

const service = container.resolve(PostServices);

// export const getPostList = () => (dispatch: AppDispatch) => {
//     try{
//         return service.getPostsList().then((res) => {
//             console.log(res)
//             dispatch(postSlice.actions.getPostSuccess(res));
//         })
//     }catch(err){
//         console.log(err);
//
//     }
// }

export const getPostList = () => (
    (dispatch: AppDispatch) => {
        return service.getPostsList().then((res) => {
            console.log(res)
            // dispatch(postSlice.actions.getPostSuccess(res));
        }).catch((err) => {
            console.log(err);
        })
    }
)