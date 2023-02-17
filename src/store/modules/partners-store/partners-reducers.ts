import {IPartnersTypes} from "./partners-types";
import {createSlice} from "@reduxjs/toolkit";
import exp from "constants";

const initialState: IPartnersTypes = {
    partners: []
}

export const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        getPartnersSuccess(state, action){
            state.partners = action.payload
        }
    }
})

export default partnersSlice.reducer;

export const {getPartnersSuccess} = partnersSlice.actions;