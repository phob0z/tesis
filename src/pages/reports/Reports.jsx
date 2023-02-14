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
      setData(data);
      setLoaded(true);
    } catch (error) {
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
