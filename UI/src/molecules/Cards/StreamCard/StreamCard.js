import React from "react";
import { Link } from "react-router-dom";

import { Box, Flex, Image, Text } from "atoms";
import { Button } from "atoms";
import { generatePublicUrl } from "utils/utilities";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { TbCurrencyRupee } from "react-icons/tb";

export const StreamCard = ({streamTitle, streamKey, streamThumbnail, isStreamingNow, isSecuredStream, streamPrice, createdBy, editMode}) => {
  return(
    <Box
      width={{ xs: "90vw", md: "90%", xm: "95%" }}
      borderRadius="0.4rem"
      boxShadow= "rgba(0, 0, 0, 0.24) 0px 3px 8px"
      height="auto"
      // border="1px solid"
      // borderColor="whitesmoke"
    >
      <Box
        width="100%"
        //height={{ xs: "18rem", md: "24rem"}}           
      >
        <Image
          src={streamThumbnail ? streamThumbnail : generatePublicUrl(streamKey+".png")}
          alt={streamTitle}   
          borderRadius="0.4rem"
        />
        {
          isStreamingNow &&        
            <Box
              position="absolute"
              width="4rem"
              top="0"
              right="0.5rem"
            >
              <Image
                src="/favicon.png"
                alt="live-icon"
              />
            </Box>
        }
      </Box>
      <Flex mt="1.5rem" flexDirection="column" justifyContent="space-between">
        <Flex alignItems="start" px="1rem">
          <Box width="4rem" height="4rem" bg="gray" borderRadius="50%" mr="1rem">

          </Box>
          <Box>
            <Text fontSize="1.6rem" fontWeight="500">
              {streamTitle}
            </Text>
            <Text fontSize="1.4rem" mt="0.4rem" color="gray">
              {createdBy.firstName} {createdBy.lastName}
            </Text>
            {
              editMode && streamPrice && <Flex>
                <Box mt="0.55rem" color="gray">
                  <TbCurrencyRupee fontSize="1.4rem" />
                </Box>
                <Text fontSize="1.4rem" mt="0.4rem" color="gray">
                  {streamPrice}
                </Text>
              </Flex>
            }
          </Box>
        </Flex>
        {editMode ?
          <Flex mt="2rem">
            <Button
              width="100%"
              variant="success"
              py="0.6rem"
              color="white"              
            >
              <HiOutlineClipboardCopy fontSize="2rem"/>
            </Button>
            <Button
              width="100%"
              variant="warning"
              py="0.6rem"
              color="white"              
            >
              <AiOutlineEdit fontSize="2rem"/>
            </Button>
            <Button
              width="100%"
              variant="danger"
              py="0.6rem"
              color="white"
            >
              <AiOutlineDelete fontSize="2rem"/>
            </Button>
          </Flex>
        : isSecuredStream ? 
            <Button
              variant="danger"
              width="20rem"              
              my="2rem"
              mx="auto"
            >
              <Text py="0.8rem" fontSize="1.6rem">
                Book Now
              </Text>              
            </Button>
            
          : <Link to={`/stream/${streamKey}`}>
            <Button
              variant="success"
              width="20rem"              
              my="2rem"
              mx="auto"
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