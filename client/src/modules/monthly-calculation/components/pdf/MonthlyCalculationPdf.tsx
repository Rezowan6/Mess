import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { getMonthlyCalculationInfoCards } from "../../configs/monthlyCalculationInfoCards.config";
import type {
  IMonthlyCalculation,
  IMonthlyCalculationMember,
} from "../../types/monthlyCalculation.types";

// PDF is always printed on white paper, so a fixed palette is correct here
const PDF_COLORS = {
  text: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
  headerBg: "#f3f4f6",
  danger: "#dc2626",
  success: "#16a34a",
  info: "#0284c7",
} as const;

const styles = StyleSheet.create({
  page: {
    padding: 24,
    paddingBottom: 40,
    fontSize: 9,
    color: PDF_COLORS.text,
  },
  header: { marginBottom: 14 },
  tenant: { fontSize: 15, fontWeight: 700 },
  title: { fontSize: 11, marginTop: 2 },
  period: { fontSize: 9, color: PDF_COLORS.muted, marginTop: 2 },

  summary: { flexDirection: "row", flexWrap: "wrap", marginBottom: 14 },
  summaryCell: {
    width: "20%",
    padding: 6,
    borderWidth: 0.5,
    borderColor: PDF_COLORS.border,
  },
  summaryLabel: { fontSize: 8, color: PDF_COLORS.muted },
  summaryValue: { fontSize: 11, fontWeight: 700, marginTop: 2 },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: PDF_COLORS.headerBg,
    borderWidth: 0.5,
    borderColor: PDF_COLORS.border,
  },
  row: {
    flexDirection: "row",
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: PDF_COLORS.border,
  },
  cell: { paddingVertical: 5, paddingHorizontal: 6 },
  headCell: { fontWeight: 700, fontSize: 8 },

  footer: {
    position: "absolute",
    bottom: 16,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: PDF_COLORS.muted,
  },
});

const money = (value: number | null | undefined) =>
  `Tk ${Number(value ?? 0).toFixed(2)}`;

interface PdfColumn {
  title: string;
  width: string;
  align?: "left" | "right" | "center";
  value: (member: IMonthlyCalculationMember) => string;
  color?: (member: IMonthlyCalculationMember) => string | undefined;
}

const COLUMNS: PdfColumn[] = [
  { title: "Member", width: "18%", value: (m) => m.name },
  { title: "Deposit", width: "10%", align: "right", value: (m) => money(m.deposit) },
  { title: "Meal", width: "8%", align: "right", value: (m) => String(m.totalMeal ?? 0) },
  { title: "Meal Cost", width: "11%", align: "right", value: (m) => money(m.normalMealCost) },
  { title: "Party Cost", width: "10%", align: "right", value: (m) => money(m.partyCost) },
  { title: "Egg Cost", width: "10%", align: "right", value: (m) => money(m.eggCost) },
  { title: "Total Cost", width: "11%", align: "right", value: (m) => money(m.memberCost) },
  {
    title: "Balance",
    width: "11%",
    align: "right",
    value: (m) => money(Math.abs(m.balance)),
    color: (m) => (m.balance < 0 ? PDF_COLORS.danger : PDF_COLORS.success),
  },
  {
    title: "Status",
    width: "11%",
    align: "center",
    value: (m) => m.status,
    color: (m) =>
      m.status === "Payable"
        ? PDF_COLORS.danger
        : m.status === "Received"
          ? PDF_COLORS.success
          : PDF_COLORS.info,
  },
];

export interface MonthlyCalculationPdfProps {
  calculation: IMonthlyCalculation;
  tenantName: string;
  periodLabel: string; // e.g. "October 2026"
  generatedAt: string; // formatted by the caller
}

export const MonthlyCalculationPdf = ({
  calculation,
  tenantName,
  periodLabel,
  generatedAt,
}: MonthlyCalculationPdfProps) => {
  const infoCards = getMonthlyCalculationInfoCards(calculation);

  return (
    <Document
      title={`Monthly Calculation - ${periodLabel}`}
      author={tenantName}
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.tenant}>{tenantName}</Text>
          <Text style={styles.title}>Monthly Calculation</Text>
          <Text style={styles.period}>{periodLabel}</Text>
        </View>

        <View style={styles.summary}>
          {infoCards.map((card) => (
            <View key={card.key} style={styles.summaryCell} wrap={false}>
              <Text style={styles.summaryLabel}>{card.label}</Text>
              <Text style={styles.summaryValue}>
                {card.prefix === "" // count values (e.g. total meals) have no currency
                  ? card.amount.toFixed(card.decimals ?? 2)
                  : money(card.amount)}
              </Text>
            </View>
          ))}
        </View>

        {/* fixed: header repeats on every page when the table is long */}
        <View style={styles.tableHeader} fixed>
          {COLUMNS.map((col) => (
            <Text
              key={col.title}
              style={[
                styles.cell,
                styles.headCell,
                { width: col.width, textAlign: col.align ?? "left" },
              ]}
            >
              {col.title}
            </Text>
          ))}
        </View>

        {calculation?.members?.map((member) => (
          // wrap={false}: a row is never split across two pages
          <View key={member.name} style={styles.row} wrap={false}>
            {COLUMNS.map((col) => (
              <Text
                key={col.title}
                style={[
                  styles.cell,
                  {
                    width: col.width,
                    textAlign: col.align ?? "left",
                    color: col.color?.(member) ?? PDF_COLORS.text,
                  },
                ]}
              >
                {col.value(member)}
              </Text>
            ))}
          </View>
        ))}

        <View style={styles.footer} fixed>
          <Text>Generated: {generatedAt}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};