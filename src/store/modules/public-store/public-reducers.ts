import { createSlice } from "@reduxjs/toolkit";
import {IPublicState} from "./public-types";


const initialState: IPublicState = {
    lang: 'az',
    loading: true,
}

const publicSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {
        
    }
})

export default publicSlice.reducer;
