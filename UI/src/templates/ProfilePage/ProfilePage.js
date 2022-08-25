import React from "react";
import { useSelector } from "react-redux";

import { Box, Flex, Image, Text } from "atoms";
import { ChangePasswordForm } from "molecules";
import ErrorPage from "pages/error-page";
import { Layout } from "templates";
import { generatePublicUrl } from "utils/utilities";

import { AiOutlineEdit } from "react-icons/ai";

export const ProfilePage = ({}) => {

  const auth = useSelector(state => state.auth);

  if(!auth.user){
    return <ErrorPage/>;
  }

  return(
    <Layout>
      <Box px={{xs: "2rem"}} py="2rem" maxWidth={{md:"72rem"}} mx="auto">
        <Box mb="2rem">
          <Text fontSize="1.6rem" fontWeight="600">My Profile</Text>
        </Box>
        <Flex flexDirection={{xs: "column", md: "row"}}>
          <Box 
            p="2rem" 
            borderRadius="0.4rem"
            boxShadow= "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            flex={{md: "0.4"}}
            mr={{md: "1rem"}}
            mb={{xs: "1rem", md: "0"}}
          >
            <Box
              borderBottom="2px solid"
              borderColor="whitesmoke"
              pb="0.5rem"
              mb="1.5rem"
            >
              <Text fontSize="1.4rem" fontWeight="600" textTransform="uppercase">Basic Details</Text>              
            </Box>
            <Box width="10rem" height="10rem" mx="auto">
              <Image
                src={auth.user.imageUrl ? generatePublicUrl(auth.user.imageUrl) : "https://via.placeholder.com/150"}
                alt={auth.user.firstName + " " + auth.user.lastName}
                borderRadius="50%"
              />
              <Flex
                position="absolute"
                bottom="0"
                right="-0.5rem"
                cursor="pointer"
                onClick={() => {}}
                boxShadow= "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                bg="white"
                borderRadius="50%"                
                width="3rem"
                height="3rem"
                alignItems="center"
                justifyContent="center"
              >
                <AiOutlineEdit fontSize="2rem" />
              </Flex>
            </Box>
            <Box mt="1rem" width="fit-content" mx="auto">
              <Text fontSize="1.6rem" fontWeight="600" textAlign="center">
                <Box
                  position="absolute"
                  bg={auth.user.status ? "success.100" : "danger.100"}
                  width="1rem"
                  height="1rem"
                  borderRadius="50%"
                  left={{xs: "-1rem", md: "-0.5rem"}}
                  top="0.5rem"
                />
                {auth.user.firstName + " " + auth.user.lastName}
              </Text>
              <Text textAlign="center" fontSize="1.2rem" fontWeight="500" mt="0.4rem">{auth.user.email}</Text>
            </Box>
          </Box>
          <Box 
            flex={{md: "0.6"}} 
            p="2rem" 
            borderRadius="0.4rem"
            boxShadow= "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            ml={{md: "1rem"}}
            mt={{xs: "1rem", md: "0"}}
          >
            <Box
              borderBottom="2px solid"
              borderColor="whitesmoke"
              pb="0.5rem"
              mb="1.5rem"
            >
              <Text fontSize="1.4rem" fontWeight="600" textTransform="uppercase">Change Password</Text>              
            </Box>
            <ChangePasswordForm/>
          </Box>
        </Flex>
      </Box>
    </Layout>
  )
}