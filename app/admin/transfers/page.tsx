"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Send, BarChart3 } from "lucide-react"
import { shortenAddress, shortenHash } from "@/lib/format-utils"

// Mock data for transfers
const statsData = [
  { label: "Total Transfers", value: "1,234", icon: Send, color: "text-blue-500" },
  { label: "Total NFTs Transferred", value: "3,847", icon: BarChart3, color: "text-purple-500" },
]

const transfersTableData = [
  {
    id: "1",
    tokenId: "1",
    from: "0x1234567890abcdef",
    to: "0xabcdef1234567890",
    txHash: "0x5a8c9e1b2f3d4e5c",
    prevStatus: "active",
    currentStatus: "revoke",
    date: "2024-01-20",
  },
  {
    id: "2",
    tokenId: "2",
    from: "0xabcdef1234567890",
    to: "0x5555555555555555",
    txHash: "0x6b9d0f2c3g4e5f6d",
    prevStatus: "active",
    currentStatus: "active",
    date: "2024-01-19",
  },
  {
    id: "3",
    tokenId: "3",
    from: "0x5555555555555555",
    to: "0x2222222222222222",
    txHash: "0x7c0e1g3d4h5f6g7e",
    prevStatus: "revoke",
    currentStatus: "revoke",
    date: "2024-01-18",
  },
  {
    id: "4",
    tokenId: "4",
    from: "0x2222222222222222",
    to: "0x3333333333333333",
    txHash: "0x8d1f2h4e5i6g7h8f",
    prevStatus: "inactive",
    currentStatus: "inactive",
    date: "2024-01-17",
  },
  {
    id: "5",
    tokenId: "5",
    from: "0x3333333333333333",
    to: "0x4444444444444444",
    txHash: "0x9e2g3i5f6j7h8i9g",
    prevStatus: "active",
    currentStatus: "revoke",
    date: "2024-01-16",
  },
  {
    id: "6",
    tokenId: "6",
    from: "0x4444444444444444",
    to: "0x6666666666666666",
    txHash: "0x0f3h4j6g7k8i9j0h",
    prevStatus: "inactive",
    currentStatus: "inactive",
    date: "2024-01-15",
  },
  {
    id: "7",
    tokenId: "7",
    from: "0x6666666666666666",
    to: "0x7777777777777777",
    txHash: "0x1g4i5k7h8l9j0k1i",
    prevStatus: "active",
    currentStatus: "active",
    date: "2024-01-14",
  },
  {
    id: "8",
    tokenId: "8",
    from: "0x7777777777777777",
    to: "0x8888888888888888",
    txHash: "0x2h5j6l8i9m0k1l2j",
    prevStatus: "revoke",
    currentStatus: "revoke",
    date: "2024-01-13",
  },
  {
    id: "9",
    tokenId: "9",
    from: "0x8888888888888888",
    to: "0x9999999999999999",
    txHash: "0x3i6k7m9j0n1l2m3k",
    prevStatus: "active",
    currentStatus: "revoke",
    date: "2024-01-12",
  },
  {
    id: "10",
    tokenId: "10",
    from: "0x9999999999999999",
    to: "0xaaaaaaaaaaaaaaaa",
    txHash: "0x4j7l8n0k1o2m3n4l",
    prevStatus: "inactive",
    currentStatus: "inactive",
    date: "2024-01-11",
  },
  {
    id: "11",
    tokenId: "11",
    from: "0xaaaaaaaaaaaaaaaa",
    to: "0xbbbbbbbbbbbbbbbb",
    txHash: "0x5k8m9o1l2p3n4o5m",
    prevStatus: "active",
    currentStatus: "active",
    date: "2024-01-10",
  },
  {
    id: "12",
    tokenId: "12",
    from: "0xbbbbbbbbbbbbbbbb",
    to: "0xcccccccccccccccc",
    txHash: "0x6l9n0p2m3q4o5p6n",
    prevStatus: "revoke",
    currentStatus: "revoke",
    date: "2024-01-09",
  },
]

const ITEMS_PER_PAGE = 5

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: {
      className: "bg-green-500/10 text-green-700 dark:text-green-400",
      label: "Active",
    },
    inactive: {
      className: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
      label: "Inactive",
    },
    revoke: {
      className: "bg-red-500/10 text-red-700 dark:text-red-400",
      label: "Revoke",
    },
  }
  const config = statusConfig[status as keyof typeof statusConfig]
  return <Badge className={config.className}>{config.label}</Badge>
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default function TransfersPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(transfersTableData.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayedData = transfersTableData.slice(startIdx, endIdx)

  return (
    <div className="space-y-6">
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

      <div className="bg-card rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Transfers List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Token ID</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">From</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">To</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Tx Hash</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Prev Status</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Current Status</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((transfer, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors border-b border-border/50">
                  <td className="px-4 py-3 text-foreground font-medium">{transfer.tokenId}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{shortenAddress(transfer.from)}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{shortenAddress(transfer.to)}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{shortenHash(transfer.txHash)}</td>
                  <td className="px-4 py-3">{getStatusBadge(transfer.prevStatus)}</td>
                  <td className="px-4 py-3">{getStatusBadge(transfer.currentStatus)}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{formatDate(transfer.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {startIdx + 1} to {Math.min(endIdx, transfersTableData.length)} of {transfersTableData.length}{" "}
            transfers
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
    </div>
  )
}
