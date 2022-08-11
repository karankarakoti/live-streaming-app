import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Flex, Text } from "atoms";
import { navData } from "./data";
import { AuthModal } from "molecules";
import { logout } from "redux/actions";

import { BiMenuAltRight } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";

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

  const [ authModal, setAuthModal ] = useState(false);
  const [ mobileMenu, setMobileMenu ] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(()=>{
    if(auth.authenticate){
      setAuthModal(false)
    }
  }, [auth])  
  

  return(
    <>
      {
        authModal &&
          <AuthModal
            isOpen={authModal}
            onRequestClose={() => setAuthModal(false)}
            ariaHideApp={() => setAuthModal(false)}
          />
      }
      <Flex
        height="5rem"
        py="1.5rem"
        px="1.5rem"
        bg="white"
        borderBottom="2px solid"
        borderColor="whitesmoke"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text>Live Streaming App</Text>
        </Box>
        <Box display={{xs: "block", xm: "none"}} onClick={() => setMobileMenu(!mobileMenu)}>
          {
            mobileMenu ?
              <VscClose fontSize="2rem"/>
            : <BiMenuAltRight fontSize="2rem"/>
          }
          
        </Box>
        <Box display={{xs: "none", xm: "flex"}}>      
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
                onClick={()=>dispatch(logout())}
              />
            : <NavOption                          
              name={"Login/Signup"}
              onClick={()=>setAuthModal(true)}
            />
          }               
        </Box>        
      </Flex>
      {
        mobileMenu &&
        <Box display={{xs: "flex", xm: "none"}} flexDirection="column" width="100%">      
          {navData?.map(item => {
            switch(item.type){
              case 0:
                return(
                  <Box px="2rem" py="1rem" borderBottom="1px solid" borderColor="whitesmoke">
                    <NavOption
                      key={item.id}                  
                      name={item.name}
                      href={item.href}
                    />   
                  </Box>           
                )              

              case 1:
                if(user){
                  return(
                    <Box px="2rem" py="1rem" borderBottom="1px solid" borderColor="whitesmoke">
                      <NavOption
                        key={item.id}                  
                        name={item.name}
                        href={item.href}
                      />   
                    </Box>   
                  )
                }else return;
                
              case 2:                  
                if(item.access.includes(user?.role)){                
                  return(
                    <Box px="2rem" py="1rem" borderBottom="1px solid" borderColor="whitesmoke">
                      <NavOption
                        key={item.id}                  
                        name={item.name}
                        href={item.href}
                      />   
                    </Box>   
                  )
                }else return;

            }
          })}
          {
            user ?
              <Box px="2rem" py="1rem" borderBottom="1px solid" borderColor="whitesmoke">
                <NavOption                            
                  name={"Logout"}
                  onClick={()=>dispatch(logout())}
                />
              </Box>
            : <Box px="2rem" py="1rem" borderBottom="1px solid" borderColor="whitesmoke">
              <NavOption                          
                name={"Login/Signup"}
                onClick={()=>setAuthModal(true)}
              />
            </Box>
          }               
        </Box>
      }
    </>
  )
}