import React from "react";
import { useSelector } from "react-redux";

import { Box } from "atoms";
import { Navbar } from "organisms";

export const Layout = ({children}) => {

  const auth = useSelector(state => state.auth);  

  return(
    <Box height="100vh" width="100vw">
      <Navbar user={auth.user} />
      <Box overflowY="auto">
        {children}
      </Box>
    </Box>
  )
}