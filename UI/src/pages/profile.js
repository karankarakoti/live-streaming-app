import React, { useEffect } from "react";

import { ProfilePage } from "templates";
import { scrollToTop } from "utils/utilities";

export const Profile = () => {

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
