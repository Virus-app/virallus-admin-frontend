"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowDownUp, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock NFT details with timeline
const nftDetails: Record<string, any> = {
  "1": {
    id: "1",
    owner: "0x1234567890abcdef",
    mintedBy: "Owner",
    status: "active",
    timesTransferred: 2,
    activatedOn: "2024-01-15",
    mintedOn: "2024-01-15",
    timeline: [
      { type: "minted", date: "2024-01-15", actor: "Owner", description: "NFT Minted" },
      {
        type: "transfer",
        date: "2024-01-16",
        from: "Owner",
        to: "0xabcd1234",
        description: "Transferred to 0xabcd1234",
      },
      {
        type: "transfer",
        date: "2024-01-17",
        from: "0xabcd1234",
        to: "0x1234567890abcdef",
        description: "Transferred to 0x1234567890abcdef",
      },
    ],
  },
  "2": {
    id: "2",
    owner: "0xabcdef1234567890",
    mintedBy: "0x9999999999999999",
    status: "inactive",
    timesTransferred: 0,
    activatedOn: null,
    mintedOn: "2024-01-14",
    timeline: [{ type: "minted", date: "2024-01-14", actor: "0x9999999999999999", description: "NFT Minted" }],
  },
  "3": {
    id: "3",
    owner: "0x5555555555555555",
    mintedBy: "Owner",
    status: "revoke",
    timesTransferred: 3,
    activatedOn: "2024-01-10",
    mintedOn: "2024-01-10",
    timeline: [
      { type: "minted", date: "2024-01-10", actor: "Owner", description: "NFT Minted" },
      {
        type: "transfer",
        date: "2024-01-11",
        from: "Owner",
        to: "0x2222222222222222",
        description: "Transferred to 0x2222222222222222",
      },
      {
        type: "transfer",
        date: "2024-01-12",
        from: "0x2222222222222222",
        to: "0x3333333333333333",
        description: "Transferred to 0x3333333333333333",
      },
      {
        type: "transfer",
        date: "2024-01-13",
        from: "0x3333333333333333",
        to: "0x5555555555555555",
        description: "Transferred to 0x5555555555555555",
      },
      { type: "revoked", date: "2024-01-18", actor: "Owner", description: "NFT Revoked" },
    ],
  },
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: { className: "bg-green-500/10 text-green-700 dark:text-green-400", label: "Active" },
    inactive: { className: "bg-gray-500/10 text-gray-700 dark:text-gray-400", label: "Inactive" },
    revoke: { className: "bg-red-500/10 text-red-700 dark:text-red-400", label: "Revoke" },
  }
  const config = statusConfig[status as keyof typeof statusConfig]
  return <Badge className={config.className}>{config.label}</Badge>
}

const shortenAddress = (address: string) => {
  if (address === "Owner") return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export default function NFTDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const nft = nftDetails[params.id]

  if (!nft) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/nfts")} className="h-8 px-3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to NFTs
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">NFT not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => router.push("/admin/nfts")} className="h-8 px-3">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to NFTs
      </Button>

      {/* Stats Section */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">NFT Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Token ID</p>
            <p className="text-foreground font-medium">{nft.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Owner</p>
            <p className="text-foreground font-mono text-xs">{shortenAddress(nft.owner)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Status</p>
            {getStatusBadge(nft.status)}
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">Minted By</p>
            <p className="text-foreground font-mono text-xs">{shortenAddress(nft.mintedBy)}</p>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">Minted On</p>
            <p className="text-foreground font-medium">{formatDate(nft.mintedOn)}</p>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">Times Transferred</p>
            <p className="text-foreground font-medium">{nft.timesTransferred}</p>
          </div>

          {nft.status !== "inactive" && (
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-2">Activated On</p>
              <p className="text-foreground font-medium">{formatDate(nft.activatedOn)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">NFT Timeline</h2>
        <div className="space-y-4">
          {nft.timeline.map((event: any, idx: number) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    event.type === "minted"
                      ? "bg-blue-500/10"
                      : event.type === "transfer"
                        ? "bg-purple-500/10"
                        : "bg-red-500/10"
                  }`}
                >
                  {event.type === "minted" ? (
                    <Plus className={`w-5 h-5 ${event.type === "minted" ? "text-blue-600 dark:text-blue-400" : ""}`} />
                  ) : event.type === "revoked" ? (
                    <ArrowLeft className="w-5 h-5 text-red-600 dark:text-red-400" />
                  ) : (
                    <ArrowDownUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                {idx < nft.timeline.length - 1 && <div className="w-0.5 h-12 bg-border my-2" />}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-foreground">{event.description}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                </div>
                {event.type === "transfer" && (
                  <p className="text-sm text-muted-foreground">
                    From <span className="font-mono text-xs">{shortenAddress(event.from)}</span> to{" "}
                    <span className="font-mono text-xs">{shortenAddress(event.to)}</span>
                  </p>
                )}
                {(event.type === "minted" || event.type === "revoked") && (
                  <p className="text-sm text-muted-foreground">
                    By <span className="font-mono text-xs">{shortenAddress(event.actor)}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
