import React, { useEffect } from "react";

import { ProfilePage } from "templates";
import { scrollToTop } from "utils/utilities";

export const Profile = () => {

  document.title = "My Profile | Live Streaming App"

  useEffect(() => {
    scrollToTop(window)
  }, [])

  return (
    <> 
      <ProfilePage/>     
    </>
  );
};

export default Profile;
