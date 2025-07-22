"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Plus,
  Grid3X3,
  List,
  MapPin,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Package,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

// Mock shipments data
const shipments = [
  {
    id: "SP123456",
    from: "New York, NY",
    to: "Los Angeles, CA",
    status: "In Transit",
    progress: 75,
    eta: "2 days",
    date: "2024-01-15",
    recipient: "Jane Doe",
    weight: "2.5 lbs",
    statusColor: "bg-blue-500",
  },
  {
    id: "SP123457",
    from: "Chicago, IL",
    to: "Miami, FL",
    status: "Delivered",
    progress: 100,
    eta: "Completed",
    date: "2024-01-14",
    recipient: "Mike Johnson",
    weight: "1.8 lbs",
    statusColor: "bg-green-500",
  },
  {
    id: "SP123458",
    from: "Seattle, WA",
    to: "Denver, CO",
    status: "Pending",
    progress: 0,
    eta: "5 days",
    date: "2024-01-16",
    recipient: "Sarah Wilson",
    weight: "3.2 lbs",
    statusColor: "bg-yellow-500",
  },
  {
    id: "SP123459",
    from: "Boston, MA",
    to: "Austin, TX",
    status: "Delayed",
    progress: 45,
    eta: "4 days",
    date: "2024-01-13",
    recipient: "Tom Brown",
    weight: "4.1 lbs",
    statusColor: "bg-red-500",
  },
  {
    id: "SP123460",
    from: "Phoenix, AZ",
    to: "Portland, OR",
    status: "In Transit",
    progress: 60,
    eta: "3 days",
    date: "2024-01-15",
    recipient: "Lisa Davis",
    weight: "2.0 lbs",
    statusColor: "bg-blue-500",
  },
  {
    id: "SP123461",
    from: "Atlanta, GA",
    to: "Nashville, TN",
    status: "Delivered",
    progress: 100,
    eta: "Completed",
    date: "2024-01-12",
    recipient: "Chris Miller",
    weight: "1.5 lbs",
    statusColor: "bg-green-500",
  },
]

export default function ShipmentsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.to.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || shipment.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {filteredShipments.length} shipments
              </Badge>
            </div>
            <Link href="/shipments/new">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Shipment</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <motion.div className="mb-6" {...fadeInUp}>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search shipments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shipments Display */}
        {viewMode === "list" ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredShipments.map((shipment, index) => (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${shipment.statusColor}`} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900 text-lg">{shipment.id}</span>
                            <Badge
                              variant={
                                shipment.status === "Delivered"
                                  ? "default"
                                  : shipment.status === "In Transit"
                                    ? "secondary"
                                    : shipment.status === "Delayed"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {shipment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600 mt-2">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {shipment.from} → {shipment.to}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {shipment.date}
                            </span>
                            <span>To: {shipment.recipient}</span>
                            <span>{shipment.weight}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">ETA: {shipment.eta}</p>
                          <div className="w-32">
                            <Progress value={shipment.progress} className="h-2" />
                            <span className="text-xs text-gray-500 mt-1">{shipment.progress}%</span>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredShipments.map((shipment, index) => (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{shipment.id}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Badge
                      variant={
                        shipment.status === "Delivered"
                          ? "default"
                          : shipment.status === "In Transit"
                            ? "secondary"
                            : shipment.status === "Delayed"
                              ? "destructive"
                              : "outline"
                      }
                      className="w-fit"
                    >
                      {shipment.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">
                          {shipment.from} → {shipment.to}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">To: {shipment.recipient}</span>
                        <span className="text-gray-600">{shipment.weight}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{shipment.date}</span>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm text-gray-600">ETA: {shipment.eta}</span>
                        </div>
                        <Progress value={shipment.progress} className="h-2" />
                        <span className="text-xs text-gray-500 mt-1">{shipment.progress}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredShipments.length === 0 && (
          <motion.div className="text-center py-12" {...fadeInUp}>
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first shipment"}
            </p>
            <Link href="/shipments/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Shipment
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
