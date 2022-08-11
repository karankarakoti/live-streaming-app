import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Grid, Flex, Text } from "atoms";
import { StreamCard, StreamModal } from "molecules";
import { getMyStreams } from "redux/actions";
import { Layout } from "templates";
import ErrorPage from "pages/error-page";

export const MyStreamPage = ({}) => {

  const [ streamModal, setStreamModal ] = useState(false)
  const dispatch = useDispatch();
  const app = useSelector(state => state.app);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMyStreams());
  }, [])

  if(auth.user?.role !== "streamer"){
    return <ErrorPage/>;
  }

  return(
    <Layout>
      {streamModal && <StreamModal
        isOpen={streamModal}
        onRequestClose={() => setStreamModal(false)}        
        ariaHideApp={() => setStreamModal(false)}        
      />}
      <Flex justifyContent="space-between" px="2rem" mt="3rem">
        <Box>
          <Text fontSize="1.8rem" textTransform="uppercase">My Streams</Text>
        </Box>
        <Button width="15rem" variant="info" py="1rem" onClick={() => setStreamModal(true)}>
          <Text>+ New Stream</Text>
        </Button>
      </Flex>
      <Grid
        gridTemplateColumns={{xs: "1fr", md: "repeat(2, 1fr)", xm: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}}
        gridColumnGap="3rem"
        gridRowGap="3rem"
        placeItems="center"
        my="4rem"
      >
        {
          app.myStreams?.map((item)=>(
            <StreamCard
              key={item._id}
              streamTitle={item.streamTitle}
              streamKey={item.streamKey}
              streamThumbnail={item.streamThumbnail}
              isStreamingNow={item.isStreamingNow}
              isSecuredStream={item.isSecuredStream}
              streamPrice={item.streamPrice ? item.streamPrice : null}
              createdBy={item.createdBy}
              editMode
            />
          ))
        }
      </Grid>          
    </Layout>
  )
}