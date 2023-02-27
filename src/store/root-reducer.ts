import {combineReducers} from "@reduxjs/toolkit";
import publicReducers from "./modules/public-store/public-reducers";
import blogReducers from "./modules/blog-store/blog-reducers";
import planReducers from './modules/plan-store/plan-reducers';
import partnersReducers from './modules/partners-store/partners-reducers';

export const rootReducer = combineReducers({
    publicReducers,
    blogReducers,
    planReducers,
    partnersReducers
})