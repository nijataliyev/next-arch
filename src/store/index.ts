import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./root-reducer";

    const store = configureStore({
        // middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
        //     serializableCheck:{
        //         ignoreActions:['plan/getPlansSuccess'],
        //         ignoredActionPaths:[''],
        //         ignoredPaths:['']
        //     }
        // }),
        reducer: rootReducer,
        devTools: true
    })


// export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<any>
export type AppDispatch = typeof store.dispatch

export default store