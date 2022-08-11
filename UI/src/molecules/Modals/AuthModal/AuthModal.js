import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

import { Box, Flex, Image } from "atoms";
import { LoginForm, SigninForm } from "molecules";

import "react-toastify/dist/ReactToastify.css";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "4px",
    padding: "0px",
    border: "none",    
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: "6"
  },
};

export const AuthModal = ({ isOpen, onRequestClose, ariaHideApp }) => {

  const [ authType, setAuthType ] = useState("login")
  const auth = useSelector(state => state.auth)

  useEffect(()=>{
    if(auth.error){
      toast.error(auth.error);
      auth.error = null;
    }
    if(auth.message !== ""){
      toast.success(auth.message)
      auth.message = ""
    }    
  }, [auth])  

  return(
    <>
      <ToastContainer/>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        ariaHideApp={ariaHideApp}
      >
        <Flex 
          width={{xs: "80vw", md: "60vw", xm: "84rem"}} 
          height="fit-content" 
          bg="white"
          flexDirection={{ xs: "column", xm: "row" }}          
          className="hide-scrollbar"          
        >
          <Box width={{xm: "50%"}}>
            <Image
              src="/stream.jpg"
              alt="stream"
              height="100%"
            />
          </Box>
          <Box
            width={{xm: "50%"}}            
            px="2rem"
            py="1rem"            
          >
            { 
              authType === "login" ?
                <LoginForm
                  setAuthType={setAuthType}
                />
              : <SigninForm
                setAuthType={setAuthType}
              />
            }
          </Box>
        </Flex>
      </Modal>
    </>
  )
}