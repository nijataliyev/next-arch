import {IPlanTypes} from "./plan-types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IPlanTypes = {
    plans: [],
    planId: null
}

export const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        getPlansSuccess(state, action){
            state.plans = action.payload;
        },
        setPlanIdSuccess(state, action){
            state.planId = action.payload;
        }
    }
})

export default planSlice.reducer;

export const {getPlansSuccess,setPlanIdSuccess} = planSlice.actions;