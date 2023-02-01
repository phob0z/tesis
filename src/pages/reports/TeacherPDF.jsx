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

const TeacherPDF = (props) => {
  const logo = props.data.logo;
  const subject = props.data.subject_name;
  const course = props.data.course;
  const academicYear = props.data.academic_period;
  const information = props.data.information;
  const parallel = props.data.parallel;
  const specialty = props.data.specialty;
  const grades = props.data.grades;

  return (
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
            <Text>Asignatura: {subject}</Text>
            <Text>Especialidad: {specialty}</Text>
            <View style={styles.row}>
              <Text>Curso: {course}</Text>
              <Text>Paralelo: {parallel}</Text>
              <Text>
                Periodo: {academicYear}-{parseInt(academicYear) + 1}
              </Text>
            </View>
          </View>
          <View style={styles.headerTable}>
            <View style={styles.row}>
              <View style={styles.subjectName}>
                <Text>Estudiante</Text>
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
                    <Text>
                      {grade.student_name} {grade.student_last_name}
                    </Text>
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
          <View style={{ borderTop: 1, height: "30mm" }} />
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
  );
};

export default TeacherPDF;
