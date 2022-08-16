import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";

import { Box, Button, Error, Flex, Image, Text } from "atoms";
import { createStream, editStream } from "redux/actions";

import { VscClose } from "react-icons/vsc";

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

const validationSchema = Yup.object({
  streamTitle: Yup.string()    
    .required("Stream Title Required")
    .max(100, "Max 100 characters allowed")
    .min(3, "Min 3 characters required"),    
});

export const StreamModal = ({ isOpen, onRequestClose, ariaHideApp, editMode, data }) => {

  const [ thumbnail, setThumbnail ] = useState(null);
  const dispatch = useDispatch();
  const onSubmit = async (values, { resetForm, setSubmitting }) => {        
    try{
      if(editMode){
        if(!values.isSecuredStream){
          values.streamPrice = null;
        } 
        const form = {
          _id: data._id,
          ...values
        }               
        dispatch(editStream(form));
      }else{
        dispatch(createStream(values));
      }      
      resetForm();
      onRequestClose();
    }catch(err){      
    }  
    setSubmitting(false);
  }

  const handleFileChange = (e) => {    
    if(e.target.files[0]){
      setThumbnail(e.target.files[0]);
    }    
  }

  return(
    <>      
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        ariaHideApp={ariaHideApp}
      >
        <Box 
          width={{xs: "80vw", md: "60vw", xm: "72rem"}} 
          height="fit-content" 
          bg="white" 
          py="2rem"                   
          px="3rem"
        >     
          <Flex mb="2rem" width="100%" alignItems="start" justifyContent="space-between">            
            <Text
              fontSize="1.8rem"
              fontWeight="500"
              mb="2rem"
            >
              {!editMode ? "Create New Stream" : "Edit " + data.streamTitle}
            </Text>            
            <Box color="danger.200" cursor="pointer" onClick={onRequestClose}>
              <VscClose fontSize="2.2rem"/>
            </Box>
          </Flex>
          <Formik
            initialValues={{
              streamTitle: data ? data.streamTitle : "",                          
              isSecuredStream: data ? data.isSecuredStream : false,
              streamPrice: data ? data.streamPrice : undefined
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ touched, errors, values }) => {
              return (
                <Form>
                  <Box className="form-control" mb="2rem">
                    <Field
                      type="text"
                      id="streamTitle"
                      name="streamTitle"
                      placeholder="Stream Title*"
                      className={
                        touched.streamTitle && errors.streamTitle ? "input-error" : ""
                      }
                    />
                    <ErrorMessage name="streamTitle" component={Error} />
                  </Box>
                  <Text mb="1rem">Secured Stream?</Text>
                  <Flex>
                    <Box className="form-control" mb="2rem" width="50%" mr="1rem" mt="0.5rem">                      
                      <label className="toggle-switch">
                        <Field 
                          type="checkbox" 
                          checked={values.isSecuredStream}
                          id="isSecuredStream"
                          name="isSecuredStream"                                                
                        />
                        <span className="switch" />
                      </label>                     
                    </Box>
                    {values.isSecuredStream &&                
                      <Box className="form-control" mb="2rem" width="100%">
                        <Field
                          type="number"
                          id="streamPrice"
                          name="streamPrice"
                          placeholder="Stream Price(Rs.)*"
                          className={
                            touched.streamPrice && errors.streamPrice ? "input-error" : ""
                          }
                        />                    
                      </Box> 
                    }
                  </Flex>
                  <Box className="form-control" my="2rem">
                    <Box as="label" htmlFor="streamThumbnail" cursor="pointer" bg="danger.200" py="0.8rem" color="white" px="1rem" borderRadius="0.4rem" fontSize="1.4rem">                      
                      Thumbnail                      
                    </Box>
                    <input
                      type="file"
                      id="streamThumbnail"                      
                      style={{display: "none"}}
                      onChange={(e) => handleFileChange(e)}
                    />                    
                  </Box>
                  {
                    thumbnail &&
                      <Box maxWidth="12rem" maxHeight="9rem" my="2rem">
                        <Image
                          src={URL.createObjectURL(thumbnail)}
                          alt="Preview Image"
                          objectFit="contain"
                        />
                      </Box>
                  }                  
                  <Flex
                    justifyContent="end"
                    mt="3rem"
                  >                    
                    <Button
                      variant="success"
                      width="14rem"                  
                      px="2rem"
                      py="1rem"
                      type="submit"                                    
                    >
                      <Text fontSize="1.6rem">
                        Create
                      </Text>
                    </Button>
                  </Flex>             
                </Form>
              )
            }}
          </Formik>
        </Box>
      </Modal>
    </>
  )
}