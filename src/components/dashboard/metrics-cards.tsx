"use client"

import { motion } from "framer-motion"
import { TrendingUp, Box, Users, Coins, UserCheck } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface MetricsCardsProps {
  totalMrr: number
  totalSaas: number
  totalCreators: number
  totalRedistributed: number
  totalUsers?: number
}

export function MetricsCards({
  totalMrr,
  totalSaas,
  totalCreators,
  totalRedistributed,
  totalUsers = 0,
}: MetricsCardsProps) {
  const metrics = [
    {
      label: "Total MRR",
      icon: TrendingUp,
      value: totalMrr,
      format: (v: number) => formatCurrency(v),
      color: "from-indigo-500/20 to-indigo-600/20",
    },
    {
      label: "SaaS actifs",
      icon: Box,
      value: totalSaas,
      format: (v: number) => v.toString(),
      color: "from-purple-500/20 to-purple-600/20",
    },
    {
      label: "Créateurs partenaires",
      icon: Users,
      value: totalCreators,
      format: (v: number) => v.toString(),
      color: "from-green-500/20 to-green-600/20",
    },
    {
      label: "Total redistribué",
      icon: Coins,
      value: totalRedistributed,
      format: (v: number) => formatCurrency(v),
      color: "from-pink-500/20 to-pink-600/20",
    },
    {
      label: "Utilisateurs total",
      icon: UserCheck,
      value: totalUsers,
      format: (v: number) => v.toString(),
      color: "from-blue-500/20 to-blue-600/20",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <motion.div key={index} variants={itemVariants}>
            <Card
              variant="interactive"
              className={`bg-gradient-to-br ${metric.color} border-white/10 hover:border-white/20`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-sm text-foreground/70 mb-2">{metric.label}</p>
                <div className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] text-foreground">
                  <AnimatedCounter
                    value={metric.value}
                    duration={2}
                    decimals={metric.label.includes("redistribué") ? 2 : 0}
                    suffix={
                      metric.label.includes("redistribué")
                        ? "€"
                        : metric.label.includes("MRR")
                          ? "€"
                          : ""
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
