import {
  Document,
  View,
  Page,
  Text,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import OpenSansSRC from "../../assets/fonts/OpenSans-Light.ttf";
import OpenSansBoldSRC from "../../assets/fonts/OpenSans-Bold.ttf";

Font.register({
  family: "Open Sans",
  fonts: [{ src: OpenSansSRC }, { src: OpenSansBoldSRC, fontWeight: 800 }],
});

const classes = StyleSheet.create({
  content: {
    margin: "30pt",
    fontFamily: "Open Sans",
  },
  schoolInfo: {
    fontSize: 11,
    paddingBottom: "10mm",
  },
  image: {
    width: "50pt",
    height: "50pt",
  },
  center: {
    alignItems: "center",
  },
  headerInfo: {
    paddingBottom: "5pt",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTable: {
    border: "1pt",
    borderRight: 0,
    borderBottom: 0,
  },
  number: {
    minWidth: "5mm",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1pt",
    fontWeight: 800,
  },
  studentName: {
    width: "600%",
    justifyContent: "center",
    borderRight: "1pt",
    paddingLeft: "1mm",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  subject: {
    paddingLeft: "2mm",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1pt",
    borderBottom: "1pt",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cell: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1pt",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  bold: {
    fontWeight: 800,
  },
});

const fontSize = (numSubj) => {
  if (numSubj > 13) {
    return 5;
  } else if (numSubj > 10) {
    return 6;
  } else if (numSubj > 7) {
    return 7;
  } else if (numSubj > 4) {
    return 8;
  } else if (numSubj > 0) {
    return 10;
  }
};

const SecretaryPDF = (props) => {
  const logo = props.data.logo;
  const course = props.data.course;
  const academicYear = props.data.academic_period;
  const information = props.data.information;
  const parallel = props.data.parallel;
  const specialty = props.data.specialty;
  const students = props.data.students;
  const numSubj = students[0].grades.length;

  return (
    students && (
      <Document>
        <Page size="A3" orientation="landscape">
          <View style={[classes.content, { fontSize: fontSize(numSubj) }]}>
            <View style={classes.schoolInfo}>
              <View style={classes.row}>
                <View style={{ width: "30%" }}>
                  <Image style={classes.image} src={logo} />
                </View>
                <View style={{ width: "40%" }}>
                  <View style={[classes.center, classes.bold]}>
                    <Text>{information.name}</Text>
                    <Text>CUADRO FINAL DE CALIFICACIONES</Text>
                    <Text>
                      AÑO LECTIVO {academicYear}-{parseInt(academicYear) + 1}
                    </Text>
                  </View>
                </View>
                <View style={{ width: "30%" }}>
                  <Text />
                </View>
              </View>
            </View>
            <View style={classes.headerInfo}>
              <View style={classes.row}>
                <View
                  style={[
                    classes.row,
                    {
                      width: "30%",
                      justifyContent: "flex-start",
                    },
                  ]}
                >
                  <Text style={classes.bold}>Curso: </Text>
                  <Text>{course}</Text>
                </View>
                <View
                  style={[
                    classes.row,
                    {
                      width: "30%",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text style={classes.bold}>Paralelo: </Text>
                  <Text>{parallel}</Text>
                </View>
                <View
                  style={[
                    classes.row,
                    {
                      width: "30%",
                      justifyContent: "flex-end",
                    },
                  ]}
                >
                  <Text style={classes.bold}>Especialidad: </Text>
                  <Text>{specialty}</Text>
                </View>
              </View>
            </View>
            <View style={[classes.headerTable, classes.bold]}>
              <View style={classes.row}>
                <View style={classes.number}>
                  <Text>N°</Text>
                </View>
                <View style={classes.studentName}>
                  <Text>Estudiante</Text>
                </View>
                {students[0].grades.map((subject, i) => {
                  return (
                    <View key={i}>
                      <View style={classes.row}>
                        <View style={classes.subject}>
                          <Text>{subject.subject_name}</Text>
                        </View>
                      </View>
                      <View style={classes.row}>
                        <View style={classes.cell}>
                          <Text>Q1</Text>
                        </View>
                        <View style={classes.cell}>
                          <Text>Q2</Text>
                        </View>
                        <View style={classes.cell}>
                          <Text>S</Text>
                        </View>
                        <View style={classes.cell}>
                          <Text>R</Text>
                        </View>
                        <View style={classes.cell}>
                          <Text>G</Text>
                        </View>
                        <View style={classes.cell}>
                          <Text>Final</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
                <View style={classes.cell}>
                  <Text>Comp 1</Text>
                </View>
                <View style={classes.cell}>
                  <Text>Comp 2</Text>
                </View>
                <View style={classes.cell}>
                  <Text>Prom</Text>
                </View>
              </View>
            </View>
            {students.map((student, i) => {
              return (
                <View key={i} style={classes.headerTable}>
                  <View style={classes.row}>
                    <View style={classes.number}>
                      <Text>{i + 1}</Text>
                    </View>
                    <View style={classes.studentName}>
                      <Text>
                        {student.student_name} {student.student_last_name}
                      </Text>
                    </View>
                    {student.grades.map((grade, i) => {
                      return (
                        <View key={i} style={classes.row}>
                          <View style={classes.cell}>
                            <Text>
                              {grade.q1
                                ? (Math.round(grade.q1 * 100) / 100).toFixed(2)
                                : "-"}
                            </Text>
                          </View>
                          <View style={classes.cell}>
                            <Text>
                              {grade.q2
                                ? (Math.round(grade.q2 * 100) / 100).toFixed(2)
                                : "-"}
                            </Text>
                          </View>
                          <View style={classes.cell}>
                            <Text>
                              {grade.supletorio
                                ? (
                                    Math.round(grade.supletorio * 100) / 100
                                  ).toFixed(2)
                                : "-"}
                            </Text>
                          </View>
                          <View style={classes.cell}>
                            <Text>
                              {grade.remedial
                                ? (
                                    Math.round(grade.remedial * 100) / 100
                                  ).toFixed(2)
                                : "-"}
                            </Text>
                          </View>
                          <View style={classes.cell}>
                            <Text>
                              {grade.gracia
                                ? (
                                    Math.round(grade.gracia * 100) / 100
                                  ).toFixed(2)
                                : "-"}
                            </Text>
                          </View>
                          <View style={classes.cell}>
                            <Text>
                              {grade.final
                                ? (Math.round(grade.final * 100) / 100).toFixed(
                                    2
                                  )
                                : "-"}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                    <View style={classes.cell}>
                      <Text>{student.comportamiento1 ?? "-"}</Text>
                    </View>
                    <View style={classes.cell}>
                      <Text>{student.comportamiento2 ?? "-"}</Text>
                    </View>
                    <View style={classes.cell}>
                      <Text>
                        {student.total
                          ? (Math.round(student.total * 100) / 100).toFixed(2)
                          : "-"}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
            <View style={{ borderTop: 1 }}>
              <Text> </Text>
            </View>
            <View style={classes.row}>
              <View style={{ width: "25%" }}>
                <View
                  style={[
                    classes.row,
                    {
                      justifyContent: "flex-start",
                    },
                  ]}
                >
                  <View style={[classes.bold, { width: "15mm" }]}>
                    <Text>Q1:</Text>
                    <Text>Q2:</Text>
                    <Text>S:</Text>
                    <Text>R:</Text>
                    <Text>G:</Text>
                    <Text>Final:</Text>
                    <Text>Comp 1:</Text>
                    <Text>Comp 2:</Text>
                    <Text>Prom:</Text>
                  </View>
                  <View style={{ width: "auto" }}>
                    <Text>1er Quimestre</Text>
                    <Text>2do Quimestre</Text>
                    <Text>Supletorio</Text>
                    <Text>Remedial</Text>
                    <Text>Gracia</Text>
                    <Text>Nota final de asignatura</Text>
                    <Text>Comportamiento 1</Text>
                    <Text>Comportamiento 2</Text>
                    <Text>Promedio final del estudiante</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "12.5%" }}>
                <View
                  style={{
                    borderBottom: 1,
                    width: "100%",
                    height: "25mm",
                  }}
                />
                <View
                  style={{
                    textAlign: "center",
                    fontWeight: 800,
                  }}
                >
                  <Text>Rector/a</Text>
                  <Text>{information.director_name}</Text>
                </View>
              </View>
              <View style={{ width: "25%" }}>
                <Text></Text>
              </View>
              <View style={{ width: "12.5%" }}>
                <View
                  style={{
                    borderBottom: 1,
                    width: "100%",
                    height: "25mm",
                  }}
                />
                <View
                  style={{
                    textAlign: "center",
                    fontWeight: 800,
                  }}
                >
                  <Text>Secretario/a</Text>
                  <Text>{information.secretary_name}</Text>
                </View>
              </View>
              <View style={{ width: "25%" }}>
                <Text></Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    )
  );
};

export default SecretaryPDF;
