import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import videojs from "video.js";

import { Box } from "atoms";
import { VideoJS } from "molecules";
import { Layout } from "templates";
import { config } from "../../utils/config";

export const StreamPage = () => {

  const { id } = useParams();
  const playerRef = useRef(null);   
  
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: `${config.RTMP_URL}:${config.RTMP_HTTP_PORT}/live/${id}/index.m3u8`,
      type: "application/x-mpegURL"
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    })

  }

  return(
    <Layout>
      <Box height={{xs: "66rem", xm: "72rem"}} width={{xs: "90vw", xm: "120rem"}} my="4rem" mx="auto">
        <VideoJS
          options={videoJsOptions}
          onReady={handlePlayerReady}
        />
      </Box>
    </Layout>
  )
}