import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../../contexts/auth/AuthContext";
import AlertContext from "../../contexts/alert/AlertContext";

import MainContainer from "../../components/container/MainContainer";
import GradeCard from "../../components/cards/GradeCard";
import LongSubContainer from "../../components/container/LongSubContainer";

function EditGrades() {
  const params = useParams();

  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);

  const [student, setStudent] = useState();
  const [userGrades, setUserGrades] = useState({ user });

  const fetchStudent = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Gradess/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      const data = {
        name: "Leonel",
        last_name: "Molina",
        identification: "1758963050",
        course: "8vo",
        parallel: "A",
        state: true,
        specialty: "Especialidad",
      };
      console.log(data);
      setStudent({ ...data });
      console.log(student);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal]);

  const fetchGrades = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACK_URL}/Gradess/`,
      //   { method: "GET" },
      //   { user },
      //   { headers: { accept: "application/json" } }
      // );
      // const { access_token, token_type, user, avatar } = response.data.data;
      // console.log("USER: " + user + "AT: " + access_token + "TT: " + token_type + "Avatar: " + avatar);
      const response = await fetch("https://swapi.dev/api/people/");
      const data1 = await response.json();
      const data = [
        {
          name: "matemática",
          q1n1: "Molina",
          q1n2: "1758963050",
          q1n3: "8vo",
          q1comp: "A",
          q2n1: "Molina",
          q2n2: "1758963050",
          q2n3: "8vo",
          q2comp: "A",
          state: true,
          specialty: "Especialidad",
        },
        {
          name: "matemática",
          last_name: "Molina",
          identification: "1758963050",
          course: "8vo",
          parallel: "A",
          state: true,
          specialty: "Especialidad",
        },
      ];
      setUserGrades(...data);
    } catch (error) {
      setIsLoading(false);
      setModal({ title: "ERROR", message: error });
    }
    setIsLoading(false);
  }, [setIsLoading, setModal]);

  useEffect(() => {
    fetchStudent();
    fetchGrades();
  }, [fetchStudent, fetchGrades]);

  return (
    <MainContainer title="Calificaciones" buttonTitle="Guardar" type="submit">
      <LongSubContainer>
        {/* {console.log(student.name)} */}
        {/* <GradeCard
          name={student.name}
          last_name={student.last_name}
          identification={student.identification}
          course={student.course}
          parallel={student.parallel}
          specialty={student.specialty}
          state={student.state}
        /> */}
      </LongSubContainer>
    </MainContainer>
  );
}

export default EditGrades;
