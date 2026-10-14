import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 12 },
  title: { fontSize: 18, marginBottom: 12 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
});

interface Props {
  memberName: string;
  totalMeals: number;
  totalDeposit: number;
}

export const MonthlyReportPdf = ({
  memberName,
  totalMeals,
  totalDeposit,
}: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Monthly Report</Text>
      <View style={styles.row}>
        <Text>Member</Text>
        <Text>{memberName}</Text>
      </View>
      <View style={styles.row}>
        <Text>Total Meals</Text>
        <Text>{totalMeals}</Text>
      </View>
      <View style={styles.row}>
        <Text>Total Deposit</Text>
        <Text>{totalDeposit}</Text>
      </View>
    </Page>
  </Document>
);
