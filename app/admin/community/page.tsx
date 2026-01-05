"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Coins, Users, Package } from "lucide-react"
import { shortenAddress } from "@/lib/format-utils"

const communityHierarchy: Record<string, any[]> = {
  ROOT: [
    {
      id: "USR-001",
      walletAddress: "0x1234567890abcdef",
      nftsOwned: 12,
      communityNfts: 24,
      communityCount: 3,
      createdBy: "self",
    },
    {
      id: "USR-002",
      walletAddress: "0xabcdef1234567890",
      nftsOwned: 8,
      communityNfts: 18,
      communityCount: 2,
      createdBy: "self",
    },
    {
      id: "USR-003",
      walletAddress: "0x9876543210fedcba",
      nftsOwned: 5,
      communityNfts: 12,
      communityCount: 1,
      createdBy: "parent",
    },
  ],
  "0x1234567890abcdef": [
    {
      id: "USR-050",
      walletAddress: "0xaaaa1111bbbb2222",
      nftsOwned: 6,
      communityNfts: 12,
      communityCount: 2,
      createdBy: "self",
    },
    {
      id: "USR-051",
      walletAddress: "0xcccc3333dddd4444",
      nftsOwned: 4,
      communityNfts: 8,
      communityCount: 1,
      createdBy: "parent",
    },
  ],
  "0xabcdef1234567890": [
    {
      id: "USR-100",
      walletAddress: "0x1111111111111111",
      nftsOwned: 9,
      communityNfts: 18,
      communityCount: 3,
      createdBy: "self",
    },
  ],
  "0x9876543210fedcba": [],
  "0xaaaa1111bbbb2222": [
    {
      id: "USR-102",
      walletAddress: "0x5555555555555555",
      nftsOwned: 3,
      communityNfts: 6,
      communityCount: 1,
      createdBy: "self",
    },
  ],
  "0xcccc3333dddd4444": [],
  "0x1111111111111111": [],
}

export default function AdminCommunityPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [communityPage, setCommunityPage] = useState(1)

  const pathParam = searchParams.get("path")
  const breadcrumbPath = pathParam ? pathParam.split("/").filter(Boolean) : []
  const currentNodeId = breadcrumbPath.length > 0 ? breadcrumbPath[breadcrumbPath.length - 1] : "ROOT"

  useEffect(() => {
    setCommunityPage(1)
  }, [currentNodeId])

  const communityMembers = communityHierarchy[currentNodeId] || []

  const getTotalDirectLegs = () => {
    return communityHierarchy.ROOT?.length || 0
  }

  const getTotalCommunity = () => {
    return communityMembers.reduce((sum, member) => sum + member.communityCount, 0)
  }

  const itemsPerPage = 5
  const membersPaginated = communityMembers.slice((communityPage - 1) * itemsPerPage, communityPage * itemsPerPage)
  const communityPages = Math.ceil(communityMembers.length / itemsPerPage)

  const navigateToCommunity = (memberWallet: string) => {
    const newPath = breadcrumbPath.length === 0 ? memberWallet : `${breadcrumbPath.join("/")}/${memberWallet}`
    router.push(`/admin/community?path=${encodeURIComponent(newPath)}`)
  }

  const renderBreadcrumb = () => {
    const navigateToBreadcrumbIndex = (index: number) => {
      if (index === 0) {
        router.push(`/admin/community`)
      } else {
        const newPath = breadcrumbPath.slice(0, index).join("/")
        router.push(`/admin/community?path=${encodeURIComponent(newPath)}`)
      }
    }

    return (
      <div className="flex items-center gap-1 mb-4 text-sm flex-wrap">
        <button
          onClick={() => navigateToBreadcrumbIndex(0)}
          className="text-primary hover:underline cursor-pointer transition-all hover:opacity-80"
        >
          Root
        </button>
        {breadcrumbPath.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className="text-muted-foreground">/</span>
            <button
              onClick={() => navigateToBreadcrumbIndex(idx + 1)}
              className="text-primary hover:underline cursor-pointer transition-all hover:opacity-80"
            >
              {shortenAddress(item)}
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {renderBreadcrumb()}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="bg-card rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-muted/50">
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-lg font-semibold text-foreground">{getTotalDirectLegs()}</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">Total Direct Legs</p>
        </div>
        <div className="bg-card rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-muted/50">
              <Package className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-lg font-semibold text-foreground">{getTotalCommunity()}</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">Total Community</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Community Legs</h2>

        {communityMembers.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {membersPaginated.map((member) => (
                <div
                  key={member.id}
                  onClick={() => navigateToCommunity(member.walletAddress)}
                  className={`rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    member.createdBy === "parent"
                      ? "border-2 border-orange-500/50 bg-orange-500/5"
                      : "border border-border bg-card"
                  }`}
                >
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-foreground">{shortenAddress(member.walletAddress)}</p>
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
    </div>
  )
}
