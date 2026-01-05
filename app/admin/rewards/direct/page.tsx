"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, DollarSign, Users, Gift, Zap, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { shortenAddress } from "@/lib/format-utils"

// Mock data for direct rewards
const statsData = [
  { label: "Total Direct Sales", value: "2,450", icon: DollarSign, color: "text-blue-500" },
  { label: "Total Direct Sales Reward", value: "$125,500", icon: Gift, color: "text-green-500" },
  { label: "Total Parent Code Sales", value: "1,830", icon: Users, color: "text-purple-500" },
  { label: "Total Parent Code Reward", value: "$98,200", icon: Zap, color: "text-orange-500" },
]

const directRewardsData = [
  {
    id: 1,
    tokenId: "1",
    activatedBy: "0x1234567890abcdef",
    referrer: "0xabcdef1234567890",
    referrerType: "direct",
    mintOrigin: "mint",
    receivedVia: "self",
    amount: "$250.00",
    date: "2024-01-15",
  },
  {
    id: 2,
    tokenId: "2",
    activatedBy: "0xabcdef1234567890",
    referrer: "0x5555555555555555",
    referrerType: "parent code",
    mintOrigin: "owner mint",
    receivedVia: "transfer",
    amount: "$0.00",
    date: "2024-01-14",
  },
  {
    id: 3,
    tokenId: "3",
    activatedBy: "0x5555555555555555",
    referrer: "0x2222222222222222",
    referrerType: "direct",
    mintOrigin: "mint",
    receivedVia: "transfer",
    amount: "$180.50",
    date: "2024-01-10",
  },
  {
    id: 4,
    tokenId: "4",
    activatedBy: "0x2222222222222222",
    referrer: "0x3333333333333333",
    referrerType: "parent code",
    mintOrigin: "mint",
    receivedVia: "self",
    amount: "$320.00",
    date: "2024-01-18",
  },
  {
    id: 5,
    tokenId: "5",
    activatedBy: "0x3333333333333333",
    referrer: "0x4444444444444444",
    referrerType: "direct",
    mintOrigin: "owner mint",
    receivedVia: "transfer",
    amount: "$0.00",
    date: "2024-01-12",
  },
  {
    id: 6,
    tokenId: "6",
    activatedBy: "0x4444444444444444",
    referrer: "0x6666666666666666",
    referrerType: "parent code",
    mintOrigin: "mint",
    receivedVia: "transfer",
    amount: "$275.75",
    date: "2024-01-08",
  },
  {
    id: 7,
    tokenId: "7",
    activatedBy: "0x6666666666666666",
    referrer: "0x7777777777777777",
    referrerType: "direct",
    mintOrigin: "mint",
    receivedVia: "self",
    amount: "$150.00",
    date: "2024-01-20",
  },
  {
    id: 8,
    tokenId: "8",
    activatedBy: "0x7777777777777777",
    referrer: "0x8888888888888888",
    referrerType: "parent code",
    mintOrigin: "owner mint",
    receivedVia: "transfer",
    amount: "$0.00",
    date: "2024-01-14",
  },
  {
    id: 9,
    tokenId: "9",
    activatedBy: "0x8888888888888888",
    referrer: "0x9999999999999999",
    referrerType: "direct",
    mintOrigin: "mint",
    receivedVia: "transfer",
    amount: "$420.25",
    date: "2024-01-16",
  },
  {
    id: 10,
    tokenId: "10",
    activatedBy: "0x9999999999999999",
    referrer: "0xaaaaaaaaaaaaaaaa",
    referrerType: "parent code",
    mintOrigin: "mint",
    receivedVia: "self",
    amount: "$290.00",
    date: "2024-01-11",
  },
]

const ITEMS_PER_PAGE = 5

const getReferrerTypeBadge = (type: string) => {
  const config = {
    direct: {
      className: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      label: "Direct",
    },
    "parent code": {
      className: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      label: "Parent Code",
    },
  }
  const typeConfig = config[type as keyof typeof config] || config.direct
  return <Badge className={typeConfig.className}>{typeConfig.label}</Badge>
}

const getMintOriginBadge = (origin: string) => {
  const config = {
    mint: {
      className: "bg-green-500/10 text-green-700 dark:text-green-400",
      label: "Mint",
    },
    "owner mint": {
      className: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
      label: "Owner Mint",
    },
  }
  const originConfig = config[origin as keyof typeof config] || config.mint
  return <Badge className={originConfig.className}>{originConfig.label}</Badge>
}

const getReceivedViaBadge = (via: string) => {
  const config = {
    self: {
      className: "bg-green-500/10 text-green-700 dark:text-green-400",
      label: "Self",
    },
    transfer: {
      className: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
      label: "Transfer",
    },
  }
  const viaConfig = config[via as keyof typeof config] || config.self
  return <Badge className={viaConfig.className}>{viaConfig.label}</Badge>
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default function DirectRewardsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedReward, setSelectedReward] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalPages = Math.ceil(directRewardsData.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayedData = directRewardsData.slice(startIdx, endIdx)

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {statsData.map((stat, idx) => {
          const IconComponent = stat.icon
          return (
            <div key={idx} className="bg-card rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-muted/50">
                  <IconComponent className={`w-4 h-4 ${stat.color}`} />
                </div>
                <span className="text-lg font-semibold text-foreground">{stat.value}</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Table Section */}
      <div className="bg-card rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Direct Rewards Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Token ID</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Activated By</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Referrer</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Details</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((reward, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors border-b border-border/50">
                  <td className="px-4 py-3 text-foreground font-medium">{reward.tokenId}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{shortenAddress(reward.activatedBy)}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{shortenAddress(reward.referrer)}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{reward.amount}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{formatDate(reward.date)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedReward(reward)
                        setIsModalOpen(true)
                      }}
                      className="text-primary hover:opacity-80 transition-opacity"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {startIdx + 1} to {Math.min(endIdx, directRewardsData.length)} of {directRewardsData.length} rewards
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reward Details</DialogTitle>
          </DialogHeader>
          {selectedReward && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Token ID</p>
                <p className="text-sm font-medium text-foreground">{selectedReward.tokenId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Activated By</p>
                <p className="text-sm text-foreground">{selectedReward.activatedBy}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Referrer</p>
                <p className="text-sm text-foreground">{selectedReward.referrer}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Referrer Type</p>
                <div className="mt-1">{getReferrerTypeBadge(selectedReward.referrerType)}</div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mint Origin</p>
                <div className="mt-1">{getMintOriginBadge(selectedReward.mintOrigin)}</div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Received Via</p>
                <div className="mt-1">{getReceivedViaBadge(selectedReward.receivedVia)}</div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="text-sm font-medium text-foreground">{selectedReward.amount}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm text-foreground">{formatDate(selectedReward.date)}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
