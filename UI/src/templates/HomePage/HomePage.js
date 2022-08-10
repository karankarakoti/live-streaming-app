import React, { useEffect, useState } from "react";

import { StreamCard } from "molecules";
import { Layout } from "templates";
import axiosInstance from "utils/axios";
import { Grid } from "atoms";

export const HomePage = () => {

  const [ liveStreams, setLiveStreams ] = useState([]);

  useEffect(() => {
    getLiveStreams()
  }, [])

  const getLiveStreams = async() => {
    const response = await axiosInstance.get("/streams/live");
    setLiveStreams(response.data)
  }

  return(
    <Layout>  
      <Grid
        gridTemplateColumns={{xs: "1fr", md: "repeat(2, 1fr)", xm: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}}
        gridColumnGap="3rem"
        gridRowGap="3rem"
        placeItems="center"
        my="4rem"
      >
        {
          liveStreams.map((item)=>(
            <StreamCard 
              key={item._id}
              streamTitle={item.streamTitle}
              streamKey={item.streamKey}
              streamThumbnail={item.streamThumbnail}
              isStreamingNow={item.isStreamingNow}
              isSecuredStream={item.isSecuredStream}
              streamPrice={item.streamPrice ? item.streamPrice : null}
            />
          ))
        }
      </Grid>          
    </Layout>
  )
}