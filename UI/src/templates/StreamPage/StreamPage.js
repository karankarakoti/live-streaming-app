import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import videojs from "video.js";

import { Box, Flex, Image, Text } from "atoms";
import { VideoJS } from "molecules";
import { getStreamInfo } from "redux/actions";
import { Layout } from "templates";
import { config } from "../../utils/config";

import { FaUserCircle } from "react-icons/fa";
import { generatePublicUrl } from "utils/utilities";

export const StreamPage = () => {

  const { id } = useParams();
  const playerRef = useRef(null);   
  const dispatch = useDispatch();
  const app = useSelector(state => state.app);

  document.title = `${app.stream?.streamTitle || ""} | Live Streaming App`

  useEffect(() => {
    dispatch(getStreamInfo(id))
  }, [])
  
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
      <Box mx="auto" width="fit-content">
        <Box height="45vw" width="80vw" my="2rem">
          <VideoJS
            options={videoJsOptions}
            onReady={handlePlayerReady}
          />         
        </Box>
        {
          app.stream &&          
            <Box mt="1rem">
              <Text fontSize="1.8rem" fontWeight="600" mb="1.5rem">{app.stream?.streamTitle}</Text>
              <Flex mb="4rem">
                <Box width="3rem" height="3rem" borderRadius="50%" mr="1.4rem">
                  {
                    app.stream?.createdBy?.imageUrl ?           
                      <Image
                        src={generatePublicUrl(app.stream?.createdBy?.imageUrl)}
                        alt={app.stream?.createdBy.firstName + " " + app.stream?.createdBy.lastName}
                        borderRadius="50%"
                      />
                    : <Box color="info.200">
                      <FaUserCircle fontSize="4rem"/>
                    </Box>
                  }
                </Box>
                <Box>
                  <Text fontSize="1.4rem" fontWeight="600" color="gray">{app.stream?.createdBy?.firstName + " " + app.stream?.createdBy?.lastName}</Text>
                  <Text fontSize="1.2rem" fontWeight="500" color="grey.100" mt="0.5rem">Started - {moment(app.stream?.updatedAt).fromNow()}</Text>
                </Box>
              </Flex>
            </Box>
        }
      </Box>   
    </Layout>
  )
}