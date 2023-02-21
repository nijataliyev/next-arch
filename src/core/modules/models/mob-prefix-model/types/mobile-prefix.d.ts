export interface IMobilePrefix{
    name: string | undefined;
    code: string | undefined;
    dial_code: string | undefined;
    flag: string | undefined;
    selectValue: ISelectValue | undefined;
}

export interface ISelectValue{
    value: string | undefined;
    label: string | undefined;
}