import React, { useEffect } from "react";

import { StreamPage } from "templates";
import { scrollToTop } from "utils/utilities";

export const Stream = () => {

  document.title = "Stream Name | Live Streaming App"

  useEffect(() => {
    scrollToTop(window);    
  }, [])

  return (
    <>
      <StreamPage/>
    </>
  );
};

export default Stream;
