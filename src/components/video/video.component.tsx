import css from './video.module.scss';
import React, {useEffect, useRef} from "react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
const VideoComponent = () => {
    const videoRef: any = useRef(null);

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
            poster: '/images/Group 182.png',
            posterTest: 'test',
            responsive: true,
            width: 1000,
            height: 450,
            // fluid: true,
        })


        return () => {
            if (player && !player.isDisposed()) {
                console.log(player)
                player.dispose();
                // playerRef.current = null;
            }
        }
    },[videoRef])
    return (
        <div id='video' className={css.video}>
            <div data-vjs-player>
                <video ref={videoRef} className={'video-js'}></video>
            </div>
        </div>
    )
}

export default VideoComponent;