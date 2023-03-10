import {IBlogTags} from "../blog-tags-model/types/blog-tags";
import {IBlogCategory, IBlogDetail} from "./types/blog-detail";

export class BlogDetailModel {
    id: number | null = null;
    title: string | undefined;
    description: string | undefined;
    body: string | undefined;
    img: string | undefined;
    seen: number | null = null;
    createdAt: string | undefined;
    blogTags: IBlogTags[] | [] = [];
    blogCategories: IBlogCategory[] | [] = [];

    constructor(item: IBlogDetail) {
        this._setId(item);
        this._setTitle(item);
        this._setDescription(item);
        this._setBody(item);
        this._setImg(item);
        this._setSeen(item);
        this._setCreatedAt(item);
        this._setBlogTags(item);
        this._setBlogCategories(item);
    }

    private _setId({id}: IBlogDetail) {
        this.id = id;
    }

    private _setTitle({title}: IBlogDetail) {
        this.title = title;
    }

    private _setDescription({description}: IBlogDetail) {
        this.description = description;
    }

    private _setBody({body}: IBlogDetail) {
        this.body = body;
    }

    private _setImg({img}: IBlogDetail) {
        this.img = img;
    }

    private _setSeen({seen}: IBlogDetail) {
        this.seen = seen;
    }

    private _setCreatedAt({createdAt}: IBlogDetail) {
        let splitedItem: any = createdAt?.split('T')[0];
        let reversedDate = splitedItem.split('-').reverse().join('.')
        this.createdAt = reversedDate
    }

    private _setBlogTags({blogTags}: IBlogDetail) {
        this.blogTags = blogTags.map((list: any) => {
            return new BlogTagsDetailModel(list)
        })
    }

    private _setBlogCategories({blogCategories}: IBlogDetail) {
        this.blogCategories = blogCategories.map((categoryList: any) => {
            return new BlogCategoryDetailModel(categoryList);
        })
    }
}

class BlogTagsDetailModel {
    id: number | null = null;
    title: string | undefined;

    constructor(blogTags: IBlogTags) {
        this._setId(blogTags);
        this._setTitle(blogTags);
    }

    /**
     * set id
     * @param id
     * @private
     */
    private _setId({id}: IBlogTags) {
        this.id = id;
    }

    /**
     * set title
     * @param title
     * @private
     */
    private _setTitle({title}: IBlogTags) {
        this.title = title;
    }
}

class BlogCategoryDetailModel {
    id: number | null = null;
    title: string | undefined;
    description: string | undefined;

    constructor(blogCategory: IBlogCategory) {
        this._setId(blogCategory);
        this._setTitle(blogCategory);
        this._setDescription(blogCategory);
    }

    private _setId({id}: IBlogCategory) {
        this.id = id;
    }

    private _setTitle({title}: IBlogCategory) {
        this.title = title;
    }

    private _setDescription({description}: IBlogCategory) {
        this.description = description;
    }
}