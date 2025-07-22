"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Package, Truck, AlertTriangle, CheckCircle, Clock, DollarSign, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"

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

// Mock data
const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Shipments",
    value: "1,234",
    change: "+8%",
    icon: Package,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Delivery Agents",
    value: "156",
    change: "+3%",
    icon: Truck,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Revenue",
    value: "$45,678",
    change: "+15%",
    icon: DollarSign,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "shipment",
    message: "New shipment SP123456 created by John Doe",
    time: "2 minutes ago",
    status: "info",
  },
  {
    id: 2,
    type: "delivery",
    message: "Package SP123455 delivered successfully",
    time: "5 minutes ago",
    status: "success",
  },
  {
    id: 3,
    type: "alert",
    message: "Shipment SP123454 delayed due to weather",
    time: "10 minutes ago",
    status: "warning",
  },
  {
    id: 4,
    type: "user",
    message: "New user registration: jane@example.com",
    time: "15 minutes ago",
    status: "info",
  },
  {
    id: 5,
    type: "agent",
    message: "Agent Mike Johnson completed 5 deliveries",
    time: "20 minutes ago",
    status: "success",
  },
]

const topAgents = [
  { name: "Mike Johnson", deliveries: 45, rating: 4.9, status: "active" },
  { name: "Sarah Wilson", deliveries: 42, rating: 4.8, status: "active" },
  { name: "Tom Brown", deliveries: 38, rating: 4.7, status: "busy" },
  { name: "Lisa Davis", deliveries: 35, rating: 4.9, status: "active" },
  { name: "Chris Miller", deliveries: 33, rating: 4.6, status: "offline" },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Admin Access
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Export Data</Button>
              <Button>Generate Report</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div className="lg:col-span-2" {...fadeInUp} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Latest system activities and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`p-1 rounded-full ${
                          activity.status === "success"
                            ? "bg-green-100"
                            : activity.status === "warning"
                              ? "bg-yellow-100"
                              : "bg-blue-100"
                        }`}
                      >
                        {activity.status === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {activity.status === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                        {activity.status === "info" && <Activity className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Delivery Agents */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Top Agents</span>
                </CardTitle>
                <CardDescription>Best performing delivery agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAgents.map((agent, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                          <p className="text-xs text-gray-500">{agent.deliveries} deliveries</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            agent.status === "active" ? "default" : agent.status === "busy" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {agent.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">★ {agent.rating}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-sm font-medium">98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                  <p className="text-xs text-green-600">+2.1% from last month</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Delivery Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-2xl font-bold">2.3 days</span>
                  </div>
                  <p className="text-xs text-green-600">-0.2 days improvement</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">4.8</span>
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                  <p className="text-xs text-green-600">+0.1 from last month</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
