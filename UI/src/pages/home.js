import React, { useEffect } from "react";

import { HomePage } from "templates";
import { scrollToTop } from "utils/utilities";

export const Home = () => {

  document.title = "Live Streaming App"

  useEffect(() => {
    scrollToTop(window)
  }, [])

  return (
    <>
      <HomePage/>
    </>
  );
};

export default Home;
