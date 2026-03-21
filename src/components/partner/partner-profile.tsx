"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { toast } from "sonner"

interface ProfileData {
  name: string
  email: string
  platform: string
  profileUrl: string
  thematic: string
}

interface PasswordData {
  current: string
  new: string
  confirm: string
}

interface PaymentData {
  type: "paypal" | "bank"
  paypal: string
  iban: string
}

export function PartnerProfile() {
  const t = useTranslations("partner.profile")
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState<ProfileData>({
    name: "John Doe",
    email: "john@example.com",
    platform: "youtube",
    profileUrl: "https://youtube.com/@johndoe",
    thematic: "Tech",
  })

  const [password, setPassword] = useState<PasswordData>({
    current: "",
    new: "",
    confirm: "",
  })

  const [payment, setPayment] = useState<PaymentData>({
    type: "paypal",
    paypal: "john@example.com",
    iban: "",
  })

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(t("saved"))
    } catch (error) {
      toast.error("Une erreur est survenue")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (password.new !== password.confirm) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(t("saved"))
      setPassword({ current: "", new: "", confirm: "" })
    } catch (error) {
      toast.error("Une erreur est survenue")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSavePayment = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(t("saved"))
    } catch (error) {
      toast.error("Une erreur est survenue")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8 p-6 md:p-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
      </div>

      {/* Personal Information Section */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">
          {t("personalInfo")}
        </h3>

        <div className="space-y-4">
          <Input
            label={t("name")}
            value={profile.name}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            label={t("email")}
            type="email"
            value={profile.email}
            disabled
            helperText="Non modifiable"
          />
          <Select
            label={t("platform")}
            value={profile.platform}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, platform: e.target.value }))
            }
            options={[
              { value: "youtube", label: "YouTube" },
              { value: "tiktok", label: "TikTok" },
              { value: "instagram", label: "Instagram" },
              { value: "twitch", label: "Twitch" },
              { value: "twitter", label: "X (Twitter)" },
              { value: "linkedin", label: "LinkedIn" },
              { value: "other", label: "Autre" },
            ]}
          />
          <Input
            label={t("profileUrl")}
            type="url"
            value={profile.profileUrl}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, profileUrl: e.target.value }))
            }
          />
          <Input
            label={t("thematic")}
            placeholder="Ex: Tech, Marketing, Fitness"
            value={profile.thematic}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, thematic: e.target.value }))
            }
          />

          <Button
            variant="primary"
            size="md"
            onClick={handleSaveProfile}
            isLoading={isSaving}
          >
            {t("save")}
          </Button>
        </div>
      </Card>

      {/* Change Password Section */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">
          {t("changePassword")}
        </h3>

        <div className="space-y-4">
          <Input
            label={t("currentPassword")}
            type="password"
            value={password.current}
            onChange={(e) =>
              setPassword((prev) => ({ ...prev, current: e.target.value }))
            }
          />
          <Input
            label={t("newPassword")}
            type="password"
            value={password.new}
            onChange={(e) =>
              setPassword((prev) => ({ ...prev, new: e.target.value }))
            }
          />
          <Input
            label={t("confirmPassword")}
            type="password"
            value={password.confirm}
            onChange={(e) =>
              setPassword((prev) => ({ ...prev, confirm: e.target.value }))
            }
          />

          <Button
            variant="primary"
            size="md"
            onClick={handleChangePassword}
            isLoading={isSaving}
          >
            {t("save")}
          </Button>
        </div>
      </Card>

      {/* Payment Information Section */}
      <Card className="bg-zinc-900/50 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">
          {t("paymentInfo")}
        </h3>

        <div className="space-y-4">
          <Select
            label={t("paymentType")}
            value={payment.type}
            onChange={(e) =>
              setPayment((prev) => ({
                ...prev,
                type: e.target.value as "paypal" | "bank",
              }))
            }
            options={[
              { value: "paypal", label: "PayPal" },
              { value: "bank", label: "Virement bancaire" },
            ]}
          />

          {payment.type === "paypal" ? (
            <Input
              label={t("paypalEmail")}
              type="email"
              value={payment.paypal}
              onChange={(e) =>
                setPayment((prev) => ({ ...prev, paypal: e.target.value }))
              }
            />
          ) : (
            <Input
              label={t("iban")}
              value={payment.iban}
              onChange={(e) =>
                setPayment((prev) => ({ ...prev, iban: e.target.value }))
              }
              placeholder="FR76 1234 5678 9012 3456 7890 123"
            />
          )}

          <Button
            variant="primary"
            size="md"
            onClick={handleSavePayment}
            isLoading={isSaving}
          >
            {t("save")}
          </Button>
        </div>
      </Card>
    </div>
  )
}
