"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { InteractiveChart } from "./interactive-chart"
import {
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  Download,
  MapPin,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface AnalyticsData {
  totalShipments: number
  deliveredShipments: number
  pendingShipments: number
  delayedShipments: number
  totalRevenue: number
  averageDeliveryTime: number
  customerSatisfaction: number
  activeUsers: number
  topRoutes: Array<{
    route: string
    count: number
    avgTime: number
    revenue: number
    efficiency: number
  }>
  performanceMetrics: Array<{
    date: string
    shipments: number
    revenue: number
    deliveryTime: number
  }>
  regionalData: Array<{
    region: string
    shipments: number
    revenue: number
    growth: number
  }>
  agentPerformance: Array<{
    name: string
    deliveries: number
    rating: number
    efficiency: number
    revenue: number
  }>
}

export function EnhancedAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedView, setSelectedView] = useState("overview")

  // Simulate fetching analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockData: AnalyticsData = {
        totalShipments: 2847,
        deliveredShipments: 2654,
        pendingShipments: 156,
        delayedShipments: 37,
        totalRevenue: 145678,
        averageDeliveryTime: 2.3,
        customerSatisfaction: 4.8,
        activeUsers: 1234,
        topRoutes: [
          { route: "New York → Los Angeles", count: 245, avgTime: 3.2, revenue: 24500, efficiency: 92 },
          { route: "Chicago → Miami", count: 198, avgTime: 2.8, revenue: 19800, efficiency: 88 },
          { route: "Seattle → Denver", count: 167, avgTime: 2.1, revenue: 16700, efficiency: 95 },
          { route: "Boston → Austin", count: 134, avgTime: 3.5, revenue: 13400, efficiency: 85 },
          { route: "Phoenix → Portland", count: 112, avgTime: 2.9, revenue: 11200, efficiency: 90 },
        ],
        performanceMetrics: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          shipments: Math.floor(Math.random() * 100) + 50,
          revenue: Math.floor(Math.random() * 5000) + 2000,
          deliveryTime: Math.random() * 2 + 1.5,
        })).reverse(),
        regionalData: [
          { region: "West Coast", shipments: 856, revenue: 85600, growth: 15.2 },
          { region: "East Coast", shipments: 742, revenue: 74200, growth: 12.8 },
          { region: "Midwest", shipments: 634, revenue: 63400, growth: 8.5 },
          { region: "South", shipments: 615, revenue: 61500, growth: 18.3 },
        ],
        agentPerformance: [
          { name: "Mike Johnson", deliveries: 145, rating: 4.9, efficiency: 96, revenue: 14500 },
          { name: "Sarah Wilson", deliveries: 132, rating: 4.8, efficiency: 94, revenue: 13200 },
          { name: "Tom Brown", deliveries: 128, rating: 4.7, efficiency: 91, revenue: 12800 },
          { name: "Lisa Davis", deliveries: 115, rating: 4.9, efficiency: 98, revenue: 11500 },
          { name: "Chris Miller", deliveries: 103, rating: 4.6, efficiency: 89, revenue: 10300 },
        ],
      }

      setAnalyticsData(mockData)
      setLoading(false)
    }

    fetchAnalytics()
  }, [timeRange])

  const exportData = () => {
    if (!analyticsData) return

    const dataToExport = {
      exportDate: new Date().toISOString(),
      timeRange,
      ...analyticsData,
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-${timeRange}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading || !analyticsData) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const deliveryRate = (analyticsData.deliveredShipments / analyticsData.totalShipments) * 100
  const revenueGrowth = 15.2

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive insights into your delivery operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="regional">Regional</SelectItem>
              <SelectItem value="agents">Agents</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Shipments</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.totalShipments.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+12.5% from last period</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${analyticsData.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+{revenueGrowth}% growth</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Delivery Time</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.averageDeliveryTime} days</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">-0.3 days improvement</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customer Rating</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.customerSatisfaction}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+0.2 improvement</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart data={analyticsData.performanceMetrics} title="Performance Trends" type="shipments" />
        <InteractiveChart data={analyticsData.performanceMetrics} title="Revenue Analysis" type="revenue" />
      </div>

      {/* Conditional Views */}
      {selectedView === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Delivery Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
                <CardDescription>Success rate and delivery metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Delivery Success Rate</span>
                    <span className="text-sm font-bold">{deliveryRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={deliveryRate} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium">Delivered</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{analyticsData.deliveredShipments}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{analyticsData.pendingShipments}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-sm font-medium">Delayed</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">{analyticsData.delayedShipments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Routes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Top Routes</CardTitle>
                <CardDescription>Most popular shipping routes with performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topRoutes.map((route, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{route.route}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{route.count} shipments</span>
                            <span>${route.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {route.efficiency}% efficiency
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mt-1">{route.avgTime} days</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {selectedView === "regional" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Regional Performance</span>
              </CardTitle>
              <CardDescription>Performance breakdown by geographic region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analyticsData.regionalData.map((region, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-2">{region.region}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Shipments</span>
                        <span className="font-medium">{region.shipments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Revenue</span>
                        <span className="font-medium">${region.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Growth</span>
                        <span className={`font-medium ${region.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                          {region.growth > 0 ? "+" : ""}
                          {region.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {selectedView === "agents" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Agent Performance</span>
              </CardTitle>
              <CardDescription>Individual agent metrics and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.agentPerformance.map((agent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-blue-600">
                          {agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                        <p className="text-sm text-gray-600">{agent.deliveries} deliveries</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="font-semibold">★ {agent.rating}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Efficiency</p>
                        <p className="font-semibold">{agent.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="font-semibold">${agent.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
