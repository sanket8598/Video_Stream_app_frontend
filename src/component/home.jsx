import React from "react";
import VideoUpload from "./VideoUpload";

const Home=()=>{
    return (
        <>
        <div className="flex flex-col items-center space-y-9  justify-center py-9">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100">Video Streaming App</h1>
        <VideoUpload/>
        </div>
        </>
    )
}

export default Home;