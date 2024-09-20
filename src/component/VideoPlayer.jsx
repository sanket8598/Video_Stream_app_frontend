import React, { useEffect } from "react";
import videojs from "video.js";
import Hls from "hls.js";
import "video.js/dist/video.js.css";
import toast from "react-hot-toast";

function VideoPlayer({ src }) {

    const videoRef = useRef(null);
    const palyerRef = useRef(null);

    useEffect(() => {
        palyerRef.current = videojs(videoRef.current, {
            controls: true,
            autoplay: true,
            muted: true,
            preload: "auto"
        });

        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(src)
            hls.attachMedia(videoRef.current)
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
            });
        } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            videoRef.current.src=src;
            videoRef.current.addEventListener('canplay',()=>{
                videoRef.current.play();
            })
        }else{
            console.log("Video fromat not supported");
            toast.error("Video Format not supported");
        }

    }, [src])
    return (
        <div>
            <div data-vjs-player>
                <video ref={videoRef} 
                 style={{
                    width:"100%",
                    height:"550px"
                 }}
                 className="video-js vjs-control-bar"
                />
            </div>
        </div>
    )

}

export default VideoPlayer;