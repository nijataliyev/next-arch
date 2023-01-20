import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./root-reducer";

export const steupStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: true
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof steupStore>
export type AppDispatch = AppStore['dispatch']