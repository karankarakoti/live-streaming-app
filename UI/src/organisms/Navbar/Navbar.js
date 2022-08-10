import React from "react";

import { Box, Flex, Text } from "atoms";
import { navData } from "./data";
import { NavLink } from "react-router-dom";

const NavOption = ({ name, href, onClick}) => (
  <>    
    {
      href ?
        <NavLink to={href}>
          <Text textTransform="uppercase" mx="1.5rem">{name}</Text>
        </NavLink>
      : <Box cursor="pointer" onClick={onClick}>
        <Text textTransform="uppercase" mx="1.5rem">{name}</Text>
      </Box>
    }
  </>
)

export const Navbar = ({ user }) => {
  return(
    <Flex
      height="5rem"
      py="1.5rem"
      px="1rem"
      bg="white"
      borderBottom="2px solid"
      borderColor="whitesmoke"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Text>Live Streaming App</Text>
      </Box>
      <Flex>      
        {navData?.map(item => {
          switch(item.type){
            case 0:
              return(
                <NavOption
                  key={item.id}                  
                  name={item.name}
                  href={item.href}
                />              
              )              

            case 1:
              if(user){
                return(
                  <NavOption
                    key={item.id}                    
                    name={item.name}
                    href={item.href}
                  />
                )
              }else return;
              
            case 2:                  
              if(item.access.includes(user?.role)){                
                return(
                  <NavOption
                    key={item.id}                    
                    name={item.name}
                    href={item.href}
                  />
                )
              }else return;

          }          
        })}
        {
          user ?
            <NavOption                            
              name={"Logout"}
              onClick={()=>console.log("logout")}
            />
          : <NavOption                          
            name={"Login/Signup"}
            onClick={()=>console.log("login")}
          />
        }               
      </Flex>
    </Flex>
  )
}