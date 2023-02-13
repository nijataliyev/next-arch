import { container } from "tsyringe";
import { PostServices } from "../../../core/modules/services/post-service/post.service";
// import {AppDispatch} from "../../index";
import {getPostSuccess, postSlice} from "./post-reducers";
import {createAsyncThunk} from "@reduxjs/toolkit";

const service = container.resolve(PostServices);

// export const getPostList = () => {
//     try{
//         return service.getPostsList().then((res) => {
//             console.log(res)
//             postSlice.actions.getPostSuccess(res.data);
//         })
//     }catch(err){
//         console.log(err);
//     }
// }

// export const getPostList = () => (
//     (dispatch: AppDispatch) => {
//         return service.getPostsList().then((res) => {
//             dispatch(getPostSuccess(res));
//         })
//     }
// )

// export const getPostList = () => (
//     (dispatch: AppDispatch) => {
//         return service.getPostsList().then((res) => {
//             console.log(res)
//             // dispatch(postSlice.actions.getPostSuccess(res));
//         }).catch((err) => {
//             console.log(err);
//         })
//     }
// )