"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Zap, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { shortenAddress, shortenHash } from "@/lib/format-utils"

// Mock data for mints
const statsData = [{ label: "Total Mints", value: "8,942", icon: Zap, color: "text-blue-500" }]

const mintsData = [
  {
    id: 1,
    user: "0x1234567890abcdef",
    mintCount: 5,
    txHash: "0xabcd1234ef5678901234567890abcdef12345678",
    date: "2024-01-20",
    price: "$50.00",
    totalAmount: "$250.00",
    tokenIds: ["1", "2", "3", "4", "5"],
  },
  {
    id: 2,
    user: "0xabcdef1234567890",
    mintCount: 3,
    txHash: "0x1234abcd5678ef90abcdef1234567890abcdef12",
    date: "2024-01-19",
    price: "$50.00",
    totalAmount: "$150.00",
    tokenIds: ["6", "7", "8"],
  },
  {
    id: 3,
    user: "0x5555555555555555",
    mintCount: 2,
    txHash: "0x5678ef901234abcd567890abcdef1234abcdef12",
    date: "2024-01-18",
    price: "$50.00",
    totalAmount: "$100.00",
    tokenIds: ["9", "10"],
  },
  {
    id: 4,
    user: "0x2222222222222222",
    mintCount: 8,
    txHash: "0xef9012345678abcd90abcdef1234567890abcdef",
    date: "2024-01-17",
    price: "$50.00",
    totalAmount: "$400.00",
    tokenIds: ["11", "12", "13", "14", "15", "16", "17", "18"],
  },
  {
    id: 5,
    user: "0x3333333333333333",
    mintCount: 4,
    txHash: "0x9012abcd3456ef7890abcdef12345678abcdef12",
    date: "2024-01-16",
    price: "$50.00",
    totalAmount: "$200.00",
    tokenIds: ["19", "20", "21", "22"],
  },
  {
    id: 6,
    user: "0x4444444444444444",
    mintCount: 6,
    txHash: "0x3456ef7890abcd1234567890abcdef12abcdef12",
    date: "2024-01-15",
    price: "$50.00",
    totalAmount: "$300.00",
    tokenIds: ["23", "24", "25", "26", "27", "28"],
  },
  {
    id: 7,
    user: "0x6666666666666666",
    mintCount: 1,
    txHash: "0x7890abcd1234ef5678abcdef90abcdef1234ef12",
    date: "2024-01-14",
    price: "$50.00",
    totalAmount: "$50.00",
    tokenIds: ["29"],
  },
  {
    id: 8,
    user: "0x7777777777777777",
    mintCount: 7,
    txHash: "0xabcd1234ef5678901234abcdef567890abcdef12",
    date: "2024-01-13",
    price: "$50.00",
    totalAmount: "$350.00",
    tokenIds: ["30", "31", "32", "33", "34", "35", "36"],
  },
  {
    id: 9,
    user: "0x8888888888888888",
    mintCount: 2,
    txHash: "0x1234abcd5678ef90abcd1234567890abcdef1234",
    date: "2024-01-12",
    price: "$50.00",
    totalAmount: "$100.00",
    tokenIds: ["37", "38"],
  },
  {
    id: 10,
    user: "0x9999999999999999",
    mintCount: 5,
    txHash: "0xef5678901234abcd5678abcdef1234567890cdef",
    date: "2024-01-11",
    price: "$50.00",
    totalAmount: "$250.00",
    tokenIds: ["39", "40", "41", "42", "43"],
  },
]

const ITEMS_PER_PAGE = 5

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default function MintsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMint, setSelectedMint] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalPages = Math.ceil(mintsData.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayedData = mintsData.slice(startIdx, endIdx)

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
          <h2 className="text-lg font-semibold text-foreground">Mint Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">User</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Count</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">TX Hash</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Token IDs</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((mint, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors border-b border-border/50">
                  <td className="px-4 py-3 text-foreground text-xs">{shortenAddress(mint.user)}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{mint.mintCount}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{shortenHash(mint.txHash)}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{formatDate(mint.date)}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{mint.price}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{mint.totalAmount}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedMint(mint)
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
            Showing {startIdx + 1} to {Math.min(endIdx, mintsData.length)} of {mintsData.length} mints
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

      {/* Token IDs Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Token IDs</DialogTitle>
          </DialogHeader>
          {selectedMint && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">User</p>
                <p className="text-sm text-foreground">{shortenAddress(selectedMint.user)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Token IDs ({selectedMint.tokenIds.length})</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMint.tokenIds.map((tokenId, idx) => (
                    <Badge key={idx} variant="outline">
                      {tokenId}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
