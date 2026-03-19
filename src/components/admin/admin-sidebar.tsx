'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  Package,
  Users,
  Lightbulb,
  FileText,
  BarChart3,
  Globe,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.reload()
  }

  const navItems = [
    { label: 'Vue d\'ensemble', href: '/admin', icon: LayoutDashboard },
    { label: 'SaaS', href: '/admin/saas', icon: Package },
    { label: 'Créateurs', href: '/admin/createurs', icon: Users },
    { label: 'Idées', href: '/admin/idees', icon: Lightbulb },
    { label: 'Blog', href: '/admin/blog', icon: FileText },
    { label: 'Métriques', href: '/admin/metriques', icon: BarChart3 },
    { label: 'Contenu', href: '/admin/contenu', icon: Globe },
    { label: 'Paramètres', href: '/admin/parametres', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static top-0 left-0 h-full w-64 z-40 bg-zinc-900 border-r border-zinc-700 p-6 overflow-y-auto flex flex-col transition-transform duration-200`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">etudia.</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                  active
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="pt-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  )
}
