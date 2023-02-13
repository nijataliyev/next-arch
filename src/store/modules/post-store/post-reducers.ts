import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPostState } from "./post-types";

const initialState: IPostState = {
    posts: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPostSuccess(state: any, action: PayloadAction){
            state.posts =  action.payload;
        }
    },
    extraReducers: (builder) => {

    }
})

export default postSlice.reducer;
export const { getPostSuccess } = postSlice.actions;