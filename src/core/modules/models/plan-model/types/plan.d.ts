export interface IPlan {
    id: number | null;
    title: string | undefined;
    description: string | undefined;
    members: string | undefined;
    memberUnit: string | undefined;
    price: string | undefined;
    priceUnit: string | undefined;
    sort: number | null;
}