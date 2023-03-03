export interface IBlog {
    id: number | null;
    title: string | undefined;
    img: string | undefined;
    seen: number | null;
    createdAt: string | undefined;
    blogTags: ITags[] | [];
    blogCategories: ICategories[] | [];
}

export interface ITags {
    id: number | null;
    title: string | undefined;
}

export interface ICategories {
    id: number | null;
    title: string | undefined;
}