import {combineReducers} from "@reduxjs/toolkit";
import publicReducers from "./modules/public-store/public-reducers";
import postReducers from "./modules/post-store/post-reducers";

export const rootReducer = combineReducers({
    postReducers,
    publicReducers
})