"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface NicheChartProps {
  data: Array<{
    name: string
    value: number
  }>
}

const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
]

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number }>
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 shadow-lg">
        <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">{payload[0].name}</p>
        <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

export function NicheChart({ data }: NicheChartProps) {
  return (
    <Card className="rounded-xl bg-card border-card-border">
      <CardHeader className="border-b border-card-border">
        <h3 className="text-lg font-semibold text-foreground">
          Répartition par niche
        </h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-zinc-600 dark:text-foreground/70">
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
