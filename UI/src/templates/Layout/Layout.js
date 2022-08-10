import React from "react";

import { Box } from "atoms";
import { Navbar } from "organisms";

export const Layout = ({children}) => {

  const user = null
  const user1= {
    "firstName": "Karan",
    "lastName": "Karakoti",
    "role": "user",
    "email": "karankarakoti@gmail.com",
    "password": "12345678"
  }

  return(
    <Box height="100vh" width="100vw">
      <Navbar user={user} />
      <Box overflowY="auto">
        {children}
      </Box>
    </Box>
  )
}