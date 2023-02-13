import {AppDispatch} from "../../index";
import {setLangSuccess, setLoaderSuccess} from "./public-reducers";
import {AnyAction, Dispatch} from "redux";

export const setLoader = (payload: boolean) => (
    (dispatch: AppDispatch) => {
        console.log(payload)
        dispatch(setLoaderSuccess(payload));
    }
)

export const setLocalization = (payload: any) => (
    (dispatch: AppDispatch) => {
        console.log(payload)
        dispatch(setLangSuccess(payload));
        window.location.reload();
    }
)
