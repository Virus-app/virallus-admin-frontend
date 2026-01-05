"use client"

import { Users, Package, Sparkles, Send, DollarSign, Zap, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  const platformMetrics = [
    { label: "Total Users", value: "8,450", icon: Users, color: "text-blue-500", path: "/admin/users" },
    { label: "Total Supply", value: "10,000", icon: Package, color: "text-purple-500", path: "/admin/nfts" },
    { label: "NFTs Minted", value: "7,284", icon: Sparkles, color: "text-green-500", path: "/admin/mints" },
    { label: "Total Transfers", value: "3,126", icon: Send, color: "text-orange-500", path: "/admin/transfers" },
    { label: "Total Withdrawn", value: "$42,580", icon: DollarSign, color: "text-red-500", path: "/admin/withdrawals" },
    {
      label: "Active Flashout",
      value: "Feb 2025",
      icon: Zap,
      color: "text-yellow-500",
      path: "/admin/rewards/flashout",
    },
  ]

  const revenueMetrics = [
    { label: "Direct Rewards Distributed", value: "$125,450", change: "+8.2%", path: "/admin/rewards/direct" },
    { label: "Flashout Income", value: "$87,320", change: "+12.5%", path: "/admin/rewards/flashout" },
    { label: "Total Revenue", value: "$212,770", change: "+10.1%", path: "/admin/transfers" },
  ]

  const nftMetrics = [
    { label: "Total Supply", value: "10,000", subtitle: "Max capacity" },
    { label: "Minted", value: "7,284", subtitle: "72.8% of supply" },
    { label: "Active NFTs", value: "6,892", subtitle: "Revoked: 156" },
    { label: "Avg Transfers", value: "2.4x", subtitle: "Per NFT" },
  ]

  const communityMetrics = [
    { label: "Total Community", value: "2,340", subtitle: "Direct members" },
    { label: "Flashout Participants", value: "1,580", subtitle: "Active in cycle" },
    { label: "Community Growth", value: "+5.1%", subtitle: "This month" },
    { label: "Avg Leg Members", value: "12.4", subtitle: "Per user" },
  ]

  const activityData = [
    { label: "Last 24h Mints", value: "428", trend: "↑ 12%" },
    { label: "Last 24h Transfers", value: "156", trend: "↓ 3%" },
    { label: "New Users Today", value: "42", trend: "↑ 8%" },
    { label: "Pending Withdrawals", value: "8", trend: "→ 0%" },
  ]

  return (
    <div className="space-y-6">
      {/* Platform Overview */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
          {platformMetrics.map((metric, idx) => {
            const IconComponent = metric.icon
            return (
              <button
                key={idx}
                onClick={() => router.push(metric.path)}
                className="bg-card rounded-lg p-3 hover:bg-muted/50 transition-colors text-left group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors">
                    <IconComponent className={`w-4 h-4 ${metric.color}`} />
                  </div>
                  <span className="text-lg font-semibold text-foreground group-hover:text-blue-500 transition-colors">
                    {metric.value}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Revenue & Rewards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Revenue & Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {revenueMetrics.map((metric, idx) => (
            <button
              key={idx}
              onClick={() => router.push(metric.path)}
              className="bg-card rounded-lg p-4 border border-border/50 hover:border-border transition-colors text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold">{metric.change}</span>
              </div>
              <p className="text-xl font-semibold text-foreground group-hover:text-blue-500 transition-colors">
                {metric.value}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* NFT Metrics */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">NFT Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {nftMetrics.map((metric, idx) => (
            <div key={idx} className="bg-card rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground font-medium mb-2">{metric.label}</p>
              <p className="text-2xl font-semibold text-foreground mb-1">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community & Flashout */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Community & Flashout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {communityMetrics.map((metric, idx) => (
            <div key={idx} className="bg-card rounded-lg p-4 border border-border/50">
              <p className="text-xs text-muted-foreground font-medium mb-2">{metric.label}</p>
              <p className="text-2xl font-semibold text-foreground mb-1">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            onClick={() => router.push("/admin/users")}
            variant="outline"
            className="justify-start h-auto py-4 px-4 flex-col items-start"
          >
            <span className="text-sm font-medium">Manage Users</span>
            <span className="text-xs text-muted-foreground mt-1">View and manage platform users</span>
          </Button>
          <Button
            onClick={() => router.push("/admin/nfts")}
            variant="outline"
            className="justify-start h-auto py-4 px-4 flex-col items-start"
          >
            <span className="text-sm font-medium">NFTs Collection</span>
            <span className="text-xs text-muted-foreground mt-1">Browse all NFTs and status</span>
          </Button>
          <Button
            onClick={() => router.push("/admin/rewards/direct")}
            variant="outline"
            className="justify-start h-auto py-4 px-4 flex-col items-start"
          >
            <span className="text-sm font-medium">Direct Rewards</span>
            <span className="text-xs text-muted-foreground mt-1">Track direct sales rewards</span>
          </Button>
          <Button
            onClick={() => router.push("/admin/community")}
            variant="outline"
            className="justify-start h-auto py-4 px-4 flex-col items-start"
          >
            <span className="text-sm font-medium">Community</span>
            <span className="text-xs text-muted-foreground mt-1">Explore community hierarchy</span>
          </Button>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-card rounded-lg p-6 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-foreground">Activity Summary</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activityData.map((activity, idx) => (
            <div key={idx} className="border-l-2 border-blue-500 pl-4">
              <p className="text-xs text-muted-foreground font-medium mb-1">{activity.label}</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold text-foreground">{activity.value}</p>
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold">{activity.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
