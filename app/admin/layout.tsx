import type React from "react"
import type { Metadata } from "next"
import AdminLayoutClient from "./_layout-client"

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Dashboard",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
