import {AppDispatch} from "../../index";
import {setLangSuccess, setLoaderSuccess} from "./public-reducers";
import {AnyAction, Dispatch} from "redux";

export const setLoader = (payload: boolean) => (
    (dispatch: AppDispatch) => {
        dispatch(setLoaderSuccess(payload));
    }
)

export const setLocalization = (payload: any) => (
    (dispatch: AppDispatch) => {
        dispatch(setLangSuccess(payload));
    }
)
