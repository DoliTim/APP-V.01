import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FrequencyWheel } from "./frequency-wheel"
import { FrequencyList } from "./frequency-list"
import { useState } from "react"

export function FrequencyLibrary() {
  const [viewMode, setViewMode] = useState<"wheel" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Sacred Frequency Library</CardTitle>
          <CardDescription>
            Explore and learn about healing frequencies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1 max-w-sm">
              <Input
                placeholder="Search frequencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="solfeggio">Solfeggio Frequencies</SelectItem>
                  <SelectItem value="brainwave">Brainwave Frequencies</SelectItem>
                  <SelectItem value="tesla">Tesla 3-6-9 Frequencies</SelectItem>
                  <SelectItem value="angel">Angel Frequencies</SelectItem>
                  <SelectItem value="planetary">Planetary Frequencies</SelectItem>
                  <SelectItem value="special">Special Frequencies</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "wheel" ? "default" : "outline"}
                  onClick={() => setViewMode("wheel")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Wheel View
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  List View
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {viewMode === "wheel" ? (
              <FrequencyWheel />
            ) : (
              <FrequencyList 
                searchQuery={searchQuery}
                categoryFilter={categoryFilter}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 