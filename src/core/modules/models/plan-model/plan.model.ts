import {IPlan} from "./types/plan";

export class PlanModel {
    public id: number | null = null;
    public title: string | undefined;
    public description: string | undefined;
    public members: string | undefined;
    public memberUnit: string | undefined;
    public price: string | undefined;
    public priceUnit: string | undefined;
    public sort: number | null = null;

    constructor(item: IPlan) {
        this._setId(item);
        this._setTitle(item);
        this._setDescription(item);
        this._setMembers(item);
        this._setMemberUnit(item);
        this._setPrice(item);
        this._setPriceUnit(item);
        this._setSort(item);
    }

    /**
     * set id
     * @param id
     * @private
     */
    private _setId({id}: IPlan) {
        this.id = id;
    }

    /**
     * set title
     * @param title
     * @private
     */
    private _setTitle({title}: IPlan) {
        this.title = title;
    }

    /**
     * set description
     * @param description
     * @private
     */
    private _setDescription({description}: IPlan) {
        this.description = description;
    }

    /**
     * set members
     * @param members
     * @private
     */
    private _setMembers({members}: IPlan) {
        this.members = members;
    }

    /**
     * set memberUnit
     * @param memberUnit
     * @private
     */
    private _setMemberUnit({memberUnit}: IPlan) {
        this.memberUnit = memberUnit;
    }

    /**
     * set price
     * @param price
     * @private
     */
    private _setPrice({price}: IPlan) {
        this.price = price;
    }

    /**
     * set sort
     * @param sort
     * @private
     */
    private _setSort({sort}: IPlan) {
        this.sort = sort;
    }

    /**
     * set priceUnit
     * @param priceUnit
     * @private
     */
    private _setPriceUnit({priceUnit}: IPlan) {
        this.priceUnit = priceUnit;
    }
}