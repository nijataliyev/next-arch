import {IBlogState} from "./blog-types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IBlogState = {
    blogs: [],
    blogCategories: []
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getBlogCategoriesSuccess(state,action){
            console.log(action)
            state.blogCategories = action.payload;
        },
        getBlogSuccess(state, action){
            state.blogs = action.payload;
        }
    }
})

export default blogSlice.reducer;
export const { getBlogSuccess,getBlogCategoriesSuccess } = blogSlice.actions;