import {
  Document,
  View,
  Page,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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
  subjectInfo: {
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

const TeacherPDF = (props) => {
  const logo = props.data.logo;
  const subject = props.data.subject_name;
  const course = props.data.course;
  const academicYear = props.data.academic_period;
  const information = props.data.information;
  const parallel = props.data.parallel;
  const specialty = props.data.specialty;

  // const user = props.data.user;
  // const subjects = props.data.grades;
  // const [subjectsTable, setSubjectsTable] = useState(false);
  console.log(props.data);
  return (
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
          <View style={styles.subjectInfo}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text>Asignatura: {subject}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.cell}>
                <Text>Especialidad: {specialty}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.cell}>
                <Text>Curso: {course}</Text>
              </View>
              <View style={styles.cell}>
                <Text>Paralelo: {parallel}</Text>
              </View>
              <View style={styles.cell}>
                <Text>Periodo: {academicYear}</Text>
              </View>
            </View>
          </View>
          <View style={styles.gradesHeader}>
            <View style={styles.row}>
              <View style={styles.subjectName}>
                <Text>Estudiante</Text>
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
          <View style={styles.subject}>
            <View style={styles.gradesHeader}>
              <View style={styles.row}>
                <View style={styles.subjectName}>
                  <Text>Asignatura</Text>
                </View>
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
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TeacherPDF;
