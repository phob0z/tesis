import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Button from "../../components/atoms/Button";
import Table from "./Table";

const Report = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PDFViewer style={{ width: "85%", height: "80vh", paddingTop: "5rem" }}>
          <Table />
        </PDFViewer>
      </div>
      <div style={{position: "absolute", bottom: "0px", right: "0px"}}>
        <PDFDownloadLink document={<Table />} fileName="prueba.pdf">
          <Button>ASD</Button>
        </PDFDownloadLink>
      </div>
    </>
  );
};

export default Report;
