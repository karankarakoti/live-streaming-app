import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

import { Box, Button, Flex, Image, Text } from "atoms";
import { updateBroadcaster } from "redux/actions";
import { generatePublicUrl } from "utils/utilities"

import { FaUserCircle } from "react-icons/fa";
import { TbLock, TbLockOpen } from "react-icons/tb";

export const BroadcasterCard = ({data}) => {

  const dispatch = useDispatch();

  return (
    <Flex
      borderRadius="0.2rem"
      boxShadow= "rgba(0, 0, 0, 0.24) 0px 3px 8px"
      px="2rem"
      py="1.5rem"
      bg={data.status ? "white" : "grey.100"}
    >
      <Box
        position="absolute"
        width="1rem"
        height="1rem"
        bg={data.status ? "success.100" : "danger.100"}
        borderRadius="50%"
        top="1rem"
        right="1rem"
      />
      <Box mr="2rem">
        <Box width="4rem" height="4rem" borderRadius="50%">
          {data.imageUrl ?
            <Image
              src={data.imageUrl ? generatePublicUrl(data.imageUrl) : "/user-avatar.png"}
              alt={data.firstName + " " + data.lastName}
              borderRadius="50%"
            />
          : <Box color="info.200">
              <FaUserCircle fontSize="4rem"/>
            </Box>            
          }
        </Box>
        <Button mt="1rem" variant={data.status ? "danger" : "success"} p="0.4rem" onClick={() => dispatch(updateBroadcaster(data._id))}>
          <Box>
            {data.status ? <TbLock fontSize="1.6rem"/> : <TbLockOpen fontSize="1.6rem" />}
          </Box>
        </Button>
      </Box>
      <Box>
        <Text fontSize="1.6rem" fontWeight="600">{data.firstName + " " + data.lastName}</Text>
        <Text fontSize="1.4rem" color="gray" mt="0.4rem">{data.email}</Text>
        <Text fontSize="1.2rem" color="gray" mt="0.4rem">Created - {moment(data.createdAt).fromNow()}</Text>        
      </Box>
    </Flex>
  )
}