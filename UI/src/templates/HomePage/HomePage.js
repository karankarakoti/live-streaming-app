import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "atoms";
import { StreamCard } from "molecules";
import { getStreams } from "redux/actions";
import { Layout } from "templates";

export const HomePage = () => {
  
  const dispatch = useDispatch();
  const app = useSelector(state => state.app);

  useEffect(() => {    
    dispatch(getStreams());        
  }, [])  

  return(
    <Layout>  
      <Grid
        gridTemplateColumns={{xs: "1fr", md: "repeat(2, 1fr)", xm: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}}
        gridColumnGap="3rem"
        gridRowGap="3rem"
        placeItems="center"
        my="4rem"
        px="2rem"
      >
        {
          app.streams?.map((item)=>(
            <StreamCard 
              key={item._id}
              streamTitle={item.streamTitle}
              streamKey={item.streamKey}
              streamThumbnail={item.streamThumbnail}
              isStreamingNow={item.isStreamingNow}
              isSecuredStream={item.isSecuredStream}
              streamPrice={item.streamPrice ? item.streamPrice : null}
              createdBy={item.createdBy}
            />
          ))
        }      
      </Grid>          
    </Layout>
  )
}