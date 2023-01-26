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
    width: "60px",
    alignItems: "center",
  },
});

const Table = () => (
  <Document>
    <Page size="A4" orientation="landscape">
      <View style={styles.content}>
        <View style={styles.schoolInfo}>
          <View style={styles.col}>
            <Image
              style={styles.image}
              src="https://cdn-icons-png.flaticon.com/512/2231/2231696.png"
            />
            <View style={styles.cell}>
              <Text
                style={{
                  alignSelf: "center",
                }}
              >
                Director/a:
              </Text>
            </View>
            <View style={styles.cell}>
              <Text
                style={{
                  alignSelf: "center",
                }}
              >
                Secretaria/o:
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.studentInfo}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Estudiante: </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Especialidad: </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Curso: </Text>
            </View>
            <View style={styles.cell}>
              <Text>Paralelo: </Text>
            </View>
            <View style={styles.cell}>
              <Text>Periodo: </Text>
            </View>
          </View>
        </View>
        <View style={styles.gradesHeader}>
          <View style={styles.row}>
            <View style={styles.title}>
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
        <View style={styles.body}>
          <Text>BODY</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default Table;
