"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation, Truck, RefreshCw, Maximize2 } from "lucide-react"

interface LocationData {
  lat: number
  lng: number
  address: string
  timestamp: string
  speed?: number
  heading?: number
}

interface GoogleMapsTrackingProps {
  shipmentId: string
  origin: LocationData
  destination: LocationData
  currentLocation?: LocationData
  status: string
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function GoogleMapsTracking({
  shipmentId,
  origin,
  destination,
  currentLocation,
  status,
}: GoogleMapsTrackingProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [liveLocation, setLiveLocation] = useState<LocationData | null>(currentLocation || null)
  const [isTracking, setIsTracking] = useState(true)
  const [markers, setMarkers] = useState<any[]>([])
  const [routePath, setRoutePath] = useState<any>(null)

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        setIsLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BjuHVaU01aI&libraries=geometry,places`
      script.async = true
      script.defer = true
      script.onload = () => setIsLoaded(true)
      document.head.appendChild(script)
    }

    loadGoogleMaps()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 6,
      center: { lat: 39.8283, lng: -98.5795 }, // Center of US
      mapTypeId: "roadmap",
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    })

    mapInstanceRef.current = map

    // Create markers
    const newMarkers: any[] = []

    // Origin marker (green)
    const originMarker = new window.google.maps.Marker({
      position: { lat: origin.lat, lng: origin.lng },
      map: map,
      title: `Origin: ${origin.address}`,
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="12" fill="#10b981" stroke="white" strokeWidth="2"/>
            <circle cx="16" cy="16" r="4" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
      },
    })
    newMarkers.push(originMarker)

    // Destination marker (red)
    const destMarker = new window.google.maps.Marker({
      position: { lat: destination.lat, lng: destination.lng },
      map: map,
      title: `Destination: ${destination.address}`,
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="12" fill="#ef4444" stroke="white" strokeWidth="2"/>
            <circle cx="16" cy="16" r="4" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
      },
    })
    newMarkers.push(destMarker)

    // Current location marker (blue truck)
    if (liveLocation) {
      const currentMarker = new window.google.maps.Marker({
        position: { lat: liveLocation.lat, lng: liveLocation.lng },
        map: map,
        title: `Current Location: ${liveLocation.address}`,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" fill="#3b82f6" stroke="white" strokeWidth="3"/>
              <path d="M12 20h4v-4h8v8h-8v-4z" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
        },
      })
      newMarkers.push(currentMarker)
    }

    setMarkers(newMarkers)

    // Create route
    const directionsService = new window.google.maps.DirectionsService()
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#3b82f6",
        strokeWeight: 4,
        strokeOpacity: 0.8,
      },
    })

    directionsRenderer.setMap(map)

    directionsService.route(
      {
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result)
          setRoutePath(directionsRenderer)
        }
      },
    )

    // Fit bounds to show all markers
    const bounds = new window.google.maps.LatLngBounds()
    bounds.extend({ lat: origin.lat, lng: origin.lng })
    bounds.extend({ lat: destination.lat, lng: destination.lng })
    if (liveLocation) {
      bounds.extend({ lat: liveLocation.lat, lng: liveLocation.lng })
    }
    map.fitBounds(bounds)
  }, [isLoaded, origin, destination, liveLocation])

  // Simulate real-time location updates
  useEffect(() => {
    if (!isTracking || !liveLocation) return

    const interval = setInterval(() => {
      setLiveLocation((prev) => {
        if (!prev) return null

        // Simulate movement towards destination
        const newLat = prev.lat + (destination.lat - prev.lat) * 0.02
        const newLng = prev.lng + (destination.lng - prev.lng) * 0.02

        const newLocation = {
          ...prev,
          lat: newLat,
          lng: newLng,
          timestamp: new Date().toISOString(),
          speed: Math.random() * 60 + 20,
          heading: Math.random() * 360,
        }

        // Update marker position
        if (markers.length > 2 && mapInstanceRef.current) {
          markers[2].setPosition({ lat: newLat, lng: newLng })
        }

        return newLocation
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isTracking, liveLocation, destination, markers])

  const refreshLocation = () => {
    // Simulate getting fresh location data
    if (liveLocation) {
      setLiveLocation({
        ...liveLocation,
        timestamp: new Date().toISOString(),
        speed: Math.random() * 60 + 20,
      })
    }
  }

  const centerOnVehicle = () => {
    if (liveLocation && mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat: liveLocation.lat, lng: liveLocation.lng })
      mapInstanceRef.current.setZoom(12)
    }
  }

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
            <div className="flex items-center space-x-2">
              <Badge
                variant={status === "In Transit" ? "default" : "secondary"}
                className="flex items-center space-x-1"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{status}</span>
              </Badge>
              <Button variant="outline" size="sm" onClick={refreshLocation}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
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

      {/* Google Maps */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Live Route Map</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={centerOnVehicle}>
                <Truck className="h-4 w-4 mr-2" />
                Center on Vehicle
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div ref={mapRef} className="w-full h-96 rounded-lg border" style={{ minHeight: "400px" }} />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
          </div>

          {/* Map Legend */}
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Origin</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Current Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Destination</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
