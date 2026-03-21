"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { signOut } from "next-auth/react"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import {
  Home,
  Link2,
  DollarSign,
  Image,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "@/i18n/routing"

const navItems = [
  { id: "overview", icon: Home, href: "/partenaire/dashboard" },
  { id: "links", icon: Link2, href: "/partenaire/liens" },
  { id: "revenue", icon: DollarSign, href: "/partenaire/revenus" },
  { id: "assets", icon: Image, href: "/partenaire/assets" },
  { id: "profile", icon: User, href: "/partenaire/profil" },
]

export function PartnerSidebar() {
  const t = useTranslations("partner.sidebar")
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut({ redirectTo: "/fr/partenaire/connexion" })
  }

  const isActive = (href: string) => pathname.includes(href.split("/").pop() || "")

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-6 py-8 border-b border-zinc-700">
        <h1 className="text-2xl font-bold text-indigo-400">Etudia</h1>
        <p className="text-xs text-zinc-400 mt-1">Ambassadeur</p>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link key={item.id} href={item.href}>
              <motion.button
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  active
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">
                  {t(item.id as keyof typeof navItems[0])}
                </span>
              </motion.button>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-6 border-t border-zinc-700">
        <Button
          variant="ghost"
          size="md"
          onClick={handleLogout}
          icon={<LogOut size={18} />}
          className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
        >
          {t("logout")}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:flex md:flex-col bg-zinc-900 border-r border-zinc-800 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
      >
        {isMobileOpen ? (
          <X size={24} className="text-zinc-400" />
        ) : (
          <Menu size={24} className="text-zinc-400" />
        )}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", damping: 20 }}
              className="md:hidden fixed left-0 top-0 h-screen w-64 flex flex-col bg-zinc-900 border-r border-zinc-800 z-40"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
