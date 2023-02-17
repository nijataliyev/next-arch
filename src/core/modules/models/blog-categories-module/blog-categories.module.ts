import {IBlogCategories} from "./types/blog-categories";

export class BlogCategoriesModule {
    // id: number | null = null;
    // title: string | undefined;
    // description: string | undefined;
    // sort: number | null = null;
    // selectValue: SelectedOptionsValue | undefined;

    value: string | number | null = null;
    label: string | undefined;

    constructor(item: IBlogCategories) {
        this._setValue(item);
        this._setLabel(item);
        // this._setId(item);
        // this._setTitle(item);
        // this._setDescription(item);
        // this._setSort(item);
        // this._setSelectValue(item);
    }

    private _setValue({id}: IBlogCategories) {
        this.value = id ? id.toString() : id;
    }

    private _setLabel({title}: IBlogCategories) {
        this.label = title
    }

    // private _setId({id}: IBlogCategories) {
    //     this.id = id;
    // }
    //
    // private _setTitle({title}: IBlogCategories) {
    //     this.title = title;
    // }
    //
    // private _setDescription({description}: IBlogCategories) {
    //     this.description = description;
    // }
    //
    // private _setSort({sort}: IBlogCategories) {
    //     this.sort = sort;
    // }

    // private _setSelectValue({id,title}: IBlogCategories) {
    //     this.selectValue = new SelectedOptionsValue(id,title)
    // }
}

// export class SelectedOptionsValue {
//     value: string | undefined;
//     label: string | undefined;
//
//     constructor(id: any,title: any) {
//         this._setValue(id);
//         this._setLabel(title);
//     }
//
//     private _setValue(id: any) {
//         this.value = id.toString();
//     }
//
//     private _setLabel(title: string) {
//         this.label = title
//     }
// }