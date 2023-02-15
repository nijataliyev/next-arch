import {IPartners} from "./types/partners";

export class PartnersModule {
    id: number | null = null;
    title: string | undefined;
    icon: string | undefined;
    contact: string | undefined;
    link: string | undefined;

    constructor(item: IPartners) {
        this._setId(item);
        this._setTitle(item);
        this._setIcon(item);
        this._setContact(item);
        this._setLink(item);
    }

    /**
     * set id
     * @param id
     * @private
     */
    private _setId({id}: IPartners) {
        this.id = id;
    }

    /**
     * set title
     * @param title
     * @private
     */
    private _setTitle({title}: IPartners) {
        this.title = title;
    }

    /**
     * set icon
     * @param icon
     * @private
     */
    private _setIcon({icon}: IPartners) {
        this.icon = icon;
    }

    /**
     * set contact
     * @param contact
     * @private
     */
    private _setContact({contact}: IPartners) {
        this.contact = contact;
    }

    /**
     * set link
     * @param link
     * @private
     */
    private _setLink({link}: IPartners) {
        this.link = link;
    }
}