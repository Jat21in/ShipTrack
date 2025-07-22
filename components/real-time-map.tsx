"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Truck, Clock, AlertTriangle } from "lucide-react"

interface LocationData {
  lat: number
  lng: number
  address: string
  timestamp: string
  speed?: number
  heading?: number
}

interface RealTimeMapProps {
  shipmentId: string
  origin: LocationData
  destination: LocationData
  currentLocation?: LocationData
  status: string
}

export function RealTimeMap({ shipmentId, origin, destination, currentLocation, status }: RealTimeMapProps) {
  const [liveLocation, setLiveLocation] = useState<LocationData | null>(currentLocation || null)
  const [isTracking, setIsTracking] = useState(true)
  const [routeData, setRouteData] = useState<any>(null)

  // Simulate real-time location updates
  useEffect(() => {
    if (!isTracking) return

    const interval = setInterval(async () => {
      // Simulate movement towards destination
      if (liveLocation && destination) {
        const newLat = liveLocation.lat + (destination.lat - liveLocation.lat) * 0.01
        const newLng = liveLocation.lng + (destination.lng - liveLocation.lng) * 0.01

        // Get address from coordinates using free geocoding API
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${newLat}+${newLng}&key=YOUR_API_KEY&limit=1`,
          )
          const data = await response.json()
          const address = data.results?.[0]?.formatted || "Unknown location"

          setLiveLocation({
            lat: newLat,
            lng: newLng,
            address,
            timestamp: new Date().toISOString(),
            speed: Math.random() * 60 + 20, // Random speed between 20-80 mph
            heading: Math.random() * 360,
          })
        } catch (error) {
          // Fallback without geocoding
          setLiveLocation({
            lat: newLat,
            lng: newLng,
            address: "En route",
            timestamp: new Date().toISOString(),
            speed: Math.random() * 60 + 20,
            heading: Math.random() * 360,
          })
        }
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [liveLocation, destination, isTracking])

  // Fetch route data using free routing API
  useEffect(() => {
    const fetchRoute = async () => {
      if (!origin || !destination) return

      try {
        // Using OpenRouteService free API (requires API key)
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=YOUR_API_KEY&start=${origin.lng},${origin.lat}&end=${destination.lng},${destination.lat}`,
        )
        const data = await response.json()
        setRouteData(data)
      } catch (error) {
        console.error("Failed to fetch route:", error)
      }
    }

    fetchRoute()
  }, [origin, destination])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 3959 // Earth's radius in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLng = (lng2 - lng1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const remainingDistance = liveLocation
    ? calculateDistance(liveLocation.lat, liveLocation.lng, destination.lat, destination.lng)
    : 0

  const estimatedArrival = liveLocation?.speed
    ? new Date(Date.now() + (remainingDistance / liveLocation.speed) * 60 * 60 * 1000)
    : null

  return (
    <div className="space-y-6">
      {/* Live Tracking Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="h-5 w-5 text-blue-600" />
              <span>Live Tracking - {shipmentId}</span>
            </CardTitle>
            <Badge variant={status === "In Transit" ? "default" : "secondary"} className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{status}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {liveLocation && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Current Location</p>
                <p className="text-sm text-gray-900">{liveLocation.address}</p>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(liveLocation.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Speed & Distance</p>
                <p className="text-sm text-gray-900">{liveLocation.speed?.toFixed(1)} mph</p>
                <p className="text-xs text-gray-500">{remainingDistance.toFixed(1)} miles remaining</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Estimated Arrival</p>
                <p className="text-sm text-gray-900">{estimatedArrival?.toLocaleTimeString() || "Calculating..."}</p>
                <p className="text-xs text-gray-500">
                  {estimatedArrival && `${Math.ceil((estimatedArrival.getTime() - Date.now()) / (1000 * 60))} min`}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
            {/* Map placeholder with animated elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600 mb-1">Interactive Map</p>
                <p className="text-sm text-gray-500">Real-time tracking enabled</p>
              </div>
            </div>

            {/* Animated route line */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d="M 50 300 Q 200 100 350 200"
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </svg>

            {/* Origin marker */}
            <motion.div
              className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <MapPin className="h-4 w-4" />
            </motion.div>

            {/* Destination marker */}
            <motion.div
              className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <MapPin className="h-4 w-4" />
            </motion.div>

            {/* Live truck marker */}
            {liveLocation && (
              <motion.div
                className="absolute bg-blue-600 text-white p-2 rounded-full shadow-lg"
                style={{
                  left: `${Math.random() * 60 + 20}%`,
                  top: `${Math.random() * 60 + 20}%`,
                }}
                animate={{
                  x: [0, 10, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Truck className="h-4 w-4" />
              </motion.div>
            )}

            {/* Pulse rings around live location */}
            {liveLocation && (
              <motion.div
                className="absolute bg-blue-400 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 60 + 20}%`,
                  top: `${Math.random() * 60 + 20}%`,
                  width: "20px",
                  height: "20px",
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                }}
              />
            )}
          </div>

          {/* Route Information */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="font-medium">Origin:</span>
              <span className="text-gray-600">{origin.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="font-medium">Destination:</span>
              <span className="text-gray-600">{destination.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic & Weather Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span>Route Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Traffic Delay</p>
                <p className="text-xs text-yellow-700">Heavy traffic on I-405. Estimated delay: 15 minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <Navigation className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Route Optimization</p>
                <p className="text-xs text-blue-700">Alternative route available. Save 8 minutes via Highway 101</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
