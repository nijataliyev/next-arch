import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./root-reducer";

    const store = configureStore({
        reducer: rootReducer,
        devTools: true
    })


// export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<any>
export type AppDispatch = AppStore['dispatch']

export default store