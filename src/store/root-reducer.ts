import {combineReducers} from "@reduxjs/toolkit";
import publicReducers from "./modules/public-store/public-reducers";
import postReducers from "./modules/post-store/post-reducers";
import blogReducers from "./modules/blog-store/blog-reducers";
import planReducers from './modules/plan-store/plan-reducers';

export const rootReducer = combineReducers({
    postReducers,
    publicReducers,
    blogReducers,
    planReducers
})