import React, { useEffect } from "react";

import { MyStreamPage } from "templates";
import { scrollToTop } from "utils/utilities";

export const MyStreams = () => {

  useEffect(() => {
    scrollToTop(window)
  }, [])

  return (
    <>
      <MyStreamPage/>
    </>
  );
};

export default MyStreams;
