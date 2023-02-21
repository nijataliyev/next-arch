import {IMobilePrefix} from "./types/mobile-prefix";

class SelectValueModel {
    value: string | undefined;
    label: string | undefined;

    constructor(name: any,flag: any) {
        this._setValue(name);
        this._setLabel(flag);
    }

    private _setValue(value: string) {
        this.value = value;
    }

    private _setLabel(flag: string) {
        this.label = flag;
    }
}

export class MobilePrefixModel {
    name: string | undefined;
    code: string | undefined;
    dialCode: string | undefined;
    flag: string | undefined;
    selectValue: SelectValueModel | undefined;

    constructor(item:IMobilePrefix) {
        this._setName(item);
        this._setCode(item);
        this._setDialCode(item);
        this._setFlag(item);
        this._setSelectValue(item);
    }

    private _setName({name}: IMobilePrefix) {
        this.name = name;
    }

    private _setCode({code}: IMobilePrefix) {
        this.code = code;
    }

    private _setDialCode({dial_code}: IMobilePrefix) {
        this.dialCode = dial_code;
    }

    private _setFlag({flag}: IMobilePrefix) {
        this.flag = flag;
    }

    private _setSelectValue({name,flag}: IMobilePrefix) {
        this.selectValue = new SelectValueModel(name,flag)
    }
}