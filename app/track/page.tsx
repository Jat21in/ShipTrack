"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Package, MapPin, CheckCircle, Truck, Calendar, Phone } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

// Mock tracking data
const trackingData = {
  id: "SP123456",
  status: "In Transit",
  progress: 75,
  from: {
    name: "John Smith",
    address: "123 Main St, New York, NY 10001",
    phone: "+1 (555) 123-4567",
  },
  to: {
    name: "Jane Doe",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    phone: "+1 (555) 987-6543",
  },
  package: {
    weight: "2.5 lbs",
    dimensions: '12" x 8" x 4"',
    type: "Standard Package",
  },
  timeline: [
    {
      status: "Package Created",
      date: "2024-01-15",
      time: "09:00 AM",
      location: "New York, NY",
      completed: true,
      icon: Package,
    },
    {
      status: "Picked Up",
      date: "2024-01-15",
      time: "02:30 PM",
      location: "New York Distribution Center",
      completed: true,
      icon: CheckCircle,
    },
    {
      status: "In Transit",
      date: "2024-01-16",
      time: "08:15 AM",
      location: "Chicago, IL",
      completed: true,
      icon: Truck,
      current: true,
    },
    {
      status: "Out for Delivery",
      date: "2024-01-17",
      time: "Expected",
      location: "Los Angeles, CA",
      completed: false,
      icon: MapPin,
    },
    {
      status: "Delivered",
      date: "2024-01-17",
      time: "Expected",
      location: "Los Angeles, CA",
      completed: false,
      icon: CheckCircle,
    },
  ],
}

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingNumber.trim()) {
      setShowResults(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div className="text-center" {...fadeInUp}>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Shipment</h1>
            <p className="text-gray-600">Enter your tracking number to get real-time updates</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <motion.div className="mb-8" {...fadeInUp}>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleTrack} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter tracking number (e.g., SP123456)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
                <Button type="submit" size="lg" className="px-8">
                  <Search className="h-4 w-4 mr-2" />
                  Track
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tracking Results */}
        {showResults && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Status Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Package #{trackingData.id}</CardTitle>
                    <CardDescription>Current status and delivery information</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-100 text-blue-800">
                    {trackingData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Delivery Progress</span>
                      <span className="text-sm text-gray-600">{trackingData.progress}%</span>
                    </div>
                    <Progress value={trackingData.progress} className="h-3" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">From</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="font-medium">{trackingData.from.name}</p>
                        <p>{trackingData.from.address}</p>
                        <p className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {trackingData.from.phone}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">To</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="font-medium">{trackingData.to.name}</p>
                        <p>{trackingData.to.address}</p>
                        <p className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {trackingData.to.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Live Tracking Map</CardTitle>
                <CardDescription>Real-time location of your package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive map would be displayed here</p>
                    <p className="text-sm text-gray-500 mt-1">Current location: Chicago, IL</p>
                  </div>

                  {/* Animated marker */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-4 h-4 bg-blue-600 rounded-full" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Tracking Timeline</CardTitle>
                <CardDescription>Detailed history of your package journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.timeline.map((event, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          event.completed
                            ? event.current
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <event.icon className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${event.completed ? "text-gray-900" : "text-gray-500"}`}>
                            {event.status}
                          </p>
                          {event.current && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Current
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {event.date} at {event.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Package Details */}
            <Card>
              <CardHeader>
                <CardTitle>Package Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Weight</p>
                    <p className="text-lg font-semibold">{trackingData.package.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dimensions</p>
                    <p className="text-lg font-semibold">{trackingData.package.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Package Type</p>
                    <p className="text-lg font-semibold">{trackingData.package.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
