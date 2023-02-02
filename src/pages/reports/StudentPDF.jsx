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
    fontSize: 10,
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
    textAlign: "left",
  },
  headerTable: {
    border: "1pt",
    borderRight: 0,
    borderBottom: 0,
  },
  subjectName: {
    width: "350%",
    justifyContent: "center",
    borderRight: "1pt",
    paddingLeft: "1mm",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  quimester: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1pt",
    borderBottom: "1pt",
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

const StudentPDF = (props) => {
  const logo = props.data.logo;
  const information = props.data.information;
  const user = props.data.user;
  const grades = props.data.grades;
  console.log(user);
  console.log(information);
  console.log(grades);

  return (
    grades && (
      <Document>
        <Page size="A4" orientation="landscape">
          <View style={classes.content}>
            <View style={classes.schoolInfo}>
              <View style={classes.row}>
                <View style={{ width: "30%" }}>
                  <Image style={classes.image} src={logo} />
                </View>
                <View style={{ width: "40%" }}>
                  <View style={[classes.center, classes.bold]}>
                    <Text>{information.name}</Text>
                    <Text>REPORTE DE CALIFICACIONES</Text>
                    <Text>
                      AÑO LECTIVO {user.academic_period_name}-
                      {parseInt(user.academic_period_name) + 1}
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
                <View style={classes.row}>
                  <Text style={classes.bold}>Estudiante: </Text>
                  <Text>
                    {user.student_name} {user.student_last_name}
                  </Text>
                </View>
              </View>
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
                  <Text>{user.course_name}</Text>
                </View>
                <View
                  style={[
                    classes.row,
                    {
                      width: "40%",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text style={classes.bold}>Paralelo: </Text>
                  <Text>{user.parallel_name}</Text>
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
                  <Text>{user.specialty_name}</Text>
                </View>
              </View>
            </View>
            <View style={[classes.headerTable, classes.bold]}>
              <View style={classes.row}>
                <View style={classes.subjectName}>
                  <Text>Asignatura</Text>
                </View>
                <View style={classes.col}>
                  <View style={classes.row}>
                    <View style={classes.quimester}>
                      <Text>Quimestre 1</Text>
                    </View>
                  </View>
                  <View style={classes.row}>
                    <View style={classes.cell}>
                      <Text>Parcial 1</Text>
                    </View>
                    <View style={classes.cell}>
                      <Text>Parcial 2</Text>
                    </View>
                    <View style={classes.cell}>
                      <Text>Parcial 3</Text>
                    </View>
                    <View style={classes.cell}>
                      <Text>Final Q1</Text>
                    </View>
                  </View>
                </View>
                <View style={classes.col}>
                  <View style={classes.row}>
                    <View style={classes.quimester}>
                      <Text>Quimestre 2</Text>
                    </View>
                  </View>
                  <View style={classes.row}>
                    <View style={classes.cell}>
                      <Text>Parcial 1</Text>
                    </View>
                    <View style={classes.cell}>
                      <Text>Parcial 2</Text>
                    </View>
                    <View style={classes.cell}>
                      <Text>Parcial 3</Text>
                    </View>
                    <View style={classes.cell}>
                      <Text>Final Q2</Text>
                    </View>
                  </View>
                </View>
                <View style={[classes.cell, { width: "115%" }]}>
                  <Text>Supletorio</Text>
                </View>
                <View style={classes.cell}>
                  <Text>Remedial</Text>
                </View>
                <View style={classes.cell}>
                  <Text>Gracia</Text>
                </View>
                <View style={classes.cell}>
                  <Text>Final</Text>
                </View>
              </View>
            </View>
            {grades.map((grade, i) => {
              return (
                <View key={i} style={classes.headerTable}>
                  <View style={classes.row}>
                    <View style={[classes.subjectName, classes.bold]}>
                      <Text>{grade.subject_name}</Text>
                    </View>
                    <View style={classes.row}>
                      <View style={classes.cell}>
                        <Text>
                          {grade.p1q1
                            ? (Math.round(grade.p1q1 * 100) / 100).toFixed(2)
                            : "-"}
                        </Text>
                      </View>
                      <View style={classes.cell}>
                        <Text>
                          {grade.p2q1
                            ? (Math.round(grade.p2q1 * 100) / 100).toFixed(2)
                            : "-"}
                        </Text>
                      </View>
                      <View style={classes.cell}>
                        <Text>
                          {grade.p3q1
                            ? (Math.round(grade.p3q1 * 100) / 100).toFixed(2)
                            : "-"}
                        </Text>
                      </View>
                      <View style={classes.cell}>
                        <Text>
                          {grade.q1
                            ? (Math.round(grade.q1 * 100) / 100).toFixed(2)
                            : "-"}
                        </Text>
                      </View>
                      <View style={classes.cell}>
                        <Text>
                          {grade.p1q2
                            ? (Math.round(grade.p1q2 * 100) / 100).toFixed(2)
                            : "-"}
                        </Text>
                      </View>
                      <View style={classes.cell}>
                        <Text>
                          {grade.p2q2
                            ? (Math.round(grade.p2q2 * 100) / 100).toFixed(2)
                            : "-"}
                        </Text>
                      </View>
                      <View style={classes.cell}>
                        <Text>
                          {grade.p3q2
                            ? (Math.round(grade.p3q2 * 100) / 100).toFixed(2)
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
                      <View style={[classes.cell, { width: "115%" }]}>
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
                            ? (Math.round(grade.remedial * 100) / 100).toFixed(
                                2
                              )
                            : "-"}
                        </Text>
                      </View>
                      <View style={classes.cell}>
                        <Text>
                          {grade.gracia
                            ? (Math.round(grade.gracia * 100) / 100).toFixed(2)
                            : "-"}
                        </Text>
                      </View>
                      <View style={classes.cell}>
                        <View style={classes.row}>
                          <Text>
                            {grade.final
                              ? (Math.round(grade.final * 100) / 100).toFixed(2)
                              : "-"}
                          </Text>
                        </View>
                        <View>
                          <Text style={[classes.bold, {fontSize: 7}]}>
                            {grade.final >= 7 ? "APRUEBA" : "REPRUEBA"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
            <View style={{ borderTop: 1, height: "10pt" }} />
            <View style={classes.row}>
              <View style={{ width: "22.3%" }}>
                <Text></Text>
              </View>
              <View style={{ width: "25.6%", alignItems: "center", border: 1 }}>
                <View
                  style={[
                    classes.row,
                    {
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text style={classes.bold}>Comportamiento 1: </Text>
                  <Text>{user.comportamiento1}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "25.6%",
                  alignItems: "center",
                  border: 1,
                  borderLeft: 0,
                }}
              >
                <View
                  style={[
                    classes.row,
                    {
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text style={classes.bold}>Comportamiento 2: </Text>
                  <Text>{user.comportamiento2}</Text>
                </View>
              </View>
              <View style={{ width: "26.5%", border: 1, borderLeft: 0 }}>
                <View style={classes.row}>
                  <View style={{ width: "75%" }}>
                    <Text style={[classes.bold, { alignSelf: "flex-end" }]}>
                      Promedio:
                    </Text>
                  </View>
                  <View style={{ width: "25%" }}>
                    <Text style={{ alignSelf: "center" }}>
                      {user.total
                        ? (Math.round(user.total * 100) / 100).toFixed(2)
                        : "-"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
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
                    <Text>Final Q1:</Text>
                    <Text>Final Q2:</Text>
                    <Text>Final:</Text>
                  </View>
                  <View style={{ width: "auto" }}>
                    <Text>Nota final del 1er Quimestre</Text>
                    <Text>Nota final del 2do Quimestre</Text>
                    <Text>Nota final de asignatura</Text>
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

export default StudentPDF;
