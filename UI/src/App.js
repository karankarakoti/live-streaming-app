import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "styles";
import { AppRoutes } from "routes";
import { Box } from "atoms";
import { scrollToTop } from "utils/utilities";

import "styles/globals.css";
import "styles/style.css";

import { AiOutlineArrowUp } from "react-icons/ai";

function App() {
  
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  
  return (
    <ThemeProvider theme={theme}>              
      <Router>
        <AppRoutes />
      </Router>   
      {scroll && (
        <Box
          position="fixed"
          color="primary.100"
          bg="primary.200"
          bottom="4rem"
          right="2rem"
          width="3rem"
          height="3rem"
          borderRadius="0.2rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={() => scrollToTop(window)}
        >
          <AiOutlineArrowUp size="2rem" />
        </Box>
      )}   
    </ThemeProvider>
  );
}

export default App;
