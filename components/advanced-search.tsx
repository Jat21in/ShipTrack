"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, CalendarIcon, MapPin, Package, User, X, SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"
import { AnimatePresence } from "framer-motion"

interface SearchFilters {
  query: string
  status: string[]
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  origin: string
  destination: string
  recipient: string
  minValue: string
  maxValue: string
  packageType: string[]
  priority: string[]
  agent: string
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  onClear: () => void
}

export function AdvancedSearch({ onSearch, onClear }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    status: [],
    dateRange: { from: undefined, to: undefined },
    origin: "",
    destination: "",
    recipient: "",
    minValue: "",
    maxValue: "",
    packageType: [],
    priority: [],
    agent: "",
  })

  const statusOptions = [
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "picked-up", label: "Picked Up", color: "bg-blue-100 text-blue-800" },
    { value: "in-transit", label: "In Transit", color: "bg-purple-100 text-purple-800" },
    { value: "out-for-delivery", label: "Out for Delivery", color: "bg-orange-100 text-orange-800" },
    { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
    { value: "delayed", label: "Delayed", color: "bg-red-100 text-red-800" },
    { value: "cancelled", label: "Cancelled", color: "bg-gray-100 text-gray-800" },
  ]

  const packageTypes = [
    "Envelope",
    "Small Package",
    "Medium Package",
    "Large Package",
    "Fragile",
    "Express",
    "Overnight",
  ]

  const priorityLevels = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" },
  ]

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleArrayFilterToggle = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter((item) => item !== value)
        : [...(prev[key] as string[]), value],
    }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClear = () => {
    setFilters({
      query: "",
      status: [],
      dateRange: { from: undefined, to: undefined },
      origin: "",
      destination: "",
      recipient: "",
      minValue: "",
      maxValue: "",
      packageType: [],
      priority: [],
      agent: "",
    })
    onClear()
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.query) count++
    if (filters.status.length > 0) count++
    if (filters.dateRange.from || filters.dateRange.to) count++
    if (filters.origin) count++
    if (filters.destination) count++
    if (filters.recipient) count++
    if (filters.minValue || filters.maxValue) count++
    if (filters.packageType.length > 0) count++
    if (filters.priority.length > 0) count++
    if (filters.agent) count++
    return count
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Advanced Search</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">
                {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? "s" : ""} active
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {isExpanded ? "Simple" : "Advanced"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Search */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search by tracking number, recipient, or location..."
              value={filters.query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
              className="text-base"
            />
          </div>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          {getActiveFiltersCount() > 0 && (
            <Button variant="outline" onClick={handleClear}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 border-t pt-6"
            >
              {/* Status Filters */}
              <div>
                <Label className="text-base font-medium mb-3 block">Status</Label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((status) => (
                    <motion.div key={status.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        variant={filters.status.includes(status.value) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          filters.status.includes(status.value) ? status.color : ""
                        }`}
                        onClick={() => handleArrayFilterToggle("status", status.value)}
                      >
                        {status.label}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">Date Range</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1 justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.from ? format(filters.dateRange.from, "PPP") : "From date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.from}
                          onSelect={(date) => handleFilterChange("dateRange", { ...filters.dateRange, from: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1 justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange.to ? format(filters.dateRange.to, "PPP") : "To date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.to}
                          onSelect={(date) => handleFilterChange("dateRange", { ...filters.dateRange, to: date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Value Range */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Package Value ($)</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Min value"
                      value={filters.minValue}
                      onChange={(e) => handleFilterChange("minValue", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max value"
                      value={filters.maxValue}
                      onChange={(e) => handleFilterChange("maxValue", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Location Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="origin" className="text-base font-medium mb-3 block">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Origin
                  </Label>
                  <Input
                    id="origin"
                    placeholder="Origin city or state"
                    value={filters.origin}
                    onChange={(e) => handleFilterChange("origin", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="destination" className="text-base font-medium mb-3 block">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    placeholder="Destination city or state"
                    value={filters.destination}
                    onChange={(e) => handleFilterChange("destination", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="recipient" className="text-base font-medium mb-3 block">
                    <User className="h-4 w-4 inline mr-1" />
                    Recipient
                  </Label>
                  <Input
                    id="recipient"
                    placeholder="Recipient name"
                    value={filters.recipient}
                    onChange={(e) => handleFilterChange("recipient", e.target.value)}
                  />
                </div>
              </div>

              {/* Package Type */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  <Package className="h-4 w-4 inline mr-1" />
                  Package Type
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {packageTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={filters.packageType.includes(type)}
                        onCheckedChange={() => handleArrayFilterToggle("packageType", type)}
                      />
                      <Label htmlFor={type} className="text-sm font-normal cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority & Agent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">Priority Level</Label>
                  <div className="space-y-2">
                    {priorityLevels.map((priority) => (
                      <div key={priority.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={priority.value}
                          checked={filters.priority.includes(priority.value)}
                          onCheckedChange={() => handleArrayFilterToggle("priority", priority.value)}
                        />
                        <Label htmlFor={priority.value} className="text-sm font-normal cursor-pointer">
                          {priority.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Assigned Agent</Label>
                  <Select value={filters.agent} onValueChange={(value) => handleFilterChange("agent", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Agents</SelectItem>
                      <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                      <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                      <SelectItem value="tom-brown">Tom Brown</SelectItem>
                      <SelectItem value="lisa-davis">Lisa Davis</SelectItem>
                      <SelectItem value="chris-miller">Chris Miller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button variant="outline" onClick={handleClear}>
                  Clear All Filters
                </Button>
                <Button onClick={handleSearch}>Apply Filters</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
