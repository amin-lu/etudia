"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface MRRChartProps {
  data: Array<{
    month: string
    mrr: number
  }>
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 shadow-lg">
        <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
          {`€${payload[0].value.toFixed(2)}`}
        </p>
      </div>
    )
  }
  return null
}

export function MRRChart({ data }: MRRChartProps) {
  return (
    <Card className="rounded-xl bg-card border-card-border">
      <CardHeader className="border-b border-card-border">
        <h3 className="text-lg font-semibold text-foreground">
          Évolution du MRR
        </h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--chart-grid, #d4d4d8)"
              />
              <XAxis
                dataKey="month"
                stroke="var(--chart-axis, #71717a)"
                style={{ fontSize: "0.875rem" }}
              />
              <YAxis
                stroke="var(--chart-axis, #71717a)"
                style={{ fontSize: "0.875rem" }}
                tickFormatter={(value: number) => `€${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="mrr"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ fill: "#6366F1", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
