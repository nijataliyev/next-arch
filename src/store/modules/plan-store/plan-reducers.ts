import {IPlanTypes} from "./plan-types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IPlanTypes = {
    plans: []
}

export const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        getPlansSuccess(state, action){
            state.plans = action.payload;
        }
    }
})

export default planSlice.reducer;

export const {getPlansSuccess} = planSlice.actions;