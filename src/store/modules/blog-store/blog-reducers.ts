import {IBlogState} from "./blog-types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IBlogState = {
    blogs: [],
    blogCount: null,
    blogDetail: null,
    blogCategories: [],
    blogTags: [],
    mobPrefix: []
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getBlogCategoriesSuccess(state,action){
            state.blogCategories = action.payload;
        },
        getBlogTagsSuccess(state,action){
            state.blogTags = action.payload;
        },
        getBlogSuccess(state, action){
            state.blogs = action.payload.rows;
            state.blogCount = action.payload.count;
        },
        getBlogDetailSuccess(state,action){
            state.blogDetail = action.payload;
        },
        getMobPrefixSuccess(state,action){
            state.mobPrefix = action.payload;
        }
    }
})

export default blogSlice.reducer;
export const { getBlogSuccess,getBlogCategoriesSuccess,getMobPrefixSuccess,getBlogTagsSuccess,getBlogDetailSuccess } = blogSlice.actions;