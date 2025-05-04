"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Package, MessageSquare, Settings, LogOut, Menu, X, Mail } from "lucide-react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface SidebarItem {
  title: string
  icon: React.ElementType
  href: string
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Análisis",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    title: "Productos",
    icon: Package,
    href: "/dashboard/productos",
  },
  {
    title: "Chat IA",
    icon: MessageSquare,
    href: "/dashboard/chat-ia",
  },
  {
    title: "Configuración",
    icon: Settings,
    href: "/dashboard/configuracion",
  },
  {
    title: "Contacto",
    icon: Mail,
    href: "/dashboard/contacto",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(!isMobile)

  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <>
      {isMobile && (
        <div className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between bg-lunexa-navy px-4 shadow-md">
          <Logo size="sm" />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-10 flex w-64 flex-col bg-lunexa-navy transition-transform duration-300 ease-in-out",
          isMobile ? "pt-16" : "",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0",
        )}
      >
        {!isMobile && (
          <div className="flex h-16 items-center px-6">
            <Logo />
          </div>
        )}

        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-lunexa-blue text-white" : "text-gray-300 hover:bg-lunexa-blue/10 hover:text-white",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-lunexa-dark/60 px-3 py-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-lunexa-danger/10 hover:text-lunexa-danger"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  )
}
