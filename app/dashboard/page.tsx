"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { NotificationSystem } from "@/components/notification-system"
import { EnhancedAnalyticsDashboard } from "@/components/enhanced-analytics-dashboard"
import { GoogleMapsTracking } from "@/components/google-maps-tracking"
import { FunctionalShipmentActions } from "@/components/functional-shipment-actions"
import {
  Package,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  MapPin,
  Bell,
  Settings,
  BarChart3,
  Users,
  Search,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserButton } from "@clerk/nextjs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Enhanced mock data with more realistic information
const initialShipments = [
  {
    id: "SP123456",
    from: "New York, NY",
    to: "Los Angeles, CA",
    status: "In Transit",
    progress: 75,
    eta: "2 days",
    statusColor: "bg-blue-500",
    recipient: "Jane Doe",
    value: "$250.00",
    priority: "high",
    lastUpdate: "2 hours ago",
    phone: "+1-555-0123",
    email: "jane.doe@email.com",
    description: "Fragile electronics - handle with care",
    weight: "2.5 lbs",
    dimensions: "12x8x4 inches",
    currentLocation: {
      lat: 39.8283,
      lng: -98.5795,
      address: "Kansas City, MO",
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: "SP123457",
    from: "Chicago, IL",
    to: "Miami, FL",
    status: "Delivered",
    progress: 100,
    eta: "Completed",
    statusColor: "bg-green-500",
    recipient: "Mike Johnson",
    value: "$180.00",
    priority: "medium",
    lastUpdate: "1 hour ago",
    phone: "+1-555-0124",
    email: "mike.johnson@email.com",
    description: "Standard delivery",
    weight: "1.8 lbs",
    dimensions: "10x6x3 inches",
  },
  {
    id: "SP123458",
    from: "Seattle, WA",
    to: "Denver, CO",
    status: "Pending",
    progress: 0,
    eta: "5 days",
    statusColor: "bg-yellow-500",
    recipient: "Sarah Wilson",
    value: "$320.00",
    priority: "low",
    lastUpdate: "30 minutes ago",
    phone: "+1-555-0125",
    email: "sarah.wilson@email.com",
    description: "Books and documents",
    weight: "3.2 lbs",
    dimensions: "14x10x6 inches",
  },
  {
    id: "SP123459",
    from: "Boston, MA",
    to: "Austin, TX",
    status: "Delayed",
    progress: 45,
    eta: "4 days",
    statusColor: "bg-red-500",
    recipient: "Tom Brown",
    value: "$420.00",
    priority: "high",
    lastUpdate: "15 minutes ago",
    phone: "+1-555-0126",
    email: "tom.brown@email.com",
    description: "Weather delay - rerouting",
    weight: "4.1 lbs",
    dimensions: "16x12x8 inches",
  },
]

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState("overview")
  const [liveShipments, setLiveShipments] = useState(initialShipments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveShipments((prev) =>
        prev.map((shipment) => {
          if (shipment.status === "In Transit" && shipment.progress < 100) {
            return {
              ...shipment,
              progress: Math.min(shipment.progress + Math.random() * 5, 100),
              lastUpdate: "Just now",
            }
          }
          return shipment
        }),
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  // Filter shipments based on search and status
  const filteredShipments = liveShipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.to.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || shipment.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleShipmentUpdate = (shipmentId: string, updates: any) => {
    setLiveShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === shipmentId ? { ...shipment, ...updates, lastUpdate: "Just now" } : shipment,
      ),
    )
  }

  const handleShipmentDelete = (shipmentId: string) => {
    setLiveShipments((prev) => prev.filter((shipment) => shipment.id !== shipmentId))
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "optimize-routes":
        toast({
          title: "Route Optimization",
          description: "Analyzing routes for optimal delivery paths...",
        })
        break
      case "generate-report":
        toast({
          title: "Generating Report",
          description: "Creating comprehensive performance report...",
        })
        break
      case "manage-team":
        toast({
          title: "Team Management",
          description: "Opening team management interface...",
        })
        break
      case "notification-settings":
        toast({
          title: "Notification Settings",
          description: "Opening notification preferences...",
        })
        break
      default:
        break
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const stats = [
    {
      title: "Active Shipments",
      value: filteredShipments.filter((s) => s.status !== "Delivered").length.toString(),
      change: "+3 from yesterday",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Delivered Today",
      value: filteredShipments.filter((s) => s.status === "Delivered").length.toString(),
      change: "+2 from yesterday",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Pickup",
      value: filteredShipments.filter((s) => s.status === "Pending").length.toString(),
      change: "Same as yesterday",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Revenue",
      value: "$2,450",
      change: "+15% this month",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Pro Account
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationSystem />
              <Link href="/shipments/new">
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Shipment</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => handleQuickAction("notification-settings")}>
                <Settings className="h-4 w-4" />
              </Button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div className="mb-8" {...fadeInUp}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName || "User"}! 👋</h2>
          <p className="text-gray-600">Here's what's happening with your shipments today.</p>
        </motion.div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Live Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Team</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Search and Filter */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
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
                      <Button variant="outline" onClick={() => handleQuickAction("optimize-routes")}>
                        <MapPin className="h-4 w-4 mr-2" />
                        Optimize Routes
                      </Button>
                      <Button variant="outline" onClick={() => handleQuickAction("generate-report")}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Shipments with Functional Actions */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Live Shipments</CardTitle>
                    <CardDescription>Real-time tracking and updates with full functionality</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-500">Live</span>
                    </div>
                    <Badge variant="outline">{filteredShipments.length} shipments</Badge>
                    <Link href="/shipments">
                      <Button variant="outline">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredShipments.map((shipment, index) => (
                      <motion.div
                        key={shipment.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${shipment.statusColor}`} />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900">{shipment.id}</span>
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
                              {shipment.priority === "high" && (
                                <Badge variant="destructive" className="text-xs">
                                  High Priority
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {shipment.from} → {shipment.to}
                              </span>
                              <span>To: {shipment.recipient}</span>
                              <span>{shipment.value}</span>
                              <span className="text-xs text-blue-600">{shipment.lastUpdate}</span>
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

                          <FunctionalShipmentActions
                            shipment={shipment}
                            onUpdate={handleShipmentUpdate}
                            onDelete={handleShipmentDelete}
                          />
                        </div>
                      </motion.div>
                    ))}

                    {filteredShipments.length === 0 && (
                      <div className="text-center py-8">
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
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics">
            <EnhancedAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="tracking">
            <GoogleMapsTracking
              shipmentId="SP123456"
              origin={{
                lat: 40.7128,
                lng: -74.006,
                address: "New York, NY",
                timestamp: new Date().toISOString(),
              }}
              destination={{
                lat: 34.0522,
                lng: -118.2437,
                address: "Los Angeles, CA",
                timestamp: new Date().toISOString(),
              }}
              currentLocation={{
                lat: 39.8283,
                lng: -98.5795,
                address: "Kansas City, MO",
                timestamp: new Date().toISOString(),
                speed: 65,
                heading: 245,
              }}
              status="In Transit"
            />
          </TabsContent>

          <TabsContent value="team">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>Your delivery team's performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Mike Johnson", deliveries: 45, rating: 4.9, status: "active", efficiency: 96 },
                      { name: "Sarah Wilson", deliveries: 42, rating: 4.8, status: "active", efficiency: 94 },
                      { name: "Tom Brown", deliveries: 38, rating: 4.7, status: "busy", efficiency: 91 },
                      { name: "Lisa Davis", deliveries: 35, rating: 4.9, status: "active", efficiency: 98 },
                    ].map((agent, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {agent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{agent.name}</p>
                            <p className="text-sm text-gray-600">{agent.deliveries} deliveries</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
                            <Badge variant="outline" className="text-xs">
                              {agent.efficiency}%
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">★ {agent.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your team and operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleQuickAction("manage-team")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Manage Team Members
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleQuickAction("optimize-routes")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Route Optimization
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleQuickAction("generate-report")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Performance Reports
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleQuickAction("notification-settings")}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
