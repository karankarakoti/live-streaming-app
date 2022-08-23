import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";

import { Box, Button, Error, Flex, Text } from "atoms";
import { register } from "redux/actions";

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

export const SigninForm = ({setAuthType}) => {

  const dispatch = useDispatch();

  const onSubmit = async (values, { resetForm, setSubmitting }) => {    
    const data = {
      email: values.email,
      password: values.password,  
      firstName: values.firstName,
      lastName: values.lastName,
      role: "user"
    }         
    try{
      dispatch(register(data));
      setAuthType("login");
      resetForm()
    }catch(err){      
    }  
    setSubmitting(false)          
  }

  return(
    <Box maxWidth="100%">
      <Text
        fontSize="1.8rem"
        fontWeight="500"
        my="1rem"
      >
        Don't hace an account! Create Now
      </Text>
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
        {({ touched, errors }) => {
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
                justifyContent="space-between"
                mt="3rem"
              >
                <Text mt="1rem" color="info.200" as="u" cursor="pointer" onClick={() => setAuthType("login")}>
                  Already have an accont?
                </Text>
                <Button
                  variant="success"
                  width="14rem"                  
                  px="2rem"
                  py="1rem"
                  type="submit"                                    
                >
                  <Text fontSize="1.6rem">
                    Sign up
                  </Text>
                </Button>
              </Flex>      
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}