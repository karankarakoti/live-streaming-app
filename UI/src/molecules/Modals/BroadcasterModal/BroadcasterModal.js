import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { Box, Button, Error, Flex, Image, Text } from "atoms";
import { register } from "redux/actions";

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
  email: Yup.string()
    .email("Invalid format")
    .required("Email Required")
    .max(100, "Max 100 characters allowed")
    .min(3, "Min 3 characters required"),
  password: Yup.string()
    .required("Password Required")
    .max(100, "Max 100 characters allowed")
    .min(6, "Min 6 characters required"),  
  firstName: Yup.string()    
    .required("First Name Required")
    .max(100, "Max 100 characters allowed")
    .min(3, "Min 3 characters required"),
  lastName: Yup.string()
    .required("Last Name Required")
    .max(100, "Max 100 characters allowed")
    .min(3, "Min 3 characters required"),  
});

export const BroadcasterModal = ({ isOpen, onRequestClose, ariaHideApp }) => {

  const dispatch = useDispatch();

  const onSubmit = async (values, { resetForm, setSubmitting }) => {    
    const data = {
      email: values.email,
      password: values.password,  
      firstName: values.firstName,
      lastName: values.lastName,
      role: "streamer"
    }         
    try{
      dispatch(register(data));      
      resetForm()
      onRequestClose()
    }catch(err){      
    }  
    setSubmitting(false)          
  }

  return (
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
             Create New Broadcaster
            </Text>            
            <Box color="danger.200" cursor="pointer" onClick={onRequestClose}>
              <VscClose fontSize="2.2rem"/>
            </Box>
          </Flex>
          <Formik
            initialValues={{
              email: "",                          
              password: "",
              firstName: "",
              lastName: ""
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ touched, errors, values }) => {
              return (
                <Form>
                  <Flex>
                    <Box className="form-control" mb="2rem" width="48%">
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name*"
                        className={
                          touched.firstName && errors.firstName ? "input-error" : ""
                        }
                      />
                      <ErrorMessage name="firstName" component={Error} />
                    </Box>
                    <Box className="form-control" mb="2rem" width="48%" ml="auto">
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name*"
                        className={
                          touched.lastName && errors.lastName ? "input-error" : ""
                        }
                      />
                      <ErrorMessage name="lastName" component={Error} />
                    </Box>
                  </Flex>
                  <Box className="form-control" mb="2rem">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email*"
                      className={
                        touched.email && errors.email ? "input-error" : ""
                      }
                    />
                    <ErrorMessage name="email" component={Error} />
                  </Box>

                  <Box className="form-control" mb="2rem">
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password*"
                      className={
                        touched.password && errors.password ? "input-error" : ""
                      }
                    />
                    <ErrorMessage name="password" component={Error} />
                  </Box>                   
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