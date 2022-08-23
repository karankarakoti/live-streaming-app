import React, { useEffect } from "react";

import { BroadcastersPage } from "templates";
import { scrollToTop } from "utils/utilities";

export const Broadcasters = () => {

  document.title = "Broadcasters | Live Streaming App"

  useEffect(() => {
    scrollToTop(window)
  }, [])

  return (
    <>
      <BroadcastersPage/>
    </>
  );
};

export default Broadcasters;
