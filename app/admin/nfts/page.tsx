"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, Package, Sparkles } from "lucide-react"
import { shortenAddress } from "@/lib/format-utils"

// Mock data for NFTs
const statsData = [
  { label: "Total Supply", value: "10,000", icon: Package, color: "text-blue-500" },
  { label: "Minted", value: "7,284", icon: Sparkles, color: "text-green-500" },
]

const nftsTableData = [
  {
    id: "1",
    owner: "0x1234567890abcdef",
    status: "active",
    mintedOn: "2024-01-15",
  },
  {
    id: "2",
    owner: "0xabcdef1234567890",
    status: "inactive",
    mintedOn: "2024-01-14",
  },
  {
    id: "3",
    owner: "0x5555555555555555",
    status: "revoke",
    mintedOn: "2024-01-10",
  },
  {
    id: "4",
    owner: "0x2222222222222222",
    status: "active",
    mintedOn: "2024-01-18",
  },
  {
    id: "5",
    owner: "0x3333333333333333",
    status: "active",
    mintedOn: "2024-01-12",
  },
  {
    id: "6",
    owner: "0x4444444444444444",
    status: "revoke",
    mintedOn: "2024-01-08",
  },
  {
    id: "7",
    owner: "0x6666666666666666",
    status: "inactive",
    mintedOn: "2024-01-20",
  },
  {
    id: "8",
    owner: "0x7777777777777777",
    status: "active",
    mintedOn: "2024-01-14",
  },
  {
    id: "9",
    owner: "0x8888888888888888",
    status: "active",
    mintedOn: "2024-01-16",
  },
  {
    id: "10",
    owner: "0x9999999999999999",
    status: "revoke",
    mintedOn: "2024-01-11",
  },
  {
    id: "11",
    owner: "0xaaaaaaaaaaaaaaaa",
    status: "inactive",
    mintedOn: "2024-01-19",
  },
  {
    id: "12",
    owner: "0xbbbbbbbbbbbbbbbb",
    status: "active",
    mintedOn: "2024-01-17",
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

const formatDate = (date: string | null) => {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default function NFTsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const totalPages = Math.ceil(nftsTableData.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayedData = nftsTableData.slice(startIdx, endIdx)

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
          <h2 className="text-lg font-semibold text-foreground">NFTs List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Token ID</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Owner</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Details</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((nft, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors border-b border-border/50">
                  <td className="px-4 py-3 text-foreground font-medium">{nft.id}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{shortenAddress(nft.owner)}</td>
                  <td className="px-4 py-3">{getStatusBadge(nft.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted"
                      onClick={() => router.push(`/admin/nfts/${nft.id}`)}
                    >
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {startIdx + 1} to {Math.min(endIdx, nftsTableData.length)} of {nftsTableData.length} NFTs
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
