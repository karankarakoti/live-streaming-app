import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Box, Button, Error, Flex, Text } from "atoms";
import { useDispatch } from "react-redux";
import { login } from "redux/actions";

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
});

export const LoginForm = ({setAuthType}) => {

  const dispatch = useDispatch();

  const onSubmit = async (values, { resetForm, setSubmitting }) => {    
    const data = {
      email: values.email,
      password: values.password,      
    }       
    try{
      dispatch(login(data));
      resetForm();
    }catch(err){      
    }  
    setSubmitting(false);
  }

  return(
    <Box maxWidth="100%">
      <Text
        fontSize="1.8rem"
        fontWeight="500"
        mb="2rem"
      >
        Welcome back! Login Here
      </Text>
      <Formik
        initialValues={{
          email: "",            
          password: "",          
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors }) => {
          return (
            <Form>
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
                <Text mt="1rem" color="info.200" as="u" cursor="pointer" onClick={() => setAuthType("signin")}>
                  Dont have an accont?
                </Text>
                <Button
                  variant="success"
                  width="14rem"                  
                  px="2rem"
                  py="1rem"
                  type="submit"                                    
                >
                  <Text fontSize="1.6rem">
                    Login
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