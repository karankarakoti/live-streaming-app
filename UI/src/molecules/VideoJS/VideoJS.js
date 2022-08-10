import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import 'video.js/dist/video-js.min.css';

export const VideoJS = ({options, onReady}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if(!playerRef.current){
      const videoElement = videoRef.current;
      if(!videoElement) return;
      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      });
    }else{
      // const player = playerRef.current;

      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return() => {
      if(player){
        player.dispose();
        playerRef.current = null;
      }
    }
  }, [playerRef]);
  
  return(
    <div data-vjs-player>
      <video ref={videoRef} className='video-js vjs-big-play-centered' />
    </div>
  )
}

export default VideoJS;