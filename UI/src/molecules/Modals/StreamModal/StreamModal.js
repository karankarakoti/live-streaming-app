import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { Box, Flex, Image } from "atoms";

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

export const StreamModal = ({ isOpen, onRequestClose, ariaHideApp }) => {

  return(
    <>      
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        ariaHideApp={ariaHideApp}
      >
        <Flex 
          width={{xs: "80vw", md: "60vw", xm: "72rem"}} 
          height="fit-content" 
          bg="white"                    
        >                   
        </Flex>
      </Modal>
    </>
  )
}