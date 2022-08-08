import React, { useEffect } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import { Box } from "atoms";
import { scrollToTop } from "utils/utilities";

export default function ErrorPage() {

  document.title = "404 | Page Not Found"

  useEffect(() => {
    scrollToTop(window)
  }, [])

  return (
    <>
      <Box p="2rem">
        <Box          
          borderRadius=".6rem"
          height="auto"
          bg="white"
          boxShadow="0 10px 30px rgba(16,30,54,.25)"
        >
          <Box
            textAlign="center"
            width={{ xs: "32rem", md: "60rem" }}
            height={{ xs: "30rem", md: "60rem" }}            
            m="auto"
          >
            <Player autoplay loop src="https://assets10.lottiefiles.com/packages/lf20_o5q3hezw.json">
              <Controls visible={false} />
            </Player>
          </Box>
        </Box>
      </Box>
    </>
  );
}