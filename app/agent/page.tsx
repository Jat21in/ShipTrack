"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin, Package, Clock, CheckCircle, Navigation, Phone, MessageSquare, Star, Truck } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

// Mock data for assigned deliveries
const assignedDeliveries = [
  {
    id: "SP123456",
    recipient: "Jane Doe",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    phone: "+1 (555) 987-6543",
    status: "Picked Up",
    priority: "high",
    estimatedTime: "2:30 PM",
    distance: "2.3 miles",
    packageType: "Standard Package",
  },
  {
    id: "SP123457",
    recipient: "Mike Johnson",
    address: "789 Pine St, Los Angeles, CA 90211",
    phone: "+1 (555) 123-7890",
    status: "In Transit",
    priority: "medium",
    estimatedTime: "3:15 PM",
    distance: "4.1 miles",
    packageType: "Express Package",
  },
  {
    id: "SP123458",
    recipient: "Sarah Wilson",
    address: "321 Elm Dr, Los Angeles, CA 90212",
    phone: "+1 (555) 456-1234",
    status: "Pending",
    priority: "low",
    estimatedTime: "4:00 PM",
    distance: "6.8 miles",
    packageType: "Large Package",
  },
]

const todayStats = {
  deliveriesCompleted: 8,
  deliveriesRemaining: 3,
  totalDistance: "45.2 miles",
  averageRating: 4.9,
}

export default function AgentDashboard() {
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null)

  const updateDeliveryStatus = (deliveryId: string, newStatus: string) => {
    console.log(`Updating delivery ${deliveryId} to ${newStatus}`)
    // Handle status update logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                On Duty
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-2" />
                Route Optimization
              </Button>
              <Button variant="outline" size="sm">
                Emergency
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Today's Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{todayStats.deliveriesCompleted}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{todayStats.deliveriesRemaining}</p>
              <p className="text-sm text-gray-600">Remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{todayStats.totalDistance}</p>
              <p className="text-sm text-gray-600">Distance</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{todayStats.averageRating}</p>
              <p className="text-sm text-gray-600">Rating</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assigned Deliveries */}
          <motion.div className="lg:col-span-2" {...fadeInUp} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Today's Deliveries</CardTitle>
                <CardDescription>Your assigned deliveries for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedDeliveries.map((delivery, index) => (
                    <motion.div
                      key={delivery.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900">{delivery.id}</span>
                            <Badge
                              variant={
                                delivery.status === "Picked Up"
                                  ? "default"
                                  : delivery.status === "In Transit"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {delivery.status}
                            </Badge>
                            <Badge
                              variant={
                                delivery.priority === "high"
                                  ? "destructive"
                                  : delivery.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {delivery.priority} priority
                            </Badge>
                          </div>
                          <p className="font-medium text-gray-900">{delivery.recipient}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {delivery.address}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            ETA: {delivery.estimatedTime}
                          </p>
                          <p>{delivery.distance}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <Navigation className="h-3 w-3 mr-1" />
                            Navigate
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          {delivery.status === "Pending" && (
                            <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, "Picked Up")}>
                              Pick Up
                            </Button>
                          )}
                          {delivery.status === "Picked Up" && (
                            <Button size="sm" onClick={() => updateDeliveryStatus(delivery.id, "In Transit")}>
                              In Transit
                            </Button>
                          )}
                          {delivery.status === "In Transit" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => updateDeliveryStatus(delivery.id, "Delivered")}
                            >
                              Mark Delivered
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Route Map & Quick Actions */}
          <motion.div className="space-y-6" {...fadeInUp} transition={{ delay: 0.3 }}>
            {/* Route Map */}
            <Card>
              <CardHeader>
                <CardTitle>Optimized Route</CardTitle>
                <CardDescription>Your delivery route for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive route map</p>
                    <p className="text-sm text-gray-500 mt-1">3 stops remaining</p>
                  </div>

                  {/* Animated route indicators */}
                  <motion.div
                    className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-4 w-3 h-3 bg-blue-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Distance</span>
                    <span className="font-medium">13.2 miles</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Time</span>
                    <span className="font-medium">2h 15m</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-500">65% complete</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Request Break
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Update Location
                </Button>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Delivery Rate</span>
                    <span className="text-sm font-medium">73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">On-Time Delivery</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
