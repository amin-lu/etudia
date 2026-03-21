"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { Copy, Check } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface DashboardOverviewProps {
  name: string
  referralCode: string
}

const mockStats = {
  registrationsThisMonth: 12,
  registrationsTotal: 47,
  commissionThisMonth: 62.5,
  commissionTotal: 458.3,
}

const mockChartData = [
  { month: "Oct", inscriptions: 3 },
  { month: "Nov", inscriptions: 5 },
  { month: "Dec", inscriptions: 8 },
  { month: "Jan", inscriptions: 7 },
  { month: "Fév", inscriptions: 12 },
  { month: "Mar", inscriptions: 12 },
]

const mockReferrals = [
  { id: "1", date: "2025-03-15", product: "ETUDIET", status: "active" },
  { id: "2", date: "2025-03-12", product: "BacSuccess", status: "active" },
  { id: "3", date: "2025-03-08", product: "ETUDIET", status: "churned" },
  { id: "4", date: "2025-02-28", product: "ETUDIET", status: "active" },
  { id: "5", date: "2025-02-20", product: "BacSuccess", status: "active" },
]

export function DashboardOverview({
  name,
  referralCode,
}: DashboardOverviewProps) {
  const t = useTranslations("partner.dashboard")
  const [copied, setCopied] = useState(false)

  const referralLink = `https://etudia.com?ref=${referralCode}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 p-6 md:p-10">
      {/* Welcome Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {t("welcome", { name })}
          </h1>
          <p className="text-zinc-400 mt-2">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Referral Link Card */}
        <Card className="bg-zinc-900/50 border-indigo-500/30 p-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-300">
              {t("referralLink")}
            </h3>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 bg-zinc-950 rounded-lg text-sm text-indigo-400 font-mono overflow-x-auto">
                {referralLink}
              </code>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                icon={
                  copied ? (
                    <Check size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} />
                  )
                }
                className="shrink-0"
              >
                {copied ? t("copied") : t("copyLink")}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={t("stats.registrationsMonth")}
          value={mockStats.registrationsThisMonth.toString()}
          color="indigo"
        />
        <StatCard
          label={t("stats.registrationsTotal")}
          value={mockStats.registrationsTotal.toString()}
          color="blue"
        />
        <StatCard
          label={t("stats.commissionMonth")}
          value={formatPrice(mockStats.commissionThisMonth, "fr")}
          color="green"
        />
        <StatCard
          label={t("stats.commissionTotal")}
          value={formatPrice(mockStats.commissionTotal, "fr")}
          color="violet"
        />
      </div>

      {/* Chart */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">
          {t("chart.title")}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockChartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(113, 113, 122, 0.3)"
            />
            <XAxis stroke="rgb(161, 161, 170)" />
            <YAxis stroke="rgb(161, 161, 170)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(24, 24, 27)",
                border: "1px solid rgb(39, 39, 42)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "rgb(161, 161, 170)" }}
            />
            <Line
              type="monotone"
              dataKey="inscriptions"
              stroke="rgb(99, 102, 241)"
              strokeWidth={2}
              dot={{ fill: "rgb(99, 102, 241)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Referrals Table */}
      <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-white">
            {t("table.title")}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-400">
                  {t("table.date")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-400">
                  {t("table.product")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-400">
                  {t("table.status")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {mockReferrals.map((referral) => (
                <tr
                  key={referral.id}
                  className="hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-zinc-300">
                    {new Date(referral.date).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {referral.product}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        referral.status === "active" ? "success" : "warning"
                      }
                    >
                      {referral.status === "active"
                        ? t("table.active")
                        : t("table.churned")}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string
  color: "indigo" | "blue" | "green" | "violet"
}

const colorClasses: Record<StatCardProps["color"], string> = {
  indigo:
    "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 accent-color:indigo-500",
  blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  green: "bg-green-500/10 border-green-500/30 text-green-400",
  violet: "bg-violet-500/10 border-violet-500/30 text-violet-400",
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <Card className={`border ${colorClasses[color]} p-6`}>
      <p className="text-sm text-zinc-400 mb-2">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </Card>
  )
}
