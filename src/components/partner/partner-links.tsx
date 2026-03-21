"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PartnerApp {
  id: string
  name: string
  category: string
  siteUrl: string
  clicks: number
  conversions: number
}

const mockApps: PartnerApp[] = [
  {
    id: "1",
    name: "ETUDIET",
    category: "Éducation",
    siteUrl: "https://etudiet.vercel.app",
    clicks: 234,
    conversions: 12,
  },
  {
    id: "2",
    name: "BacSuccess",
    category: "Éducation",
    siteUrl: "https://bacsuccess.vercel.app",
    clicks: 156,
    conversions: 8,
  },
]

interface UtmLink {
  appId: string
  source: string
  medium: string
  campaign: string
}

export function PartnerLinks() {
  const t = useTranslations("partner.links")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [utmLinks, setUtmLinks] = useState<Record<string, UtmLink>>({})
  const [utmForms, setUtmForms] = useState<Record<string, boolean>>({})

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const generateUtmLink = (appId: string) => {
    const app = mockApps.find((a) => a.id === appId)
    if (!app) return ""

    const utm = utmLinks[appId]
    if (!utm || !utm.source || !utm.medium || !utm.campaign) return ""

    const url = new URL(app.siteUrl)
    url.searchParams.append("utm_source", utm.source)
    url.searchParams.append("utm_medium", utm.medium)
    url.searchParams.append("utm_campaign", utm.campaign)
    return url.toString()
  }

  const handleUtmChange = (
    appId: string,
    field: keyof UtmLink,
    value: string
  ) => {
    setUtmLinks((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        appId,
        [field]: value,
      },
    }))
  }

  const getConversionRate = (app: PartnerApp) => {
    if (app.clicks === 0) return "0%"
    return ((app.conversions / app.clicks) * 100).toFixed(1) + "%"
  }

  return (
    <div className="space-y-8 p-6 md:p-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
        <p className="text-zinc-400 mt-2">{t("subtitle")}</p>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockApps.map((app) => (
          <Card
            key={app.id}
            className="bg-zinc-900/50 border-zinc-800 p-6 space-y-6"
          >
            {/* App Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{app.name}</h3>
                <Badge variant="info">{app.category}</Badge>
              </div>
            </div>

            {/* Link Copy Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-zinc-400">
                Lien d'affiliation
              </h4>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-zinc-950 rounded-lg text-xs text-indigo-400 font-mono overflow-x-auto">
                  {app.siteUrl}
                </code>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(app.siteUrl, `link-${app.id}`)}
                  icon={
                    copiedId === `link-${app.id}` ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )
                  }
                  className="shrink-0"
                >
                  {t("copy")}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-zinc-950 rounded-lg p-3">
                <p className="text-xs text-zinc-400">{t("clicks")}</p>
                <p className="text-lg font-bold text-white">{app.clicks}</p>
              </div>
              <div className="bg-zinc-950 rounded-lg p-3">
                <p className="text-xs text-zinc-400">{t("conversions")}</p>
                <p className="text-lg font-bold text-white">
                  {app.conversions}
                </p>
              </div>
              <div className="bg-zinc-950 rounded-lg p-3">
                <p className="text-xs text-zinc-400">{t("conversionRate")}</p>
                <p className="text-lg font-bold text-indigo-400">
                  {getConversionRate(app)}
                </p>
              </div>
            </div>

            {/* UTM Generator */}
            <div className="border-t border-zinc-700 pt-6">
              <motion.button
                onClick={() =>
                  setUtmForms((prev) => ({
                    ...prev,
                    [app.id]: !prev[app.id],
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-zinc-700 hover:border-indigo-500 text-zinc-300 hover:text-indigo-400 text-sm font-medium transition-colors"
                whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
              >
                {t("generateUtm")}
              </motion.button>

              <AnimatePresence>
                {utmForms[app.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3 pt-4 border-t border-zinc-700"
                  >
                    <Input
                      label={t("utmSource")}
                      placeholder="youtube"
                      value={utmLinks[app.id]?.source || ""}
                      onChange={(e) =>
                        handleUtmChange(app.id, "source", e.target.value)
                      }
                    />
                    <Input
                      label={t("utmMedium")}
                      placeholder="video"
                      value={utmLinks[app.id]?.medium || ""}
                      onChange={(e) =>
                        handleUtmChange(app.id, "medium", e.target.value)
                      }
                    />
                    <Input
                      label={t("utmCampaign")}
                      placeholder="march2025"
                      value={utmLinks[app.id]?.campaign || ""}
                      onChange={(e) =>
                        handleUtmChange(app.id, "campaign", e.target.value)
                      }
                    />

                    {utmLinks[app.id]?.source &&
                      utmLinks[app.id]?.medium &&
                      utmLinks[app.id]?.campaign && (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <code className="flex-1 px-3 py-2 bg-zinc-950 rounded-lg text-xs text-green-400 font-mono overflow-x-auto">
                              {generateUtmLink(app.id)}
                            </code>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                handleCopy(
                                  generateUtmLink(app.id),
                                  `utm-${app.id}`
                                )
                              }
                              icon={
                                copiedId === `utm-${app.id}` ? (
                                  <Check
                                    size={16}
                                    className="text-green-400"
                                  />
                                ) : (
                                  <Copy size={16} />
                                )
                              }
                              className="shrink-0"
                            >
                              {t("copy")}
                            </Button>
                          </div>
                        </div>
                      )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
