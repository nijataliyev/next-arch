import {IBlogCategories} from "./types/blog-categories";

export class BlogCategoriesModel {
    id: number | null = null;
    title: string | undefined;
    description: string | undefined;
    sort: number | null = null;

    constructor(item: IBlogCategories) {
        this._setId(item);
        this._setTitle(item);
        this._setDescription(item);
        this._setSort(item);
    }

    private _setId({id}: IBlogCategories) {
        this.id = id;
    }

    private _setTitle({title}: IBlogCategories) {
        this.title = title;
    }

    private _setDescription({description}: IBlogCategories) {
        this.description = description;
    }

    private _setSort({sort}: IBlogCategories) {
        this.sort = sort;
    }
}