import React, { useState } from "react";
import VideoUpload from "./VideoUpload";
import { Toaster } from "react-hot-toast";
import VideoPlayer from "./VideoPlayer";
import { Button, TextInput } from "flowbite-react";

const Home = () => {

  const [videoId, setVideoId] = useState("68a76bc4-7efd-45ba-ab86-549b65613ea9");
  const[fieldValue,setFieldValue]=useState(null);

  function playVideo(videoId){
      setVideoId(videoId);
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center space-y-9  justify-center py-9">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100">Video Streaming App</h1>
        <div className="flex mt-14 w-full space-x-2 justify-between">
          <div>
            <h1 className="text-white text-center">Playing Video</h1>
            {/* <video style={{width:500}} 
                // src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`}
                src="http://localhost:8080/api/v1/videos/d77d6070-4956-4d7b-b2af-6965e6b220e9/master.m3u8"
                controls></video> */}

            <div className="w-full">
              <VideoPlayer src={`http://localhost:8080/api/v1/videos/${videoId}/master.m3u8`} />
            </div>
            {/* <video
              id="my-video"
              className="video-js"
              controls
              preload="auto"
              width="640"
              poster="MY_VIDEO_POSTER.jpg"
              data-setup="{}"
            >
              <source src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`} type="video/mp4" />
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank"
                >supports HTML5 video</a
                >
              </p>
            </video> */}
          </div>
          <div className="w-full">
            <VideoUpload />
          </div>
        </div>
        <div className="my-4 flex space-x-4">
          <TextInput onClick={(event)=>{
            setFieldValue(event.target.value);
          }} placeholder="Enter VideoId Here" name="video_id_field"></TextInput>
          <Button onClick={()=>{setVideoId(fieldValue)}}>Play</Button>
        </div>
      </div>
    </>
  )
}

export default Home;