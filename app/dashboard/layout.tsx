"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Sidebar } from "@/components/sidebar"
import { Logo } from "@/components/logo"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-lunexa-dark">
      <Sidebar />
      <div className="flex min-h-screen flex-col pl-0 md:pl-64">
        <header className="sticky top-0 z-10 hidden h-16 items-center justify-end border-b border-lunexa-navy/60 bg-lunexa-dark/80 px-6 backdrop-blur md:flex">
          <Logo size="sm" />
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
