export interface IPublicState {
    lang: string,
    loading: boolean,
}

export enum PublicConstant {
    SET_LANG = 'SET_LANG',
    SET_LOADING = 'SET_LOADING'
}