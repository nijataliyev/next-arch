export interface IModalProps {
    size?: string;
    position?: string;
    title?: string;
    children: React.ReactNode;
    show: boolean;
    setShow: any;
    hideHeader?:boolean,
    closeIcon? : any,
    loading? : boolean,
    classes? : string
    header?:string
}

export interface IProps {
    children: React.ReactNode;
}