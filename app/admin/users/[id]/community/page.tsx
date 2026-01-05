"use client"

import { Suspense } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Coins, Users, Package } from "lucide-react"

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
]

const communityHierarchy: Record<string, any[]> = {
  "USR-001": [
    {
      id: "USR-050",
      walletAddress: "0x1234567890abcdef",
      nftsOwned: 8,
      communityNfts: 18,
      communityCount: 2,
      createdBy: "self",
    },
    {
      id: "USR-051",
      walletAddress: "0xabcdef1234567890",
      nftsOwned: 12,
      communityNfts: 28,
      communityCount: 3,
      createdBy: "parent",
    },
    {
      id: "USR-052",
      walletAddress: "0x9876543210fedcba",
      nftsOwned: 5,
      communityNfts: 12,
      communityCount: 1,
      createdBy: "self",
    },
  ],
  "USR-002": [
    {
      id: "USR-005",
      walletAddress: "0xabc123...",
      nftsOwned: 12,
      communityNfts: 24,
      communityCount: 4,
      createdBy: "self",
    },
    {
      id: "USR-006",
      walletAddress: "0xdef456...",
      nftsOwned: 6,
      communityNfts: 12,
      communityCount: 2,
      createdBy: "parent",
    },
  ],
  "USR-003": [
    {
      id: "USR-007",
      walletAddress: "0xghi789...",
      nftsOwned: 9,
      communityNfts: 18,
      communityCount: 3,
      createdBy: "self",
    },
  ],
  "USR-004": [],
  "USR-005": [
    {
      id: "USR-008",
      walletAddress: "0xjkl012...",
      nftsOwned: 4,
      communityNfts: 8,
      communityCount: 1,
      createdBy: "self",
    },
    {
      id: "USR-009",
      walletAddress: "0xmno345...",
      nftsOwned: 7,
      communityNfts: 14,
      communityCount: 2,
      createdBy: "parent",
    },
  ],
  "USR-050": [
    {
      id: "USR-100",
      walletAddress: "0x1111111111111111",
      nftsOwned: 6,
      communityNfts: 12,
      communityCount: 2,
      createdBy: "self",
    },
    {
      id: "USR-101",
      walletAddress: "0x2222222222222222",
      nftsOwned: 4,
      communityNfts: 8,
      communityCount: 1,
      createdBy: "parent",
    },
  ],
  "USR-051": [
    {
      id: "USR-102",
      walletAddress: "0x3333333333333333",
      nftsOwned: 3,
      communityNfts: 6,
      communityCount: 1,
      createdBy: "self",
    },
  ],
  "USR-052": [],
  "USR-008": [],
  "USR-009": [],
}

function CommunityContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = params.id as string
  const [communityPage, setCommunityPage] = useState(1)

  const breadcrumbPath = searchParams.get("path")?.split("/").filter(Boolean) || []
  const originalUserId = breadcrumbPath.length > 0 ? breadcrumbPath[0].split("/")[0] : userId

  useEffect(() => {
    setCommunityPage(1)
  }, [userId])

  const communityMembers = communityHierarchy[userId] || []

  console.log("[v0] Current userId:", userId, "Community members count:", communityMembers.length)

  const itemsPerPage = 5
  const membersPaginated = communityMembers.slice((communityPage - 1) * itemsPerPage, communityPage * itemsPerPage)
  const communityPages = Math.ceil(communityMembers.length / itemsPerPage)

  const handleBack = () => {
    router.push(`/admin/users/USR-001`)
  }

  const navigateToCommunity = (memberId: string, memberWallet: string) => {
    const newPath = breadcrumbPath.length === 0 ? `${memberWallet}` : `${breadcrumbPath.join("/")}/${memberWallet}`
    router.push(`/admin/users/${memberId}/community?path=${encodeURIComponent(newPath)}`)
  }

  const renderBreadcrumb = () => {
    const breadcrumbItems = breadcrumbPath.length > 0 ? breadcrumbPath.join("/").split("/") : []

    const navigateToBreadcrumbIndex = (index: number) => {
      if (index === 0) {
        router.push(`/admin/users/USR-001/community`)
      } else {
        const newPath = breadcrumbItems.slice(0, index).join("/")
        router.push(`/admin/users/USR-001/community?path=${encodeURIComponent(newPath)}`)
      }
    }

    return (
      <div className="flex items-center gap-1 mb-4 text-sm flex-wrap">
        <button
          onClick={() => navigateToBreadcrumbIndex(0)}
          className="text-primary hover:underline cursor-pointer transition-all hover:opacity-80"
        >
          Direct
        </button>
        {breadcrumbItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className="text-muted-foreground">/</span>
            <button
              onClick={() => navigateToBreadcrumbIndex(idx + 1)}
              className="text-primary hover:underline cursor-pointer transition-all hover:opacity-80"
            >
              {item.length > 15 ? `${item.slice(0, 6)}...${item.slice(-6)}` : item}
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {renderBreadcrumb()}

      {communityMembers.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {membersPaginated.map((member) => (
              <div
                key={member.id}
                onClick={() => navigateToCommunity(member.id, member.walletAddress)}
                className={`rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  member.createdBy === "parent"
                    ? "border-2 border-orange-500/50 bg-orange-500/5"
                    : "border border-border bg-card"
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-mono text-foreground">{member.walletAddress}</p>
                  </div>

                  <div className="border-t border-border" />

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-blue-500" />
                        <span className="text-muted-foreground">NFTs</span>
                      </div>
                      <span className="font-semibold text-foreground">{member.nftsOwned}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="text-muted-foreground">Community</span>
                      </div>
                      <span className="font-semibold text-foreground">{member.communityCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-green-500" />
                        <span className="text-muted-foreground">Comm NFTs</span>
                      </div>
                      <span className="font-semibold text-foreground">{member.communityNfts}</span>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Created By:{" "}
                      <span className="text-foreground font-medium">
                        {member.createdBy === "self" ? "Self" : member.walletAddress}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {communityPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Page {communityPage} of {communityPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={communityPage === 1}
                  onClick={() => setCommunityPage(communityPage - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: communityPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === communityPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCommunityPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={communityPage === communityPages}
                  onClick={() => setCommunityPage(communityPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">No community members found</p>
        </div>
      )}
    </div>
  )
}

export default function CommunityPage() {
  return (
    <Suspense fallback={null}>
      <CommunityContent />
    </Suspense>
  )
}
