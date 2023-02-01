import {
  Document,
  View,
  Page,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  content: {
    margin: "30pt",
    fontSize: 10,
  },
  schoolInfo: {
    fontSize: 11,
    paddingBottom: "10mm",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "50pt",
    height: "50pt",
  },
  center: {
    alignItems: "center",
  },
  headerInfo: {
    padding: "5pt",
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
    width: "400%",
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
});

const StudentPDF = (props) => {
  const logo = props.data.logo;
  const information = props.data.information;
  const user = props.data.user;
  const grades = props.data.grades;

  return (
    grades && (
      <Document>
        <Page size="A4" orientation="landscape">
          <View style={styles.content}>
            <View style={styles.schoolInfo}>
              <View style={styles.col}>
                <View style={styles.center}>
                  <Image style={styles.image} src={logo} />
                  <Text>{information.name}</Text>
                  <Text>Rector/a: {information.director_name}</Text>
                  <Text>Secretario/a: {information.secretary_name}</Text>
                </View>
              </View>
            </View>
            <View style={styles.headerInfo}>
              <Text>
                Estudiante: {user.student_name} {user.student_last_name}
              </Text>
              <Text>Especialidad: {user.specialty_name}</Text>
              <View style={styles.row}>
                <Text>Curso: {user.course_name}</Text>
                <Text>Paralelo: {user.parallel_name}</Text>
                <Text>
                  Periodo: {user.academic_period_name}-
                  {parseInt(user.academic_period_name) + 1}
                </Text>
              </View>
            </View>
            <View style={styles.headerTable}>
              <View style={styles.row}>
                <View style={styles.subjectName}>
                  <Text>Asignatura</Text>
                </View>
                <View style={styles.col}>
                  <View style={styles.row}>
                    <View style={styles.quimester}>
                      <Text>Quimestre 1</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text>Parcial 1</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>Parcial 2</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>Parcial 3</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>Final Q1</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.col}>
                  <View style={styles.row}>
                    <View style={styles.quimester}>
                      <Text>Quimestre 2</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text>Parcial 1</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>Parcial 2</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>Parcial 3</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>Final Q2</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cell}>
                  <Text>Supletorio</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Remedial</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Gracia</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Final</Text>
                </View>
              </View>
            </View>
            {grades.map((grade, i) => {
              return (
                <View key={i} style={styles.headerTable}>
                  <View style={styles.row}>
                    <View style={styles.subjectName}>
                      <Text>{grade.subject_name}</Text>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.cell}>
                        <Text>{grade.p1q1 ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.p2q1 ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.p3q1 ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.q1 ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.p1q2 ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.p2q2 ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.p3q2 ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.q2 ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.supletorio ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.remedial ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.gracia ?? "-"}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text>{grade.final ?? "-"}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
            <View style={{ borderTop: 1, height: "10pt" }} />
            <View style={styles.row}>
              <View style={{ width: "25%" }}>
                <Text></Text>
              </View>
              <View style={{ width: "25%", alignItems: "center", border: 1 }}>
                <Text>Comportamiento 1: {user.comportamiento1}</Text>
              </View>
              <View
                style={{
                  width: "25%",
                  alignItems: "center",
                  border: 1,
                  borderLeft: 0,
                }}
              >
                <Text>Comportamiento 2: {user.comportamiento2}</Text>
              </View>
              <View style={{ width: "25%", border: 1, borderLeft: 0 }}>
                <View style={styles.row}>
                  <View style={{ width: "75%" }}>
                    <Text style={{ alignSelf: "flex-end" }}>Promedio:</Text>
                  </View>
                  <View style={{ width: "25%" }}>
                    <Text style={{ alignSelf: "center" }}>{user.total}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: "30mm" }} />
            <View style={styles.row}>
              <View style={{ width: "25%" }}>
                <Text></Text>
              </View>
              <View
                style={{ width: "12.5%", borderTop: 1, alignItems: "center" }}
              >
                <Text>Rector/a</Text>
                <Text>{information.director_name}</Text>
              </View>
              <View style={{ width: "25%" }}>
                <Text></Text>
              </View>
              <View
                style={{ width: "12.5%", borderTop: 1, alignItems: "center" }}
              >
                <Text>Secretario/a</Text>
                <Text>{information.secretary_name}</Text>
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
