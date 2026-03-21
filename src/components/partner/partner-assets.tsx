"use client"

import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Download } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
}

const products: Product[] = [
  { id: "1", name: "ETUDIET" },
  { id: "2", name: "BacSuccess" },
]

const bannerSizes = [
  { label: "1200x628 (Desktop)", filename: "banner-1200x628" },
  { label: "1080x1080 (Square)", filename: "banner-1080x1080" },
  { label: "1080x1920 (Vertical)", filename: "banner-1080x1920" },
]

const marketingCopy = {
  shortDescription:
    "Découvre l'outil parfait pour tes études. Simple, efficace, et créé pour les étudiants qui veulent réussir.",
  longDescription:
    "ETUDIET est l'application complète pour réussir tes études. Avec des fiches de révision, des exercices corrigés, et un suivi personnalisé, tu as tout ce qu'il faut pour progresser. Accès illimité à plus de 500 cours détaillés, créés par des enseignants expérimentés. Revise, pratique, et réussis.",
  socialHook:
    "Les étudiants qui utilisent ETUDIET augmentent leurs notes en moyenne de 15 points. C'est fou non ? 📚✨",
}

export function PartnerAssets() {
  const t = useTranslations("partner.assets")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      toast.success(t("copy"))
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      toast.error("Erreur lors de la copie")
    }
  }

  const handleDownload = (filename: string) => {
    toast.success(`Téléchargement de ${filename}...`)
  }

  return (
    <div className="space-y-8 p-6 md:p-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
        <p className="text-zinc-400 mt-2">{t("subtitle")}</p>
      </div>

      {/* Products */}
      {products.map((product) => (
        <div key={product.id} className="space-y-6">
          <h2 className="text-2xl font-bold text-white mt-8">{product.name}</h2>

          {/* Visuals Section */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("visuals")}
            </h3>
            <div className="space-y-3">
              {bannerSizes.map((banner) => (
                <div
                  key={banner.filename}
                  className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg hover:bg-zinc-900/50 transition-colors"
                >
                  <div>
                    <p className="text-white font-medium">{banner.label}</p>
                    <p className="text-xs text-zinc-400">{banner.filename}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDownload(banner.filename)}
                    icon={<Download size={16} />}
                  >
                    {t("download")}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Marketing Texts Section */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("texts")}
            </h3>
            <div className="space-y-4">
              <TextBlock
                label="Description courte"
                text={marketingCopy.shortDescription}
                id={`short-${product.id}`}
                onCopy={handleCopy}
                copied={copiedId === `short-${product.id}`}
              />
              <TextBlock
                label="Description longue"
                text={marketingCopy.longDescription}
                id={`long-${product.id}`}
                onCopy={handleCopy}
                copied={copiedId === `long-${product.id}`}
              />
              <TextBlock
                label="Hook réseaux sociaux"
                text={marketingCopy.socialHook}
                id={`hook-${product.id}`}
                onCopy={handleCopy}
                copied={copiedId === `hook-${product.id}`}
              />
            </div>
          </Card>

          {/* Guide Section */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("guide")}
            </h3>
            <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-sm">
              <div>
                <h4 className="text-white font-semibold">Avant de promouvoir</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Teste l'application toi-même pour en parler authentiquement</li>
                  <li>Comprends les features principales et les bénéfices</li>
                  <li>Identifie comment c'est pertinent pour ta communauté</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Idées de contenu
                </h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Vidéo de 30 secondes: screenshot du produit + ton avis</li>
                  <li>Reel: "Outil qui m'a changé ma vie" (avant/après)</li>
                  <li>Story: "J'ai trouvé l'outil parfait pour [problème]"</li>
                  <li>Post texte: Partage ton expérience perso</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  À faire et à éviter
                </h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>✅ Sois authentique et enthousiaste</li>
                  <li>✅ Montre les cas d'usage réels</li>
                  <li>❌ Ne fais pas que partager le lien sans explication</li>
                  <li>❌ Évite les promesses irréalistes de résultats</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Brand Kit Section */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("brandKit")}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-white mb-2">
                  Couleurs Etudia
                </h4>
                <div className="flex gap-3">
                  <ColorSwatch color="#18181b" label="Noir" />
                  <ColorSwatch color="#6366f1" label="Indigo" />
                  <ColorSwatch color="#f4f4f5" label="Blanc" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-2">
                  Typographie
                </h4>
                <p className="text-xs text-zinc-400">
                  Inter (body) et Instrument Sans (titres)
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Logo</h4>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownload("etudia-logo")}
                  icon={<Download size={16} />}
                >
                  Télécharger le logo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}

interface TextBlockProps {
  label: string
  text: string
  id: string
  onCopy: (text: string, id: string) => void
  copied: boolean
}

function TextBlock({
  label,
  text,
  id,
  onCopy,
  copied,
}: TextBlockProps) {
  return (
    <div className="bg-zinc-950 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-white">{label}</p>
        <button
          onClick={() => onCopy(text, id)}
          className="p-1 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} className="text-zinc-400" />
          )}
        </button>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed">{text}</p>
    </div>
  )
}

interface ColorSwatchProps {
  color: string
  label: string
}

function ColorSwatch({ color, label }: ColorSwatchProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-12 h-12 rounded-lg border border-zinc-700"
        style={{ backgroundColor: color }}
      />
      <p className="text-xs text-zinc-400">{label}</p>
      <code className="text-xs text-zinc-500">{color}</code>
    </div>
  )
}
