import scss from './child-layout.module.scss';
function ChildRootLayoutComponent({children}: any){
    return (
        <div className={scss.child}>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        left
                    </div>
                    <div className="col-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChildRootLayoutComponent;