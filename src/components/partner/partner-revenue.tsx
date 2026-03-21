"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"

interface Commission {
  month: string
  subscribers: number
  amount: number
  status: "pending" | "validated" | "paid"
}

const mockRevenue = {
  pendingAmount: 125.8,
  paidAmount: 332.5,
  commissions: [
    {
      month: "Mars 2025",
      subscribers: 12,
      amount: 62.5,
      status: "pending" as const,
    },
    {
      month: "Février 2025",
      subscribers: 10,
      amount: 51.6,
      status: "validated" as const,
    },
    {
      month: "Janvier 2025",
      subscribers: 8,
      amount: 41.2,
      status: "paid" as const,
    },
    {
      month: "Décembre 2024",
      subscribers: 7,
      amount: 36.1,
      status: "paid" as const,
    },
  ],
}

export function PartnerRevenue() {
  const t = useTranslations("partner.revenue")
  const [paymentType, setPaymentType] = useState<"paypal" | "bank">("paypal")
  const [paymentInfo, setPaymentInfo] = useState({
    paypal: "",
    iban: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleRequestPayout = () => {
    if (mockRevenue.pendingAmount < 50) {
      toast.error(t("minimumAmount"))
      return
    }
    toast.success("Demande de paiement envoyée avec succès!")
  }

  const handleSavePaymentInfo = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(t("saved"))
    } catch (error) {
      toast.error(t("error"))
    } finally {
      setIsSaving(false)
    }
  }

  const getStatusBadge = (
    status: Commission["status"]
  ): "warning" | "info" | "success" => {
    const variants: Record<Commission["status"], "warning" | "info" | "success"> = {
      pending: "warning",
      validated: "info",
      paid: "success",
    }
    return variants[status]
  }

  return (
    <div className="space-y-8 p-6 md:p-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900/50 border-zinc-800 p-6">
          <p className="text-sm text-zinc-400 mb-2">{t("pending")}</p>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-bold text-orange-400">
              {formatPrice(mockRevenue.pendingAmount, "fr")}
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={handleRequestPayout}
              disabled={mockRevenue.pendingAmount < 50}
            >
              {t("requestPayout")}
            </Button>
          </div>
          {mockRevenue.pendingAmount < 50 && (
            <p className="text-xs text-zinc-500 mt-3">{t("minimumAmount")}</p>
          )}
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 p-6">
          <p className="text-sm text-zinc-400 mb-2">{t("paid")}</p>
          <p className="text-4xl font-bold text-green-400">
            {formatPrice(mockRevenue.paidAmount, "fr")}
          </p>
        </Card>
      </div>

      {/* Commissions Table */}
      <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-white">
            Historique des commissions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-400">
                  {t("table.month")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-400">
                  {t("table.subscribers")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-400">
                  {t("table.amount")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-zinc-400">
                  {t("table.status")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {mockRevenue.commissions.map((commission, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-zinc-300">
                    {commission.month}
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {commission.subscribers}
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {formatPrice(commission.amount, "fr")}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusBadge(commission.status)}>
                      {commission.status === "pending" && t("status.pending")}
                      {commission.status === "validated" && t("status.validated")}
                      {commission.status === "paid" && t("status.paid")}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Info Section */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">
          {t("paymentInfo")}
        </h3>

        <div className="space-y-6">
          <Select
            label={t("paymentType")}
            value={paymentType}
            onChange={(e) =>
              setPaymentType(e.target.value as "paypal" | "bank")
            }
            options={[
              { value: "paypal", label: "PayPal" },
              { value: "bank", label: "Virement bancaire" },
            ]}
          />

          {paymentType === "paypal" ? (
            <Input
              label={t("paypalEmail")}
              type="email"
              placeholder="votre@email.com"
              value={paymentInfo.paypal}
              onChange={(e) =>
                setPaymentInfo((prev) => ({
                  ...prev,
                  paypal: e.target.value,
                }))
              }
            />
          ) : (
            <Input
              label={t("iban")}
              placeholder="FR76 1234 5678 9012 3456 7890 123"
              value={paymentInfo.iban}
              onChange={(e) =>
                setPaymentInfo((prev) => ({
                  ...prev,
                  iban: e.target.value,
                }))
              }
            />
          )}

          <Button
            variant="primary"
            size="md"
            onClick={handleSavePaymentInfo}
            isLoading={isSaving}
          >
            {t("updatePayment")}
          </Button>
        </div>
      </Card>
    </div>
  )
}
