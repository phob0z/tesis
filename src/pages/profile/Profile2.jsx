import React, { useContext } from "react";

import AuthContext from "../../contexts/auth/AuthContext";

import MainContainer from "../../components/container/MainContainer";
import SubContainer from "../../components/container/SubContainer";
import Card from "../../components/atoms/Card";

function Profile2() {
  const { user, setProfile } = useContext(AuthContext);

  async function loadInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Leonel",
          last_name: "Molina",
          identification: "1758963050",
          birthdate: "18-06-1988",
          email: "leonel@gmail.com",
          home_phone: "123456789",
          personal_phone: "1234567890",
          address: "Quito",
          role: user.role,
          avatar: user.avatar,
        });
      }, 500);
    });
  };

  // useEffect(() => {
  // if (!user.identification) {
  //   setIsLoading(true);
  //   try {
  // console.log("Ir al servidor");
  // loadInfo().then((profile) => {
  //   console.log(profile);
  //   setProfile(profile);
  // });
  //     // user = newUser;
  //     // const token = localStorage.getItem("token");
  //     //   const response = await axios.post(
  //     //     `${process.env.REACT_APP_BACK_URL}/profile/`,
  //     //     // "http://localhost:8000/api/profile",
  //     //     { token },
  //     //     { headers: { accept: "application/json" } }
  //     //   );
  //     //   const { access_token, token_type, user } = response.data.data;
  //   } catch (error) {
  //     setIsLoading(false);
  //     setModal({ title: "ERROR", message: error.response.data.message });
  //     setHasError(true);
  //   }

  //   setIsLoading(false);
  // } else {
  //   console.log("Ir al localStorage");
  //   setProfile(JSON.parse(localStorage.getItem("user")));
  // }
  // }, []);

  return (
    <MainContainer title="Perfil">
      <SubContainer subTitle="INFO PERSONAL">
        <Card
          label="Email"
          value={user.email}
          maxLength="35"
          onChange={(event) => {
            user.name = event.target.value;
          }}
          validation="email"
        />
      </SubContainer>
    </MainContainer>
  );
}

export default Profile2;
