import css from './video.module.scss';
import React, {useEffect, useRef, useState} from "react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import * as data from '../../assets/db/db.json';
import {useSelector} from "react-redux";
const VideoComponent = () => {
    const videoRef: any = useRef(null);
    const lang = useSelector(({publicReducers}: any)=>publicReducers.lang)
    const [staticContent,setStaticContent] = useState<any>(null);

    useEffect(() => {
        let dataList: any = data;
        setStaticContent(dataList[lang]?.video)
    },[lang])

    useEffect(() => {
        const player = videojs(videoRef.current, {
            preload: "auto",
            autoplay: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            controls: true,
            sources: [{
                src: '/videos/lorex4.mp4',
                type: 'video/webm'
            }],
            poster: '/images/group-182.png',
            posterTest: 'test',
            responsive: true,
            width: 1000,
            height: 450,
            // fluid: true,
        })


        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                // playerRef.current = null;
            }
        }
    },[videoRef])
    return (
        <div id='video' className={css.video}>
            {/*<div className={css.video__wrapper}>*/}
            {/*    <h2>{staticContent}</h2>*/}
            {/*</div>*/}
            <div data-vjs-player>
                <video ref={videoRef} className={'video-js'}></video>
            </div>
        </div>
    )
}

export default VideoComponent;