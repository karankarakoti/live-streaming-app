import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Box, Button, Flex, Image, Text } from "atoms";
import { createStreamToken, deleteStream } from "redux/actions";
import { generatePublicUrl } from "utils/utilities";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { TbCurrencyRupee } from "react-icons/tb";

export const StreamCard = ({id, streamTitle, streamKey, streamThumbnail, isStreamingNow, isSecuredStream, streamPrice, createdBy, editMode, onEdit}) => {

  const dispatch = useDispatch()

  const onCreateStreamToken = () => {
    dispatch(createStreamToken(id, streamKey))
  }

  const onDelete = () => {
    dispatch(deleteStream(id))
  }

  return(
    <Box
      width={{ xs: "90vw", md: "90%", xm: "95%" }}
      borderRadius="0.4rem"
      boxShadow= "rgba(0, 0, 0, 0.24) 0px 3px 8px"
      height="auto"      
    >
      <Box
        width="100%"        
      >
        <Image
          src={streamThumbnail ? generatePublicUrl(streamThumbnail) : generatePublicUrl(streamKey+".png")}
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
          <Box width="4rem" height="4rem" borderRadius="50%" mr="1rem">
            {
              createdBy.imageUrl ?           
                <Image
                  src={generatePublicUrl(createdBy.imageUrl)}
                  alt={createdBy.firstName + " " + createdBy.lastName}
                  borderRadius="50%"
                />
              : <Box color="info.200">
                <FaUserCircle fontSize="4rem"/>
              </Box>
            }
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
              onClick={() => onCreateStreamToken()}          
            >
              <HiOutlineClipboardCopy fontSize="2rem"/>
            </Button>
            <Button
              width="100%"
              variant="warning"
              py="0.6rem"
              color="white"   
              onClick={onEdit}           
            >
              <AiOutlineEdit fontSize="2rem"/>
            </Button>
            <Button
              width="100%"
              variant="danger"
              py="0.6rem"
              color="white"
              onClick={()=>onDelete()}
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