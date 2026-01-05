"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Wallet,
  Users,
  Coins,
  Gift,
  TrendingUp,
  Zap,
  Award,
} from "lucide-react"

// Mock data - same as in users page
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
  {
    id: "USR-100",
    nfts: 6,
    totalCommunity: 2,
    communityNfts: 12,
    registeredAt: "2024-01-10",
    activatedAt: "2024-01-11",
    status: "active",
  },
  {
    id: "USR-101",
    nfts: 4,
    totalCommunity: 1,
    communityNfts: 8,
    registeredAt: "2024-01-12",
    activatedAt: "2024-01-13",
    status: "active",
  },
  {
    id: "USR-102",
    nfts: 3,
    totalCommunity: 1,
    communityNfts: 6,
    registeredAt: "2024-01-14",
    activatedAt: "2024-01-15",
    status: "active",
  },
]

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
    revoke: {
      className: "bg-red-500/10 text-red-700 dark:text-red-400",
      label: "Revoke",
    },
  }
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
  return <Badge className={config.className}>{config.label}</Badge>
}

const formatDate = (date: string | null) => {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

// Mock data for all 5 new tables
const nftsTableData = [
  { tokenId: "NFT-001", origin: "mint", status: "active" },
  { tokenId: "NFT-002", origin: "ownermint", status: "active" },
  { tokenId: "NFT-003", origin: "transfer", status: "revoke" },
  { tokenId: "NFT-004", origin: "mint", status: "active" },
  { tokenId: "NFT-005", origin: "transfer", status: "inactive" },
  { tokenId: "NFT-006", origin: "mint", status: "active" },
  { tokenId: "NFT-007", origin: "ownermint", status: "revoke" },
  { tokenId: "NFT-008", origin: "transfer", status: "active" },
  { tokenId: "NFT-009", origin: "mint", status: "inactive" },
  { tokenId: "NFT-010", origin: "mint", status: "active" },
  { tokenId: "NFT-011", origin: "transfer", status: "active" },
  { tokenId: "NFT-012", origin: "ownermint", status: "revoke" },
]

const mintsTableData = [
  { id: 1, count: 5, mintPrice: "100", txHash: "0x1a2b3c4d5e6f7g8h9i", date: "2024-01-15" },
  { id: 2, count: 3, mintPrice: "100", txHash: "0x9i8h7g6f5e4d3c2b1a", date: "2024-01-18" },
  { id: 3, count: 4, mintPrice: "100", txHash: "0x5e6f7g8h9i1a2b3c4d", date: "2024-01-20" },
]

const transferTableData = [
  { tokenId: "NFT-001", from: "Me", to: "0x123...", prevStatus: "active", nextStatus: "active", date: "2024-01-17" },
  { tokenId: "NFT-002", from: "Me", to: "0x456...", prevStatus: "active", nextStatus: "revoke", date: "2024-01-19" },
  { tokenId: "NFT-003", from: "Me", to: "0x789...", prevStatus: "inactive", nextStatus: "active", date: "2024-01-21" },
  { tokenId: "NFT-004", from: "Me", to: "0xabc...", prevStatus: "active", nextStatus: "active", date: "2024-01-22" },
  { tokenId: "NFT-005", from: "Me", to: "0xdef...", prevStatus: "revoke", nextStatus: "active", date: "2024-01-23" },
]

const rewardsTableData = [
  { amount: "250.50", origin: "direct", date: "2024-01-15" },
  { amount: "500.00", origin: "flashout", date: "2024-01-17" },
  { amount: "150.75", origin: "direct", date: "2024-01-20" },
  { amount: "300.25", origin: "flashout", date: "2024-01-22" },
]

const withdrawTableData = [
  { amount: "1000.00", date: "2024-01-16" },
  { amount: "500.50", date: "2024-01-18" },
  { amount: "750.00", date: "2024-01-21" },
]

const getOriginBadge = (origin: string) => {
  const originConfig = {
    mint: { className: "bg-blue-500/10 text-blue-700 dark:text-blue-400", label: "Mint" },
    ownermint: { className: "bg-purple-500/10 text-purple-700 dark:text-purple-400", label: "OwnerMint" },
    transfer: { className: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400", label: "Transfer" },
    direct: { className: "bg-green-500/10 text-green-700 dark:text-green-400", label: "Direct" },
    flashout: { className: "bg-orange-500/10 text-orange-700 dark:text-orange-400", label: "Flashout" },
  }
  const config = originConfig[origin as keyof typeof originConfig]
  return <Badge className={config.className}>{config.label}</Badge>
}

const PaginationControls = ({ currentPage, totalPages, onPageChange }: any) => {
  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

const communityMembers = [
  {
    id: "USR-050",
    walletAddress: "0x1234567890abcdef",
    nftsOwned: 8,
    communityNfts: 18,
    communityCount: 2,
    creator: "self",
  },
  {
    id: "USR-051",
    walletAddress: "0xabcdef1234567890",
    nftsOwned: 12,
    communityNfts: 28,
    communityCount: 3,
    creator: "parent",
  },
  {
    id: "USR-052",
    walletAddress: "0x9876543210fedcba",
    nftsOwned: 5,
    communityNfts: 12,
    communityCount: 1,
    creator: "self",
  },
]

const legsPerformanceData = [
  { legMembers: 24, nftsCount: 48, rank: 1 },
  { legMembers: 18, nftsCount: 42, rank: 2 },
  { legMembers: 15, nftsCount: 30, rank: 3 },
  { legMembers: 12, nftsCount: 24, rank: 4 },
]

const estimatedCycles = 3
const estimatedReward = estimatedCycles * 20

export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params?.id as string | undefined

  const [nftPage, setNftPage] = useState(1)
  const [mintsPage, setMintsPage] = useState(1)
  const [transfersPage, setTransfersPage] = useState(1)
  const [rewardsPage, setRewardsPage] = useState(1)
  const [withdrawPage, setWithdrawPage] = useState(1)
  const [communityPage, setCommunityPage] = useState(1)

  if (!userId) {
    return <div className="text-center py-8">Loading...</div>
  }

  const user = usersTableData.find((u) => u.id === userId)

  if (!user) {
    return (
      <div className="space-y-4">
        <Button variant="outline" size="sm" onClick={() => router.push("/admin/users")} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="text-center py-8">
          <p className="text-foreground font-semibold">User not found</p>
        </div>
      </div>
    )
  }

  const itemsPerPage = 5
  const nftsPaginated = nftsTableData.slice((nftPage - 1) * itemsPerPage, nftPage * itemsPerPage)
  const mintsPaginated = mintsTableData.slice((mintsPage - 1) * itemsPerPage, mintsPage * itemsPerPage)
  const transferPaginated = transferTableData.slice((transfersPage - 1) * itemsPerPage, transfersPage * itemsPerPage)
  const rewardsPaginated = rewardsTableData.slice((rewardsPage - 1) * itemsPerPage, rewardsPage * itemsPerPage)
  const withdrawPaginated = withdrawTableData.slice((withdrawPage - 1) * itemsPerPage, withdrawPage * itemsPerPage)
  const communityPaginated = communityMembers.slice((communityPage - 1) * itemsPerPage, communityPage * itemsPerPage)

  const nftsPages = Math.ceil(nftsTableData.length / itemsPerPage)
  const mintsPages = Math.ceil(mintsTableData.length / itemsPerPage)
  const transferPages = Math.ceil(transferTableData.length / itemsPerPage)
  const rewardsPages = Math.ceil(rewardsTableData.length / itemsPerPage)
  const withdrawPages = Math.ceil(withdrawTableData.length / itemsPerPage)
  const communityPages = Math.ceil(communityMembers.length / itemsPerPage)

  const directReward = Math.floor(Math.random() * 1000) + 100

  const activeNFTs = Math.floor(user.nfts * 0.7)
  const revokeNFTs = Math.floor(user.nfts * 0.15)
  const inactiveNFTs = user.nfts - activeNFTs - revokeNFTs

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.push("/admin/users")} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* General Details, Rewards, and NFTs Section */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">User ID</p>
            <p className="text-foreground font-medium">{user.id}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Wallet className="w-3 h-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">Wallet Address</p>
            </div>
            <p className="text-xs font-mono text-foreground">0x1234567890abcdef</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Account Status</p>
            <div className="flex items-center gap-2">{getStatusBadge(user.status)}</div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Total NFTs</p>
            <p className="text-foreground font-medium">{user.nfts}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Registered At</p>
            <p className="text-foreground font-medium">{formatDate(user.registeredAt)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Activated At</p>
            <p className="text-foreground font-medium">
              {user.status === "inactive" ? "—" : formatDate(user.activatedAt)}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="h-px bg-border/50"></div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Total Community</p>
            <p className="text-foreground font-medium">{user.status === "inactive" ? "—" : user.totalCommunity}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Community NFTs</p>
            <p className="text-foreground font-medium">{user.status === "inactive" ? "—" : user.communityNfts}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Indirect Members</p>
            <p className="text-foreground font-medium">{user.status === "inactive" ? "—" : 24}</p>
          </div>

          <div className="md:col-span-3">
            <div className="h-px bg-border/50"></div>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm text-muted-foreground font-medium mb-3">Rewards</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-lg p-2 flex items-center justify-center h-10 w-10">
                  <Gift className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ready to Withdraw</p>
                  <p className="text-foreground font-medium">$125.50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-lg p-2 flex items-center justify-center h-10 w-10">
                  <TrendingUp className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Flashout Income</p>
                  <p className="text-foreground font-medium">$342.75</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-lg p-2 flex items-center justify-center h-10 w-10">
                  <Zap className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Direct Sales Rewards</p>
                  <p className="text-foreground font-medium">${directReward.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="h-px bg-border/50"></div>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm text-muted-foreground font-medium mb-3">NFT Status</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-foreground font-medium">{activeNFTs}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Revoke</p>
                  <p className="text-foreground font-medium">{revokeNFTs}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">In-Active</p>
                  <p className="text-foreground font-medium">{inactiveNFTs}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-muted/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Community</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/admin/users/${userId}/community`)}
            className="gap-2"
          >
            See Community
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {communityMembers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communityPaginated.map((member) => (
              <div
                key={member.id}
                className={`rounded-lg p-4 ${
                  member.creator === "parent"
                    ? "border-2 border-orange-500/50 bg-orange-500/5"
                    : "border border-border bg-card"
                }`}
              >
                <div className="space-y-3">
                  <div className="pb-3 border-b border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                    <p className="text-xs font-mono text-foreground">{member.walletAddress}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-blue-500" />
                        <p className="text-xs text-muted-foreground">NFTs</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{member.nftsOwned}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <p className="text-xs text-muted-foreground">Community</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{member.communityCount}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-cyan-500" />
                        <p className="text-xs text-muted-foreground">Comm NFTs</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{member.communityNfts}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">Created By</p>
                    <p className="text-xs font-mono text-foreground">
                      {member.creator === "self" ? "Self" : member.walletAddress}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination for Community */}
        {communityPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCommunityPage((p) => Math.max(1, p - 1))}
              disabled={communityPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {communityPage} of {communityPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCommunityPage((p) => Math.min(communityPages, p + 1))}
              disabled={communityPage === communityPages}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Flashout Section */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Flashout</h2>

        {/* Legs Performance - Combined Cards */}
        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-3">Legs Performance</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {legsPerformanceData.map((leg, idx) => {
              const isTopLeg = idx < 2
              return (
                <div
                  key={idx}
                  className={`bg-card rounded-lg p-3 ${isTopLeg ? "border-2 border-orange-500" : "border border-border"}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-muted">
                        <Users className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Leg Members</p>
                        <p className="text-lg font-semibold text-foreground">{leg.legMembers}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-muted">
                        <Coins className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">NFTs in Leg</p>
                        <p className="text-lg font-semibold text-foreground">{leg.nftsCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Estimated Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-card rounded-lg p-3 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-muted">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Estimated Cycles</p>
                <p className="text-lg font-semibold text-foreground">{estimatedCycles} Cycles</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-3 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-muted">
                <Award className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Estimated Reward</p>
                <p className="text-lg font-semibold text-foreground">${estimatedReward.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NFTs Table */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">NFTs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Token ID</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Origin</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {nftsPaginated.map((item, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4 text-foreground">{item.tokenId}</td>
                  <td className="py-3 px-4">{getOriginBadge(item.origin)}</td>
                  <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls currentPage={nftPage} totalPages={nftsPages} onPageChange={setNftPage} />
      </div>

      {/* Mints Table */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Mints</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Count</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Mint Price</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Tx Hash</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {mintsPaginated.map((item, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4 text-foreground">{item.count}</td>
                  <td className="py-3 px-4 text-foreground">${item.mintPrice}</td>
                  <td className="py-3 px-4 text-foreground font-mono text-xs">{item.txHash}</td>
                  <td className="py-3 px-4 text-foreground">{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls currentPage={mintsPage} totalPages={mintsPages} onPageChange={setMintsPage} />
      </div>

      {/* Transfer Table */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Transfers</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Token ID</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">From</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">To</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Prev Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Next Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {transferPaginated.map((item, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4 text-foreground">{item.tokenId}</td>
                  <td className="py-3 px-4 text-foreground">{item.from}</td>
                  <td className="py-3 px-4 text-foreground font-mono text-xs">{item.to}</td>
                  <td className="py-3 px-4">{getStatusBadge(item.prevStatus)}</td>
                  <td className="py-3 px-4">{getStatusBadge(item.nextStatus)}</td>
                  <td className="py-3 px-4 text-foreground">{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls currentPage={transfersPage} totalPages={transferPages} onPageChange={setTransfersPage} />
      </div>

      {/* Rewards Table */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Rewards</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Origin</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {rewardsPaginated.map((item, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4 text-foreground font-medium">${item.amount}</td>
                  <td className="py-3 px-4">{getOriginBadge(item.origin)}</td>
                  <td className="py-3 px-4 text-foreground">{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls currentPage={rewardsPage} totalPages={rewardsPages} onPageChange={setRewardsPage} />
      </div>

      {/* Withdraw Table */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Withdrawals</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {withdrawPaginated.map((item, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4 text-foreground font-medium">${item.amount}</td>
                  <td className="py-3 px-4 text-foreground">{formatDate(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls currentPage={withdrawPage} totalPages={withdrawPages} onPageChange={setWithdrawPage} />
      </div>
    </div>
  )
}
