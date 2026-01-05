"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, Target, Zap, DollarSign, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { shortenAddress } from "@/lib/format-utils"

// Mock flashout rounds data
const flashoutRounds = [
  {
    id: 1,
    name: "2025 January",
    status: "finished",
    endDate: new Date("2025-01-31"),
    totalUsersMatched: 1250,
    totalMatchedCycles: 3456,
    totalReward: "$125,400.00",
    data: [
      { user: "0x1234567890abcdef", matchedCycles: 5, firstLeg: 12, secondLeg: 8, reward: "$450.00" },
      { user: "0xabcdef1234567890", matchedCycles: 3, firstLeg: 8, secondLeg: 5, reward: "$280.00" },
      { user: "0x5555555555555555", matchedCycles: 7, firstLeg: 15, secondLeg: 10, reward: "$620.00" },
      { user: "0x2222222222222222", matchedCycles: 4, firstLeg: 10, secondLeg: 6, reward: "$360.00" },
      { user: "0x3333333333333333", matchedCycles: 6, firstLeg: 14, secondLeg: 9, reward: "$540.00" },
      { user: "0x4444444444444444", matchedCycles: 2, firstLeg: 5, secondLeg: 3, reward: "$180.00" },
      { user: "0x6666666666666666", matchedCycles: 8, firstLeg: 18, secondLeg: 12, reward: "$750.00" },
      { user: "0x7777777777777777", matchedCycles: 4, firstLeg: 9, secondLeg: 6, reward: "$370.00" },
      { user: "0x8888888888888888", matchedCycles: 5, firstLeg: 11, secondLeg: 7, reward: "$420.00" },
      { user: "0x9999999999999999", matchedCycles: 3, firstLeg: 7, secondLeg: 4, reward: "$260.00" },
    ],
  },
  {
    id: 2,
    name: "2025 February",
    status: "active",
    endDate: new Date("2025-02-28"),
    totalUsersMatched: 1580,
    totalMatchedCycles: 4122,
    totalReward: "$156,800.00",
    data: [
      { user: "0x1234567890abcdef", matchedCycles: 6, firstLeg: 14, secondLeg: 9, reward: "$520.00" },
      { user: "0xabcdef1234567890", matchedCycles: 4, firstLeg: 10, secondLeg: 6, reward: "$340.00" },
      { user: "0x5555555555555555", matchedCycles: 8, firstLeg: 16, secondLeg: 11, reward: "$680.00" },
      { user: "0x2222222222222222", matchedCycles: 5, firstLeg: 12, secondLeg: 7, reward: "$420.00" },
      { user: "0x3333333333333333", matchedCycles: 7, firstLeg: 15, secondLeg: 10, reward: "$610.00" },
      { user: "0xaaaaaaaaaaaaaaaa", matchedCycles: 3, firstLeg: 8, secondLeg: 5, reward: "$280.00" },
      { user: "0xbbbbbbbbbbbbbbbb", matchedCycles: 9, firstLeg: 20, secondLeg: 13, reward: "$820.00" },
      { user: "0xcccccccccccccccc", matchedCycles: 4, firstLeg: 10, secondLeg: 6, reward: "$370.00" },
      { user: "0xdddddddddddddddd", matchedCycles: 6, firstLeg: 13, secondLeg: 8, reward: "$480.00" },
      { user: "0xeeeeeeeeeeeeeeee", matchedCycles: 2, firstLeg: 5, secondLeg: 3, reward: "$190.00" },
    ],
  },
  {
    id: 3,
    name: "2025 March",
    status: "upcoming",
    endDate: new Date("2025-03-31"),
    totalUsersMatched: 0,
    totalMatchedCycles: 0,
    totalReward: "$0.00",
    data: [],
  },
]

const getStatusBadge = (status: string) => {
  const config = {
    finished: { className: "bg-gray-500/10 text-gray-700 dark:text-gray-400", label: "Finished" },
    active: { className: "bg-green-500/10 text-green-700 dark:text-green-400", label: "Active" },
    upcoming: { className: "bg-blue-500/10 text-blue-700 dark:text-blue-400", label: "Upcoming" },
  }
  const statusConfig = config[status as keyof typeof config] || config.finished
  return <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
}

const CountdownTimer = ({ endDate }: { endDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const diff = endDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("Expired")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft(`${days}d ${hours}h ${minutes}m`)
    }

    calculateTime()
    const interval = setInterval(calculateTime, 60000)
    return () => clearInterval(interval)
  }, [endDate])

  if (!timeLeft) return <span className="text-sm font-mono text-foreground">calculating...</span>

  return <span className="text-sm font-mono text-foreground">{timeLeft}</span>
}

const ITEMS_PER_PAGE = 5

export default function FlashoutRewardsPage() {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const currentRound = flashoutRounds[currentRoundIdx]
  const totalPages = Math.ceil(currentRound.data.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE
  const displayedData = currentRound.data.slice(startIdx, endIdx)

  const handlePrevRound = () => {
    if (currentRoundIdx > 0) {
      setCurrentRoundIdx(currentRoundIdx - 1)
      setCurrentPage(1)
    }
  }

  const handleNextRound = () => {
    if (currentRoundIdx < flashoutRounds.length - 1) {
      setCurrentRoundIdx(currentRoundIdx + 1)
      setCurrentPage(1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Round Selector Section */}
      <div className="bg-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevRound}
              disabled={currentRoundIdx === 0}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="min-w-48">
              <h2 className="text-lg font-semibold text-foreground">{currentRound.name}</h2>
              <div className="mt-1">{getStatusBadge(currentRound.status)}</div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextRound}
              disabled={currentRoundIdx === flashoutRounds.length - 1}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Time left:</span>
            <CountdownTimer endDate={currentRound.endDate} />
          </div>
        </div>

        {/* Stats Grid */}
        {currentRound.status !== "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-lg font-semibold text-foreground">{currentRound.totalUsersMatched}</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Total Users Matched</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-500" />
                <span className="text-lg font-semibold text-foreground">{currentRound.totalMatchedCycles}</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Total Matched Cycles</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-lg font-semibold text-foreground">{currentRound.totalReward}</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Total Flashout Reward</p>
            </div>
          </div>
        )}
      </div>

      {/* Active Round Warning */}
      {currentRound.status === "active" && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Rewards are subject to change until the end of this round.</AlertDescription>
        </Alert>
      )}

      {/* Table Section - Only show for finished and active rounds */}
      {currentRound.status !== "upcoming" && (
        <div className="bg-card rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Participants</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">User</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Matched Cycles</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">First Leg</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Second Leg</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Reward</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((participant, idx) => (
                  <tr key={idx} className="hover:bg-muted/50 transition-colors border-b border-border/50">
                    <td className="px-4 py-3 text-foreground text-xs">{shortenAddress(participant.user)}</td>
                    <td className="px-4 py-3 text-foreground font-medium">{participant.matchedCycles}</td>
                    <td className="px-4 py-3 text-foreground font-medium">{participant.firstLeg}</td>
                    <td className="px-4 py-3 text-foreground font-medium">{participant.secondLeg}</td>
                    <td className="px-4 py-3 text-foreground font-medium">{participant.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {startIdx + 1} to {Math.min(endIdx, currentRound.data.length)} of {currentRound.data.length}{" "}
              participants
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
      )}

      {/* Upcoming Round Message */}
      {currentRound.status === "upcoming" && (
        <div className="bg-card rounded-lg p-8 text-center">
          <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-foreground font-medium">This flashout round hasn't started yet</p>
          <p className="text-muted-foreground text-sm mt-1">Participant data will be available once the round begins</p>
        </div>
      )}
    </div>
  )
}
