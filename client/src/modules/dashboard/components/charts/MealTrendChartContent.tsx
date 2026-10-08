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
    <div className="h-75 w-full text-theme-text-muted outline-none **:outline-none">
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
              <stop
                offset="0%"
                stopColor="var(--theme-chart-1)"
                stopOpacity={0.25}
              />
              <stop
                offset="100%"
                stopColor="var(--theme-chart-1)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="var(--theme-border)"
            strokeOpacity={0.8}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "var(--theme-text-muted)",
            }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            tick={{
              fontSize: 11,
              fill: "var(--theme-text-muted)",
            }}
          />

          <Tooltip
            cursor={{
              stroke: "var(--theme-border-hover)",
              strokeOpacity: 0.6,
            }}
            contentStyle={{
              borderRadius: "var(--theme-radius-lg)",
              border: "1px solid var(--theme-border)",
              backgroundColor: "var(--theme-card)",
              color: "var(--theme-text)",
              boxShadow: "var(--theme-shadow-sm)",
            }}
            labelStyle={{
              fontWeight: 600,
              marginBottom: 4,
              color: "var(--theme-text)",
            }}
            itemStyle={{
              color: "var(--theme-text-secondary)",
            }}
            formatter={(value) => [`${value} meals`, "Meals"]}
          />

          <Area
            type="monotone"
            dataKey="meals"
            stroke="var(--theme-chart-1)"
            strokeWidth={2}
            fill="url(#mealTrendFill)"
            fillOpacity={1}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "var(--theme-card)",
              fill: "var(--theme-chart-1)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
