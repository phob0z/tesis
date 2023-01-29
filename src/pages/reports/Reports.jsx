import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/atoms/Button";
import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";
import SecretaryPDF from "./SecretaryPDF";
import StudentPDF from "./StudentPDF";
import TeacherPDF from "./TeacherPDF";

import classes from "./Reports.module.css";

const Reports = () => {
  const today = new Date();
  const params = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const { setIsLoading, setModal } = useContext(AlertContext);
  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    var url;
    try {
      switch (user.role) {
        case "secretary":
          url = `${process.env.REACT_APP_BACK_URL}/secretary/${params.courseId}/${params.parallelId}/${params.specialtyId}/${params.academicYearId}/report`;
          break;
        case "teacher":
          url = `${process.env.REACT_APP_BACK_URL}/teacher/${params.subjectId}/report`;
          break;
        default:
          url = `${process.env.REACT_APP_BACK_URL}/student/${params.academicYearId}/report`;
          break;
      }
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      });
      const data = response.data.data;
      // const data2 = {
      //   logo: "https://cdn-icons-png.flaticon.com/512/2231/2231696.png",
      //   information: {
      //     id: 1,
      //     name: 'Institución Educativa Fiscal "Miguel de Santiago"',
      //     director_name: "Queen Opal",
      //     secretary_name: "Nicole Georgiana",
      //   },
      //   course: "Octavo de básica",
      //   parallel: "A",
      //   specialty: "BGU",
      //   academic_period: "2023",
      //   students: [
      //     {
      //       student_name: "Annette Grayson",
      //       student_last_name: "Schulist Considine",
      //       grades: [
      //         {
      //           subject_id: 1,
      //           subject_name: "MATEMÁTICAS",
      //           user_id: 49,
      //           p1q1: 9,
      //           p2q1: 8,
      //           p3q1: 5,
      //           p1q2: 6,
      //           p2q2: 7,
      //           p3q2: 8,
      //           q1: 7.33,
      //           q2: 7,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 7.17,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 2,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 3,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 4,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 5,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 6,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 7,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 8,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 9,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 10,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 11,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 12,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 13,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 14,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 15,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 16,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //       ],
      //       comportamiento1: "A",
      //       comportamiento2: "A",
      //       total: 7.59,
      //       state: 1,
      //     },
      //   ],
      // };
      // const data3 = {
      //   logo: "https://cdn-icons-png.flaticon.com/512/2231/2231696.png",
      //   information: {
      //     id: 1,
      //     name: 'Institución Educativa Fiscal "Miguel de Santiago"',
      //     director_name: "Queen Opal",
      //     secretary_name: "Nicole Georgiana",
      //   },
      //   course: "Octavo de básica",
      //   parallel: "A",
      //   specialty: "BGU",
      //   academic_period: "2023",
      //   students: [
      //     {
      //       student_name: "Annette Grayson",
      //       student_last_name: "Schulist Considine",
      //       grades: [
      //         {
      //           subject_id: 1,
      //           subject_name: "MATEMÁTICAS",
      //           user_id: 49,
      //           p1q1: 9,
      //           p2q1: 8,
      //           p3q1: 5,
      //           p1q2: 6,
      //           p2q2: 7,
      //           p3q2: 8,
      //           q1: 7.33,
      //           q2: 7,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 7.17,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 2,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 3,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 4,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //         {
      //           subject_id: 5,
      //           subject_name: "LENGUAJE Y COMUNICACIÓN",
      //           user_id: 49,
      //           p1q1: 7,
      //           p2q1: 8,
      //           p3q1: 9,
      //           p1q2: 9,
      //           p2q2: 8,
      //           p3q2: 7,
      //           q1: 8,
      //           q2: 8,
      //           supletorio: null,
      //           remedial: null,
      //           gracia: null,
      //           final: 8,
      //           state: 1,
      //         },
      //       ],
      //       comportamiento1: "A",
      //       comportamiento2: "A",
      //       total: 7.59,
      //       state: 1,
      //     },
      //   ],
      // };
      setData(data);
      setLoaded(true);
    } catch (error) {
      // console.log(error);
      // setModal({ title: "ERROR", message: error.response.data.message });
      // setModal({ title: "ERROR", message: error.message });
      setModal({
        title: "ERROR",
        message: "El servidor no encontró esa información en la base de datos",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const selectPDF = (data) => {
    switch (user.role) {
      case "secretary":
        return <SecretaryPDF data={data} />;
      case "teacher":
        return <TeacherPDF data={data} />;
      default:
        return <StudentPDF data={data} />;
    }
  };

  return (
    <Fragment>
      {loaded && (
        <div style={{ zIndex: 100, display: "flex", justifyContent: "center" }}>
          <PDFViewer
            style={{
              zIndex: 2,
              width: "85%",
              height: "75vh",
              marginTop: "11rem",
              border: 0,
              borderRadius: "0.625rem",
            }}
          >
            {selectPDF(data)}
          </PDFViewer>
        </div>
      )}
      <div className={classes.buttons}>
        <Button
          onClick={() => {
            navigate("/reports");
          }}
        >
          Volver
        </Button>
        {loaded && (
          <PDFDownloadLink
            document={selectPDF(data)}
            fileName={`${user.role}Report_${today
              .toISOString()
              .split("T")[0]
              .replaceAll("-", "")}`}
          >
            <Button>Descargar</Button>
          </PDFDownloadLink>
        )}
      </div>
    </Fragment>
  );
};

export default Reports;
