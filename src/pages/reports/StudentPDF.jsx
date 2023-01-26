import {
  Document,
  View,
  Page,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  col: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    width: "auto",
    flexDirection: "row",
    // alignItems: "center",
  },
  subject: {
    marginTop: "5px",
  },
  cell: {
    width: "auto",
  },
  content: {
    width: "auto",
    margin: "30px",
    fontSize: 10,
  },
  studentInfo: {
    width: "auto",
    padding: "5px",
  },
  schoolInfo: {
    width: "auto",
    fontSize: 8,
  },
  image: {
    width: "50px",
    height: "50px",
    alignSelf: "center",
  },
  gradesHeader: {
    width: "auto",
    borderStyle: "solid",
    borderBottomWidth: "1px",
    borderLeftWidth: "1px",
  },
  title: {
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    borderStyle: "solid",
    borderRightWidth: "1px",
    borderTopWidth: "1px",
    height: "100%",
  },
  grade: {
    fontSize: 12,
  },
  subjectName: {
    width: "400%",
    alignItems: "center",
    borderStyle: "solid",
    borderRightWidth: "1px",
    borderTopWidth: "1px",
  },
  text: {
    fontSize: 10,
  },
});

const StudentPDF = (props) => {
  const logo = props.data.logo;
  const information = props.data.information;
  const user = props.data.user;
  const grades = props.data.grades;
  const [gradesTable, setGradesTable] = useState(false);

  useEffect(() => {
    setGradesTable(
      grades.map((grade) => {
        return (
          <View style={styles.subject}>
            <View style={styles.row}>
              <View style={styles.subjectName}>
                <Text style={styles.text}>{grade.subject_name}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.p1q1 ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.p2q1 ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.p3q1 ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.q1 ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.p1q2 ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.p2q2 ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.p3q2 ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.q2 ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.supletorio ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.remedial ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.gracia ?? "-"}</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.grade}>{grade.final ?? "-"}</Text>
              </View>
            </View>
          </View>
        );
      })
    );
  }, [grades]);

  return (
    grades && (
      <Document>
        <Page size="A4" orientation="landscape">
          <View style={styles.content}>
            <View style={styles.schoolInfo}>
              <View style={styles.col}>
                <Image style={styles.image} src={logo} />
                <View style={styles.cell}>
                  <Text
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    {information.name}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    Director/a: {information.director_name}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    Secretaria/o: {information.secretary_name}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.studentInfo}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text>
                    Estudiante: {user.student_name} {user.student_last_name}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text>Especialidad: {user.specialty_name}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text>Curso: {user.course_name}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Paralelo: {user.parallel_name}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Periodo: {user.academic_period_name}-{parseInt(user.academic_period_name)+1}</Text>
                </View>
              </View>
            </View>
            <View style={styles.gradesHeader}>
              <View style={styles.row}>
                <View style={styles.subjectName}>
                  <Text>Asignatura</Text>
                </View>
                <View style={styles.col}>
                  <View style={styles.row}>
                    <View style={styles.title}>
                      <Text>Quimestre 1</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.title}>
                      <Text>Parcial 1</Text>
                    </View>
                    <View style={styles.title}>
                      <Text>Parcial 2</Text>
                    </View>
                    <View style={styles.title}>
                      <Text>Parcial 3</Text>
                    </View>
                    <View style={styles.title}>
                      <Text>Final Q1</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.col}>
                  <View style={styles.row}>
                    <View style={styles.title}>
                      <Text>Quimestre 2</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.title}>
                      <Text>Parcial 1</Text>
                    </View>
                    <View style={styles.title}>
                      <Text>Parcial 2</Text>
                    </View>
                    <View style={styles.title}>
                      <Text>Parcial 3</Text>
                    </View>
                    <View style={styles.title}>
                      <Text>Final Q2</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.title}>
                  <Text>Supletorio</Text>
                </View>
                <View style={styles.title}>
                  <Text>Remedial</Text>
                </View>
                <View style={styles.title}>
                  <Text>Gracia</Text>
                </View>
                <View style={styles.title}>
                  <Text>Final</Text>
                </View>
              </View>
            </View>
            <View render={() => gradesTable} />

            <View
              style={{
                marginTop: "10px",
              }}
            >
              <View style={styles.row}>
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <Text></Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text>Comportamiento 1: {user.comportamiento1}</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text>Comportamiento 2: {user.comportamiento2}</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    alignContent: "flex-end",
                  }}
                >
                  <Text>Promedio: {user.total}</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    )
  );
};

export default StudentPDF;
