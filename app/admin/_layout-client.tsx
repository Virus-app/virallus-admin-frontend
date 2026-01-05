"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  ImageIcon,
  Zap,
  GitBranch,
  Users2,
  Gift,
  ChevronDown,
  UserCog,
  LogOut,
} from "lucide-react"

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/nfts", label: "NFTs", icon: ImageIcon },
  { href: "/admin/mints", label: "Mints", icon: Zap },
  { href: "/admin/transfers", label: "Transfers", icon: GitBranch },
  { href: "/admin/withdrawals", label: "Withdrawals", icon: Users2 },
  { href: "/admin/community", label: "Community", icon: Users2 },
  { href: "/admin/owner-operations", label: "Owner Operations", icon: UserCog },
]

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isRewardsOpen, setIsRewardsOpen] = useState(pathname.startsWith("/admin/rewards"))
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    const email = localStorage.getItem("userEmail")

    if (!authToken) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      setUserEmail(email || "")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-6 border-b border-sidebar-border h-14 flex items-center">
          <h1 className="text-xl font-bold text-sidebar-foreground">Admin Panel</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="gap-1">
            {menuItems.slice(0, 5).map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className={pathname === item.href ? "bg-sidebar-accent" : ""}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem>
              <button
                onClick={() => setIsRewardsOpen(!isRewardsOpen)}
                className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-colors ${
                  pathname.startsWith("/admin/rewards")
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "hover:bg-sidebar-accent text-sidebar-foreground"
                }`}
              >
                <Gift className="w-5 h-5" />
                <span className="flex-1 text-left">Rewards</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isRewardsOpen ? "rotate-180" : ""}`} />
              </button>
              {isRewardsOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/admin/rewards/direct"
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        pathname === "/admin/rewards/direct"
                          ? "bg-sidebar-accent text-sidebar-foreground"
                          : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                      }`}
                    >
                      Direct
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/rewards/flashout"
                      className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                        pathname === "/admin/rewards/flashout"
                          ? "bg-sidebar-accent text-sidebar-foreground"
                          : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                      }`}
                    >
                      Flashout
                    </Link>
                  </li>
                </ul>
              )}
            </SidebarMenuItem>

            {menuItems.slice(5).map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className={pathname === item.href ? "bg-sidebar-accent" : ""}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 h-14 border-b border-border bg-card flex items-center px-6 gap-4">
          <SidebarTrigger />
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
