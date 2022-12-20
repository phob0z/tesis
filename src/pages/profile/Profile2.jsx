import React, { useContext, useState, useEffect } from "react";

import AuthContext from "../../contexts/auth/AuthContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/atoms/Card";
import { useCallback } from "react";

function Profile2() {
  const [userProfile, setUserProfile] = useState({email: "este@no.com"});

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch("https://swapi.dev/api/people/");
      const data = await response.json();
      // const transformedPeople = data.results.map((peopleData) => {
      //   return {
      //     email: peopleData.name,
      //   };
      // });
      const transformedPeople = data.results[0].name;
      setUserProfile({
        ...userProfile,
        email: `${transformedPeople}@hotmail.com`,
      });
    } catch (error) {
      console.log("ERROR");
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  console.log(userProfile.email);

  return (
    <MainContainer title="Perfil">
      <SubContainer subTitle="INFO PERSONAL">
        {
          <Card
            label="Email"
            value={userProfile.email}
            maxLength="35"
            onChange={(value) => {
              setUserProfile({ ...userProfile, email: value });
            }}
            validation="email"
          />
        }
      </SubContainer>
    </MainContainer>
  );
}

export default Profile2;
