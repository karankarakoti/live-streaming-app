import React, { useEffect } from "react";

import { scrollToTop } from "utils/utilities";

export const Home = () => {

  useEffect(() => {
    scrollToTop(window)
  }, [])

  return (
    <>
      Home React
    </>
  );
};

export default Home;
