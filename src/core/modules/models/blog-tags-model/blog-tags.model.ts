import {IBlogTags} from "./types/blog-tags";

export class BlogTagsModel {
    id: number | null = null;
    title: string | undefined;

    constructor(item: IBlogTags) {
        this._setId(item);
        this._setTitle(item);
    }

    private _setId({id}: IBlogTags) {
        this.id = id;
    }

    private _setTitle({title}: IBlogTags) {
        this.title = title;
    }
}