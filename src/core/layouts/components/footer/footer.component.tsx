import scss from './footer.module.scss';
import TopFooterComponent from "./components/top-footer/top-footer.component";
import BottomFooterComponent from "./components/bottom-footer/bottom-footer.component";
const FooterComponent = () => {
    return (
        <div>
            <TopFooterComponent/>
            <BottomFooterComponent/>
        </div>
    )
}

export default FooterComponent;