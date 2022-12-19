import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth/AuthContext";

import Secretary from "./Secretary";
import Teacher from "./Teacher";
import Student from "./Student";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profileTemplate, setProfileTemplate] = useState();
  useEffect(() => {
    if (user.role === "secretary") setProfileTemplate(<Secretary />);
    else if (user.role === "teacher") setProfileTemplate(<Teacher />);
    else setProfileTemplate(<Student />);
  }, [user]);

  return profileTemplate;
}

export default Profile;
