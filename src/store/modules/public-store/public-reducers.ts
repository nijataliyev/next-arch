import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPublicState} from "./public-types";


const initialState: IPublicState = {
    lang: 'az',
    loading: false,
}

const publicSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {
        setLoaderSuccess(state, action: any){
            state.loading = action.payload;
        },
        setLangSuccess(state, action: any){
            state.lang = action.payload;
        }
    }
})

export default publicSlice.reducer;

export const { setLoaderSuccess,setLangSuccess } = publicSlice.actions;
