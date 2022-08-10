import React from "react";
import { Link } from "react-router-dom";

import { Box, Flex, Image, Text } from "atoms";
import { Button } from "atoms";
import { baseUrl } from "utils/urlConfig";

export const StreamCard = ({streamTitle, streamKey, streamThumbnail, isStreamingNow, isSecuredStream, streamPrice}) => {
  return(
    <Box
      width={{ xs: "24rem", md: "32rem" }}
      borderRadius="0.4rem"
      border="1px solid"
      borderColor="whitesmoke"
    >
      <Box
        width="100%"
        //height={{ xs: "18rem", md: "24rem"}}           
      >
        <Image
          src={streamThumbnail ? streamThumbnail : `${baseUrl}/public/${streamKey}.png`}
          alt={streamTitle}   
          borderRadius="0.4rem"
        />
      </Box>
      <Flex mt="1rem" flexDirection="column" justifyContent="space-between">
        <Text fontSize="1.8rem" fontWeight="500" px="1rem">
          {streamTitle}
        </Text>
        {
          isSecuredStream ? 
            <Button
              variant="danger"
              width="100%"              
              mt="2rem"
            >
              <Text py="0.8rem" fontSize="1.6rem">
                Book Now
              </Text>              
            </Button>
          : <Link to={`/stream/${streamKey}`}>
            <Button
              variant="success"
              width="100%"
              mt="2rem"
            >
              <Text py="0.8rem" fontSize="1.6rem">
                View
              </Text>              
            </Button>
          </Link>
        }
      </Flex>
    </Box>
  )
}