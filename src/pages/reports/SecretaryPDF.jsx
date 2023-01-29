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
  },
  headerTable: {
    border: "1pt",
    borderRight: 0,
    borderBottom: 0,
  },
  number: {
    width: "100mm",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "1pt",
  },
  studentName: {
    width: "1500mm",
    justifyContent: "center",
    borderRight: "1pt",
    paddingLeft: "3pt",
  },
  subject: {
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
  },
});

const SecretaryPDF = (props) => {
  const logo = props.data.logo;
  const course = props.data.course;
  const academicYear = props.data.academic_period;
  const information = props.data.information;
  const parallel = props.data.parallel;
  const specialty = props.data.specialty;
  const students = props.data.students;

  return (
    students && (
      <Document>
        <Page size="A3" orientation="landscape">
          <View style={styles.content}>
            <View style={styles.schoolInfo}>
              <View style={styles.col}>
                <View style={styles.center}>
                  <Image style={styles.image} src={logo} />
                  <Text>{information.name}</Text>
                  <Text>Director/a: {information.director_name}</Text>
                  <Text>Secretaria/o: {information.secretary_name}</Text>
                </View>
              </View>
            </View>
            <View style={styles.headerInfo}>
              <View style={styles.row}>
                <Text>Curso: {course}</Text>
                <Text>Paralelo: {parallel}</Text>
                <Text>Especialidad: {specialty}</Text>
                <Text>
                  Periodo: {academicYear}-{parseInt(academicYear) + 1}
                </Text>
              </View>
            </View>
            <View style={styles.headerTable}>
              <View style={styles.row}>
                <View style={styles.number}>
                  <Text>N°</Text>
                </View>
                <View style={styles.studentName}>
                  <Text>Estudiante</Text>
                </View>
                {students[0].grades.map((subject, i) => {
                  return (
                    <View key={i}>
                      <View style={styles.row}>
                        <View style={styles.subject}>
                          <Text>{subject.subject_name}</Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.cell}>
                          <Text>Q1</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text>Q2</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text>S</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text>R</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text>G</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text>Final</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
                <View style={styles.cell}>
                  <Text>Comp 1</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Comp 2</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Prom</Text>
                </View>
              </View>
            </View>
            {students.map((student, i) => {
              return (
                <View key={i} style={styles.headerTable}>
                  <View style={styles.row}>
                    <View style={styles.number}>
                      <Text>{i + 1}</Text>
                    </View>
                    <View style={styles.studentName}>
                      <Text>
                        {student.student_name} {student.student_last_name}
                      </Text>
                    </View>
                    {student.grades.map((grade, i) => {
                      return (
                        <View key={i} style={styles.row}>
                          <View style={styles.cell}>
                            <Text>{grade.q1 ?? "-"}</Text>
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
                      );
                    })}
                    <View style={styles.cell}>
                      <Text>{student.comportamiento1 ?? "-"}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>{student.comportamiento2 ?? "-"}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text>{student.total ?? "-"}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
            <View style={{ borderTop: 1 }} />
          </View>
        </Page>
      </Document>
    )
  );
};

export default SecretaryPDF;
