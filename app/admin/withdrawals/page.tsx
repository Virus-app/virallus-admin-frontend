"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Wallet } from "lucide-react"
import { shortenAddress, shortenHash } from "@/lib/format-utils"

// Mock data for withdrawals
const statsData = [{ label: "Total Withdrawals", value: "3,247", icon: Wallet, color: "text-green-500" }]

const withdrawalsData = [
  {
    id: 1,
    user: "0x1234567890abcdef",
    amount: "$5,250.00",
    txHash: "0xabcd1234ef5678901234567890abcdef12345678",
    date: "2024-01-20",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  {
    id: 2,
    user: "0xabcdef1234567890",
    amount: "$3,100.00",
    txHash: "0x1234abcd5678ef90abcdef1234567890abcdef12",
    date: "2024-01-19",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  {
    id: 3,
    user: "0x5555555555555555",
    amount: "$8,750.00",
    txHash: "0x5678ef901234abcd567890abcdef1234abcdef12",
    date: "2024-01-18",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  {
    id: 4,
    user: "0x2222222222222222",
    amount: "$12,500.00",
    txHash: "0xef9012345678abcd90abcdef1234567890abcdef",
    date: "2024-01-17",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  {
    id: 5,
    user: "0x3333333333333333",
    amount: "$4,200.00",
    txHash: "0x9012abcd3456ef7890abcdef12345678abcdef12",
    date: "2024-01-16",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  {
    id: 6,
    user: "0x4444444444444444",
    amount: "$6,800.00",
    txHash: "0x3456ef7890abcd1234567890abcdef12abcdef12",
    date: "2024-01-15",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  {
    id: 7,
    user: "0x6666666666666666",
    amount: "$2,100.00",
    txHash: "0x7890abcd1234ef5678abcdef90abcdef1234ef12",
    date: "2024-01-14",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  {
    id: 8,
    user: "0x7777777777777777",
    amount: "$9,300.00",
    txHash: "0xabcd1234ef5678901234abcdef567890abcdef12",
    date: "2024-01-13",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  {
    id: 9,
    user: "0x8888888888888888",
    amount: "$7,650.00",
    txHash: "0x1234abcd5678ef90abcd1234567890abcdef1234",
    date: "2024-01-12",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  {
    id: 10,
    user: "0x9999999999999999",
    amount: "$11,200.00",
    txHash: "0xef5678901234abcd5678abcdef1234567890cdef",
    date: "2024-01-11",
    contract: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
]

const ITEMS_PER_PAGE = 5

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default function WithdrawalsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(withdrawalsData.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayedData = withdrawalsData.slice(startIdx, endIdx)

  const totalAmount = withdrawalsData.reduce((sum, item) => {
    const amount = Number.parseFloat(item.amount.replace(/[$,]/g, ""))
    return sum + amount
  }, 0)

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Total Withdrawals Count */}
        <div className="bg-card rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-muted/50">
              <Wallet className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-lg font-semibold text-foreground">{withdrawalsData.length.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">Total Withdrawals</p>
        </div>

        {/* Total Withdrawal Amount */}
        <div className="bg-card rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-muted/50">
              <Wallet className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              ${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">Total Amount</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-card rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Withdrawal Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">User</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">TX Hash</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Contract</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((withdrawal, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors border-b border-border/50">
                  <td className="px-4 py-3 text-foreground text-xs">{shortenAddress(withdrawal.user)}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{withdrawal.amount}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{shortenHash(withdrawal.txHash)}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{formatDate(withdrawal.date)}</td>
                  <td className="px-4 py-3 text-foreground text-xs">{shortenAddress(withdrawal.contract)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {startIdx + 1} to {Math.min(endIdx, withdrawalsData.length)} of {withdrawalsData.length} withdrawals
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
