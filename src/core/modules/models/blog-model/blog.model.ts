import {IBlog, ICategories, ITags} from "./types/blog";

class BlogTagsModel {
    id: number | null = null;
    title: string | undefined;
    constructor(blogTags: ITags) {
        this._setId(blogTags);
        this._setTitle(blogTags);
    }

    /**
     * set id
     * @param id
     * @private
     */
    private _setId({id}: ITags) {
        this.id = id;
    }

    /**
     * set title
     * @param title
     * @private
     */
    private _setTitle({title}: ITags) {
        this.title = title;
    }

}

class BlogCategoryModel {
    id: number | null = null;
    title: string | undefined;
    constructor(listCategories: ICategories) {
        this._setId(listCategories);
        this._setTitle(listCategories);
    }
    /**
     * set id
     * @param id
     * @private
     */
    private _setId({id}: ICategories) {
        this.id = id;
    }

    /**
     * set title
     * @param title
     * @private
     */
    private _setTitle({title}: ICategories) {
        this.title = title;
    }
}

export class BlogModel {
    id: number | null = null;
    title: string | undefined;
    img: string | undefined;
    seen: number | null = null;
    createdAt: string | undefined;
    blogTags: ITags[] = [];
    blogCategories: ICategories[] = [];
    constructor(item: IBlog) {
        this._setId(item);
        this._setTitle(item);
        this._setImg(item);
        this._setSeen(item);
        this._setCreatedAt(item);
        this._setBlogTags(item);
        this._setBlogCategories(item);
    }

    /**
     * set id
     * @param id
     * @private
     */
    private _setId({id}: IBlog) {
        this.id = id;
    }

    /**
     * set title
     * @param title
     * @private
     */
    private _setTitle({title}: IBlog) {
        this.title = title;
    }

    /**
     * set img
     * @param img
     * @private
     */
    private _setImg({img}: IBlog) {
        this.img = img;
    }

    /**
     * set seen
     * @param seen
     * @private
     */
    private _setSeen({seen}: IBlog) {
        this.seen = seen;
    }

    /**
     * set createdAt
     * @param createdAt
     * @private
     */
    private _setCreatedAt({createdAt}: IBlog) {
        let splitedItem: any = createdAt?.split('T')[0];
        let reversedDate = splitedItem.split('-').reverse().join('.')
        this.createdAt = reversedDate
    }

    /**
     * set blogTags
     * @param blogTags
     * @private
     */
    private _setBlogTags({blogTags}: IBlog) {
        this.blogTags = blogTags.map((list: any) =>{
            return new BlogTagsModel(list)
        })
    }

    /**
     * set blogCategories
     * @param blogCategories
     * @private
     */
    private _setBlogCategories({blogCategories}: IBlog) {
        this.blogCategories = blogCategories.map((listCategories: any) => {
            return new BlogCategoryModel(listCategories)
        })
    }
}