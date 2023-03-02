import {IBlogState} from "./blog-types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IBlogState = {
    blogs: [],
    blogCount: null,
    blogCategories: [],
    mobPrefix: []
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getBlogCategoriesSuccess(state,action){
            state.blogCategories = action.payload;
        },
        getBlogSuccess(state, action){
            state.blogs = action.payload.rows;
            state.blogCount = action.payload.count;
        },
        getMobPrefixSuccess(state,action){
            state.mobPrefix = action.payload;
        }
    }
})

export default blogSlice.reducer;
export const { getBlogSuccess,getBlogCategoriesSuccess,getMobPrefixSuccess } = blogSlice.actions;