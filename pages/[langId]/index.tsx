import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAmbulance} from '@fortawesome/free-solid-svg-icons'
// import styles from '../styles/Home.module.css'
import common from '../styles/Main.module.scss'
import LearningComponent from "../../src/components/learning/learning.component";
import VideoComponent from "../../src/components/video/video.component";
import SliderComponent from "../../src/components/slider/slider.component";
import PlanningComponent from "../../src/components/planning/planning.component";
import PartnersComponent from "../../src/components/partners/partners.component";
import ContactComponent from "../../src/components/contact/contact.component";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {setLocalization} from "../../src/store/modules/public-store/public-actions";
import {useDispatch} from "react-redux";
import {container} from "tsyringe";
import {BlogService} from "../../src/core/modules/services/blog-service/blog-service";

export async function getServerSideProps(context:any) {
    const availableLangs = ['az', 'en','ru']
    if (availableLangs.includes(context.query.langId)){
     return {
         props: {

         }
     }
    }
    return {
            notFound: true,
    }
}
export default function Home() {


    return (
        <div>
                    <LearningComponent></LearningComponent>
                    <VideoComponent></VideoComponent>
                    <SliderComponent></SliderComponent>
                    <PlanningComponent></PlanningComponent>
                    <PartnersComponent></PartnersComponent>
                    <ContactComponent></ContactComponent>

        </div>
    )
}
