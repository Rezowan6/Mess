import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { MealTrendData } from "./MealTrendChart";

interface Props {
  data: MealTrendData[];
}

export const MealTrendChartContent = ({ data }: Props) => {
  return (
    <div className="h-75 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="mealTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.2} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="currentColor"
            strokeOpacity={0.08}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "currentColor",
              opacity: 0.5,
            }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            tick={{
              fontSize: 11,
              fill: "currentColor",
              opacity: 0.5,
            }}
          />

          <Tooltip
            cursor={{
              stroke: "currentColor",
              strokeOpacity: 0.12,
            }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid hsl(var(--b3))",
              backgroundColor: "hsl(var(--b1))",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
            }}
            labelStyle={{
              fontWeight: 600,
              marginBottom: 4,
            }}
            formatter={(value) => [`${value} meals`, "Meals"]}
          />

          <Area
            type="monotone"
            dataKey="meals"
            stroke="currentColor"
            strokeWidth={1}
            fill="url(#mealTrendFill)"
            fillOpacity={1}
            className="text-info"
            activeDot={{
              r: 5,
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
