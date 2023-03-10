import {IBlogTags} from "../../blog-tags-model/types/blog-tags";

export interface IBlogDetail {
    id: number | null;
    title: string | undefined;
    description: string | undefined;
    body: string | undefined;
    img: string | undefined;
    seen: number | null;
    createdAt: string | undefined;
    blogTags: IBlogTags[] | [];
    blogCategories: IBlogCategory[] | [];
}

export interface IBlogCategory {
    id: number | null;
    title: string | undefined;
    description: string | undefined;
}