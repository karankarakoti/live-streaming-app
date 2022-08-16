import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { Box, Button, Flex, Text } from "atoms";
import { config } from "utils/config";

import { TbClipboard } from "react-icons/tb";
import { resetStreamTokenData } from "redux/actions";

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

export const StreamTokenModal = ({ isOpen, onRequestClose, ariaHideApp }) => {  

  const dispatch = useDispatch();
  const app = useSelector(state => state.app);

  const copyToClipboard = (id) => {
    const field = document.getElementById(id);    
    navigator.clipboard.writeText(field.value);
    toast.success("Copied to Clipboard")
  }

  const closeModal = () => {
    dispatch(resetStreamTokenData());
    onRequestClose();
  }

  return(
    <> 
      <ToastContainer/>     
      <Modal
        isOpen={isOpen}
        // onRequestClose={onRequestClose}
        style={customStyles}
        // ariaHideApp={ariaHideApp}
      >
        <Box 
          width={{xs: "80vw", md: "60vw", xm: "72rem"}} 
          height="fit-content" 
          bg="white" 
          py="2rem"                   
          px="3rem"
        >  
          <Box mb="2rem">
            <Text fontWeight="600">Steps to Start Stream -</Text>
          </Box>   
          
          <Box mb="1rem">
            <Text color="gray">1. Download and Install OBS Studio on your PC/Laptop</Text>            
          </Box>                      
          <Box mb="1rem">
            <Text color="gray">2. Open OBS & Go to Settings, then select Stream and Set Service to Custom</Text>            
          </Box>                      
          <Box mb="2rem">
            <Text color="gray" mb="0.8rem">3. Copy Paste below URL in Server Section</Text>            
            <Flex ml="1.6rem">
              <Box 
                width="90%" 
                as="input" 
                value={`rtmp://${config.RTMP_IP}/live/`} 
                disabled 
                py="0.6rem"
                fontSize="1.6rem"
                color="black"
                px="1rem"
                id="server_url"
              />
              <Flex onClick={()=> copyToClipboard("server_url")} bg="success.100" width="10%" cursor="pointer" color="white" alignItems="center" justifyContent="center" borderRadius="0.4rem">
                <TbClipboard fontSize="2rem"/>
              </Flex>
            </Flex>            
          </Box>                                                   
          <Box mb="2rem">
            <Text color="gray" mb="0.8rem">4. Copy Paste below Secret Key in Stream Key</Text>            
            <Flex ml="1.6rem">
              <Box 
                width="90%" 
                as="input" 
                value={`${app.streamKey}?token=${app.streamToken}`} 
                disabled 
                py="0.6rem"
                fontSize="1.6rem"
                color="black"
                px="1rem"
                id="server_token"
              />
              <Flex onClick={()=> copyToClipboard("server_token")} bg="success.100" width="10%" cursor="pointer" color="white" alignItems="center" justifyContent="center" borderRadius="0.4rem">
                <TbClipboard fontSize="2rem"/>
              </Flex>
            </Flex>            
          </Box>                                                   
          <Box mb="1rem">
            <Text color="gray">5. Go Back & Start Streaming.</Text>            
          </Box>                      

          <Box>
            <Button variant="danger" width="15rem" ml="auto" mt="4rem" py="1rem" onClick={()=> closeModal()}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}