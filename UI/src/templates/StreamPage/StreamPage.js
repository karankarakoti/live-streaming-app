import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Flex, Image, Loader, Text } from "atoms";
import { VideoJS } from "molecules";
import { getStreamInfo } from "redux/actions";
import { Layout } from "templates";
import { config } from "../../utils/config";
import { generatePublicUrl } from "utils/utilities";

import { FaUserCircle } from "react-icons/fa";

export const StreamPage = () => {

  const { id } = useParams();
  const playerRef = useRef(null);   
  const dispatch = useDispatch();
  const app = useSelector(state => state.app);
  
  const [ delayEnd, setDelayEnd ] = useState(false);      

  document.title = `${app.stream?.streamTitle || ""} | Live Streaming App`

  useEffect(() => {
    app.stream = {}
    dispatch(getStreamInfo(id));        
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if(app.stream){
        let sec = new Date() - new Date(app.stream?.updatedAt)      
        if(sec > 0){          
          if(sec < 5000){  
            setTimeout(()=>{
              setDelayEnd(true);
            }, 5000-sec)
          }else{
            setDelayEnd(true);
          }
        }                
      }
    }, 1000)    
  }, [app.stream])
  
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

    player.on("ready", () => {
      // console.log("ready")      
    });

    player.on("waiting", () => {
      // console.log("waiting")      
    });

    player.on("dispose", () => {
      // videojs.log("player will dispose");
    })

  }

  return(
    <Layout>
      {
        !app.stream ?
          <Loader/>
        : <Box mx="auto" width="fit-content">
          <Box height="45vw" width="80vw" my="2rem">            
            {
              app.stream.isStreamingNow ?
                delayEnd ?
                  <VideoJS
                    options={videoJsOptions}
                    onReady={handlePlayerReady}
                  /> 
                : <Flex alignItems="center" justifyContent="center" bg="black" borderRadius="0.4rem" width="100%" height="100%">
                  <Text color="white" fontSize="2rem" fontWeight="600">
                    Stream Starting Soon!
                  </Text>
                </Flex>
              : <Flex alignItems="center" justifyContent="center" bg="black" borderRadius="0.4rem" width="100%" height="100%">
                  <Text color="white" fontSize="2rem" fontWeight="600">
                    Stream Finished
                  </Text>
                </Flex>
            }                        
          </Box>                   
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
        </Box>  
      } 
    </Layout>
  )
}