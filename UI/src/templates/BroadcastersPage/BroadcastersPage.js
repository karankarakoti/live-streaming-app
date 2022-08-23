import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Grid, Flex, Text } from "atoms";
import { BroadcasterCard, BroadcasterModal } from "molecules";
import ErrorPage from "pages/error-page";
import { getBroadcasters } from "redux/actions";
import { Layout } from "templates";

export const BroadcastersPage = ({}) => {

  const [ broadcasterModal, setBroadcasterModal ] = useState(false)    
  const dispatch = useDispatch();
  const app = useSelector(state => state.app);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getBroadcasters())
  }, [])

  if(auth.user?.role !== "admin"){
    return <ErrorPage/>;
  } 

  return(
    <Layout>
      {broadcasterModal && <BroadcasterModal
        isOpen={broadcasterModal}
        onRequestClose={() => setBroadcasterModal(null)} 
        ariaHideApp={() => setBroadcasterModal(null)}                  
      />}
      <Flex justifyContent="space-between" px="2rem" mt="3rem">
        <Box>
          <Text fontSize="1.8rem" textTransform="uppercase">Broadcasters</Text>
        </Box>
        <Button width="15rem" variant="info" py="1rem" onClick={() => setBroadcasterModal(true)}>
          <Text fontSize="1.4rem">+ New Broadcaster</Text>
        </Button>
      </Flex>
      <Grid
        gridTemplateColumns={{xs: "1fr", md: "repeat(3, 1fr)", xm: "repeat(4, 1fr)", lg: "repeat(6, 1fr)"}}
        gridColumnGap="3rem"
        gridRowGap="3rem"
        placeItems="center"
        my="4rem"
        px="2rem"
      >
        {
          app.broadcasters?.map((item)=>(
            <BroadcasterCard
              key={item._id}
              data={item}              
            />
          ))
        }
      </Grid>          
    </Layout>
  )
}