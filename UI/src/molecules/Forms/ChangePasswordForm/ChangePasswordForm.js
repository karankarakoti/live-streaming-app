import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Box, Button, Error, Flex, Text } from "atoms";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password Required")
    .max(100, "Max 100 characters allowed")
    .min(6, "Min 6 characters required"),    
  confirmPassword: Yup.string()
    .required("Confirm Password Required")
    .max(100, "Max 100 characters allowed")
    .min(6, "Min 6 characters required"),    
});

export const ChangePasswordForm = () => {

  // const dispatch = useDispatch();

  const onSubmit = async (values, { resetForm, setSubmitting }) => {    
    // const data = {
    //   email: values.email,
    //   password: values.password,      
    // }       
    try{
      // dispatch(login(data));
      resetForm();
    }catch(err){      
    }  
    setSubmitting(false);
  }


  return (
    <Box maxWidth="100%">      
      <Formik
        initialValues={{              
          password: "",   
          confirmPassword: ""       
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors }) => {
          return (
            <Form>
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

              <Box className="form-control" mb="2rem">
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password*"
                  className={
                    touched.confirmPassword && errors.confirmPassword ? "input-error" : ""
                  }
                />
                <ErrorMessage name="confirmPassword" component={Error} />
              </Box> 
              <Flex
                justifyContent="end"
                mt="3rem"
              >                
                <Button
                  variant="warning"
                  width="18rem"                  
                  px="2rem"
                  py="1rem"
                  type="submit"                                    
                >
                  <Text fontSize="1.2rem">
                    Update Password
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