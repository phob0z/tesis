import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth/AuthContext";

import ProfileSecretary from "./ProfileSecretary";
import ProfileTeacher from "./ProfileTeacher";
import ProfileStudent from "./ProfileStudent";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profileTemplate, setProfileTemplate] = useState(<ProfileStudent />);
  useEffect(() => {
    if (user.role === "secretary") setProfileTemplate(<ProfileSecretary />);
    else if (user.role === "teacher") setProfileTemplate(<ProfileTeacher />);
    else setProfileTemplate(<ProfileStudent />);
  }, [user]);

  return profileTemplate;
}

export default Profile;
