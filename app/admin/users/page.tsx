"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, Users, UserCheck, UserX } from "lucide-react"

// Mock data - expanded
const statsData = [
  { label: "Registered Users", value: "2,543", icon: Users },
  { label: "Active Users", value: "1,834", icon: UserCheck },
  { label: "Suspend Users", value: "156", icon: UserX },
]

const usersTableData = [
  {
    id: "USR-001",
    nfts: 12,
    totalCommunity: 3,
    communityNfts: 24,
    registeredAt: "2024-01-15",
    activatedAt: "2024-01-16",
    status: "active",
  },
  {
    id: "USR-002",
    nfts: 0,
    totalCommunity: null,
    communityNfts: null,
    registeredAt: "2024-01-20",
    activatedAt: null,
    status: "inactive",
  },
  {
    id: "USR-003",
    nfts: 8,
    totalCommunity: 2,
    communityNfts: 16,
    registeredAt: "2024-01-10",
    activatedAt: "2024-01-12",
    status: "active",
  },
  {
    id: "USR-004",
    nfts: 5,
    totalCommunity: null,
    communityNfts: null,
    registeredAt: "2024-01-05",
    activatedAt: "2024-01-07",
    status: "suspend",
  },
  {
    id: "USR-005",
    nfts: 20,
    totalCommunity: 5,
    communityNfts: 42,
    registeredAt: "2023-12-20",
    activatedAt: "2023-12-21",
    status: "active",
  },
  {
    id: "USR-006",
    nfts: 3,
    totalCommunity: null,
    communityNfts: null,
    registeredAt: "2024-01-25",
    activatedAt: null,
    status: "inactive",
  },
  {
    id: "USR-007",
    nfts: 15,
    totalCommunity: 4,
    communityNfts: 38,
    registeredAt: "2024-01-08",
    activatedAt: "2024-01-09",
    status: "active",
  },
  {
    id: "USR-008",
    nfts: 7,
    totalCommunity: null,
    communityNfts: null,
    registeredAt: "2024-01-18",
    activatedAt: "2024-01-19",
    status: "suspend",
  },
  {
    id: "USR-009",
    nfts: 22,
    totalCommunity: 6,
    communityNfts: 55,
    registeredAt: "2023-12-15",
    activatedAt: "2023-12-16",
    status: "active",
  },
  {
    id: "USR-010",
    nfts: 11,
    totalCommunity: 3,
    communityNfts: 29,
    registeredAt: "2024-01-12",
    activatedAt: "2024-01-13",
    status: "active",
  },
  {
    id: "USR-011",
    nfts: 1,
    totalCommunity: null,
    communityNfts: null,
    registeredAt: "2024-01-22",
    activatedAt: null,
    status: "inactive",
  },
  {
    id: "USR-012",
    nfts: 9,
    totalCommunity: 2,
    communityNfts: 18,
    registeredAt: "2024-01-11",
    activatedAt: "2024-01-14",
    status: "active",
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
    suspend: {
      className: "bg-red-500/10 text-red-700 dark:text-red-400",
      label: "Suspend",
    },
  }
  const config = statusConfig[status as keyof typeof statusConfig]
  return <Badge className={config.className}>{config.label}</Badge>
}

const formatDate = (date: string | null) => {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const totalPages = Math.ceil(usersTableData.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayedData = usersTableData.slice(startIdx, endIdx)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {statsData.map((stat, idx) => {
          const IconComponent = stat.icon
          return (
            <div key={idx} className="bg-card rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-md">
                  <IconComponent className="w-4 h-4 text-foreground" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-card rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Users List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">User ID</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">NFTs</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Total Community</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Community NFTs</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">Details</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((user, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors border-b border-border/50">
                  <td className="px-4 py-3 text-foreground font-medium">{user.id}</td>
                  <td className="px-4 py-3 text-foreground">{user.nfts}</td>
                  <td className="px-4 py-3 text-foreground">
                    {user.status === "inactive" ? "—" : user.totalCommunity}
                  </td>
                  <td className="px-4 py-3 text-foreground">{user.status === "inactive" ? "—" : user.communityNfts}</td>
                  <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted"
                      onClick={() => router.push(`/admin/users/${user.id}`)}
                    >
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {startIdx + 1} to {Math.min(endIdx, usersTableData.length)} of {usersTableData.length} users
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
