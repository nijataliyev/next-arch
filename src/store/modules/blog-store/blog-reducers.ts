import {IBlogState} from "./blog-types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IBlogState = {
    blogs: []
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getBlogSuccess(state, action){
            state.blogs = action.payload;
        }
    }
})

export default blogSlice.reducer;
export const { getBlogSuccess } = blogSlice.actions;