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
            console.log(action.payload);
            console.log(action.payload);
            state.loading = action.payload;
        },
        setLangSuccess(state, action: any){
            console.log(action.payload);
            state.lang = action.payload;
        }
    }
})

export default publicSlice.reducer;

export const { setLoaderSuccess,setLangSuccess } = publicSlice.actions;
