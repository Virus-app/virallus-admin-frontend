"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Minus, Wallet, DollarSign, Gift, Calendar, ChevronLeft, ChevronRight, Check } from "lucide-react"

// Mock data
const ownerMintHistory = [
  { id: 1, count: 100, txHash: "0x1234...5678", date: "2024-01-20", totalPrice: "$0.00" },
  { id: 2, count: 50, txHash: "0x5678...9012", date: "2024-01-15", totalPrice: "$0.00" },
]

const priceHistory = [
  { id: 1, oldPrice: "$200", newPrice: "$250", date: "2024-01-18", changedBy: "Admin" },
  { id: 2, oldPrice: "$180", newPrice: "$200", date: "2024-01-10", changedBy: "Admin" },
  { id: 3, oldPrice: "$150", newPrice: "$180", date: "2024-01-05", changedBy: "Admin" },
]

const rewardsHistory = [
  { id: 1, type: "direct", oldValue: "$50", newValue: "$75", date: "2024-01-19", changedBy: "Admin" },
  { id: 2, type: "flashout", oldValue: "$100", newValue: "$125", date: "2024-01-15", changedBy: "Admin" },
  { id: 3, type: "direct", oldValue: "$40", newValue: "$50", date: "2024-01-10", changedBy: "Admin" },
]

const eventHistory = [
  {
    id: 1,
    name: "New Year Sale",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    cap: 5000,
    discount: 20,
    status: "on-event",
    sold: 2660,
    price: 200,
  },
  {
    id: 2,
    name: "Holiday Promo",
    startDate: "2023-12-01",
    endDate: "2023-12-25",
    cap: 3000,
    discount: 15,
    status: "finished",
    sold: 3000,
    price: 180,
  },
  { id: 3, name: "Token Range 1-100 Idle", startDate: "-", endDate: "-", cap: "-", discount: "-", status: "idle" },
]

const ITEMS_PER_PAGE = 2

const mintSuccessDetails = {
  count: 100,
  tokenIds: "1001-1100",
  minterAddress: "0x1234567890abcdef1234567890abcdef12345678",
  txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  date: "2024-01-20",
}

export default function OwnerOperationsPage() {
  const router = useRouter()

  // Owner Mint State
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("0x1234567890abcdef")
  const [mintCount, setMintCount] = useState(1)
  const [showMintSuccessModal, setShowMintSuccessModal] = useState(false)

  // NFT Price State
  const [currentPrice, setCurrentPrice] = useState("$250.00")
  const [newPrice, setNewPrice] = useState("")
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
  const [priceHistoryPage, setPriceHistoryPage] = useState(1)

  // Rewards State
  const [directReward, setDirectReward] = useState("$75.00")
  const [flashoutReward, setFlashoutReward] = useState("$125.00")
  const [newDirectReward, setNewDirectReward] = useState("")
  const [newFlashoutReward, setNewFlashoutReward] = useState("")
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false)
  const [rewardsHistoryPage, setRewardsHistoryPage] = useState(1)

  // Event State
  const [eventStatus, setEventStatus] = useState("idle")
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [eventForm, setEventForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    cap: "",
    discount: "",
  })
  const [eventHistoryPage, setEventHistoryPage] = useState(1)

  // Helper functions
  const handleMint = () => {
    setShowMintSuccessModal(true)
  }

  const handlePriceUpdate = () => {
    if (newPrice) {
      setCurrentPrice(`$${newPrice}`)
      setNewPrice("")
      setIsPriceModalOpen(false)
    }
  }

  const handleRewardsUpdate = () => {
    if (newDirectReward) setDirectReward(`$${newDirectReward}`)
    if (newFlashoutReward) setFlashoutReward(`$${newFlashoutReward}`)
    setNewDirectReward("")
    setNewFlashoutReward("")
    setIsRewardsModalOpen(false)
  }

  const handleEventCreate = () => {
    if (eventForm.name && eventForm.startDate && eventForm.endDate) {
      setEventStatus("on-event")
      setEventForm({ name: "", startDate: "", endDate: "", cap: "", discount: "" })
      setIsEventModalOpen(false)
    }
  }

  // Pagination helpers
  const getPriceHistoryPageData = () => {
    const start = (priceHistoryPage - 1) * ITEMS_PER_PAGE
    return priceHistory.slice(start, start + ITEMS_PER_PAGE)
  }

  const getRewardsHistoryPageData = () => {
    const start = (rewardsHistoryPage - 1) * ITEMS_PER_PAGE
    return rewardsHistory.slice(start, start + ITEMS_PER_PAGE)
  }

  const getEventHistoryPageData = () => {
    const start = (eventHistoryPage - 1) * ITEMS_PER_PAGE
    return eventHistory.slice(start, start + ITEMS_PER_PAGE)
  }

  return (
    <div className="space-y-6">
      {/* Section 1: Owner Mint */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Owner Mint
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Wallet Status</p>
              <p className="text-sm font-medium text-foreground">
                {isWalletConnected
                  ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                  : "Not Connected"}
              </p>
            </div>
            <Button
              onClick={() => setIsWalletConnected(!isWalletConnected)}
              variant={isWalletConnected ? "outline" : "default"}
              size="sm"
            >
              {isWalletConnected ? "Disconnect" : "Connect"} Wallet
            </Button>
          </div>

          {isWalletConnected && (
            <>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-3">Mint Count</p>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setMintCount(Math.max(1, mintCount - 1))}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-semibold text-foreground w-8 text-center">{mintCount}</span>
                  <Button
                    onClick={() => setMintCount(mintCount + 1)}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-4">Total Price: $0.00 (Owner Mint)</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <Button onClick={handleMint} className="w-full">
                  Mint Now
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Section 2: NFTs Price */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              NFTs Price
            </span>
            <Button onClick={() => setIsPriceModalOpen(true)} size="sm">
              Edit Price
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Current Price</p>
            <p className="text-3xl font-bold text-foreground">{currentPrice}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Price History</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-semibold text-muted-foreground py-2">Previous Price</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground py-2">Current Price</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {priceHistory
                    .slice((priceHistoryPage - 1) * ITEMS_PER_PAGE, priceHistoryPage * ITEMS_PER_PAGE)
                    .map((price) => (
                      <tr key={price.id} className="border-b border-border hover:bg-muted/30">
                        <td className="text-sm text-foreground py-3">{price.oldPrice}</td>
                        <td className="text-sm text-foreground py-3">{price.newPrice}</td>
                        <td className="text-sm text-foreground py-3">{price.date}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {priceHistory.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPriceHistoryPage((p) => Math.max(1, p - 1))}
                  disabled={priceHistoryPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-xs text-muted-foreground">{priceHistoryPage}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPriceHistoryPage((p) => p + 1)}
                  disabled={priceHistoryPage * ITEMS_PER_PAGE >= priceHistory.length}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Rewards
            </span>
            <Button onClick={() => setIsRewardsModalOpen(true)} size="sm">
              Edit Rewards
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Direct Reward</p>
              <p className="text-2xl font-bold text-foreground">{directReward}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Flashout Reward</p>
              <p className="text-2xl font-bold text-foreground">{flashoutReward}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Rewards History</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Mode</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Previous Price</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Current Price</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rewardsHistory
                    .slice((rewardsHistoryPage - 1) * ITEMS_PER_PAGE, rewardsHistoryPage * ITEMS_PER_PAGE)
                    .map((reward) => (
                      <tr key={reward.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-3 px-3">
                          <Badge variant="outline" className="text-xs">
                            {reward.type === "direct" ? "Direct" : "Flashout"}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-foreground">{reward.oldValue}</td>
                        <td className="py-3 px-3 text-foreground">{reward.newValue}</td>
                        <td className="py-3 px-3 text-foreground text-xs">{reward.date}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {rewardsHistory.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRewardsHistoryPage((p) => Math.max(1, p - 1))}
                  disabled={rewardsHistoryPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-xs text-muted-foreground">{rewardsHistoryPage}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRewardsHistoryPage((p) => p + 1)}
                  disabled={rewardsHistoryPage * ITEMS_PER_PAGE >= rewardsHistory.length}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Sales Events
            </span>
            <Button onClick={() => setIsEventModalOpen(true)} size="sm" disabled={eventStatus === "on-event"}>
              {eventStatus === "on-event" ? "Event Active" : "Create Event"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Status</p>
              <p className="text-lg font-semibold text-foreground capitalize">{eventStatus.replace("-", " ")}</p>
            </div>
            <Badge variant={eventStatus === "on-event" ? "default" : "outline"} className="capitalize">
              {eventStatus.replace("-", " ").toUpperCase()}
            </Badge>
          </div>

          {eventStatus === "on-event" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-card border border-border">
                <p className="text-xs text-muted-foreground">From Date</p>
                <p className="text-sm font-semibold text-foreground">2025-01-20</p>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <p className="text-xs text-muted-foreground">To Date</p>
                <p className="text-sm font-semibold text-foreground">2025-02-20</p>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <p className="text-xs text-muted-foreground">Cap</p>
                <p className="text-sm font-semibold text-foreground">5000 NFTs</p>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <p className="text-xs text-muted-foreground">Cap Left</p>
                <p className="text-sm font-semibold text-foreground">2340 NFTs</p>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border md:col-span-4">
                <p className="text-xs text-muted-foreground">Discount</p>
                <p className="text-sm font-semibold text-foreground">20%</p>
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Event History</p>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Condition</th>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Sold</th>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {eventHistory
                    .slice((eventHistoryPage - 1) * ITEMS_PER_PAGE, eventHistoryPage * ITEMS_PER_PAGE)
                    .map((event) => (
                      <tr key={event.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2">
                          <Badge
                            variant={event.status === "on-event" ? "default" : "outline"}
                            className={`capitalize ${event.status === "on-event" ? "bg-green-600 text-white" : ""}`}
                          >
                            {event.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-foreground">{event.sold || "-"}</td>
                        <td className="px-4 py-2 text-foreground">${event.price || "-"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {eventHistory.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEventHistoryPage((p) => Math.max(1, p - 1))}
                  disabled={eventHistoryPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {eventHistoryPage} of {Math.ceil(eventHistory.length / ITEMS_PER_PAGE)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setEventHistoryPage((p) => Math.min(Math.ceil(eventHistory.length / ITEMS_PER_PAGE), p + 1))
                  }
                  disabled={eventHistoryPage >= Math.ceil(eventHistory.length / ITEMS_PER_PAGE)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Price Edit Modal */}
      <Dialog open={isPriceModalOpen} onOpenChange={setIsPriceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Price</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-price">New Price (USD)</Label>
              <Input
                id="new-price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="250.00"
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handlePriceUpdate} className="flex-1">
                Update Price
              </Button>
              <Button variant="outline" onClick={() => setIsPriceModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rewards Edit Modal */}
      <Dialog open={isRewardsModalOpen} onOpenChange={setIsRewardsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Rewards</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="direct-reward">Direct Reward (USD)</Label>
              <Input
                id="direct-reward"
                value={newDirectReward}
                onChange={(e) => setNewDirectReward(e.target.value)}
                placeholder="75.00"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="flashout-reward">Flashout Reward (USD)</Label>
              <Input
                id="flashout-reward"
                value={newFlashoutReward}
                onChange={(e) => setNewFlashoutReward(e.target.value)}
                placeholder="125.00"
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRewardsUpdate} className="flex-1">
                Update Rewards
              </Button>
              <Button variant="outline" onClick={() => setIsRewardsModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Create Modal */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Sales Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                value={eventForm.name}
                onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                placeholder="Spring Sale"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={eventForm.startDate}
                  onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={eventForm.endDate}
                  onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cap">NFT Cap</Label>
                <Input
                  id="cap"
                  type="number"
                  value={eventForm.cap}
                  onChange={(e) => setEventForm({ ...eventForm, cap: e.target.value })}
                  placeholder="5000"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={eventForm.discount}
                  onChange={(e) => setEventForm({ ...eventForm, discount: e.target.value })}
                  placeholder="20"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleEventCreate} className="flex-1">
                Create Event
              </Button>
              <Button variant="outline" onClick={() => setIsEventModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mint Success Modal */}
      <Dialog open={showMintSuccessModal} onOpenChange={setShowMintSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Mint Successful
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Count</p>
                <p className="text-lg font-bold text-foreground">{mintSuccessDetails.count}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Token IDs</p>
                <p className="text-sm font-mono text-foreground break-all">{mintSuccessDetails.tokenIds}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Minter Address</p>
                <p className="text-sm font-mono text-foreground break-all">{mintSuccessDetails.minterAddress}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                <p className="text-sm font-mono text-foreground break-all">{mintSuccessDetails.txHash}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Date</p>
                <p className="text-sm text-foreground">{mintSuccessDetails.date}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setShowMintSuccessModal(false)} variant="outline" className="flex-1">
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowMintSuccessModal(false)
                  router.push("/admin/mints")
                }}
                className="flex-1"
              >
                View History
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
