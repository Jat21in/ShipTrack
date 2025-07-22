"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Bell, Package, Truck, AlertTriangle, X, Settings, Volume2, VolumeX } from "lucide-react"

interface Notification {
  id: string
  type: "shipment" | "delivery" | "alert" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
  shipmentId?: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const { toast } = useToast()

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const notificationTypes = [
        {
          type: "shipment" as const,
          title: "New Shipment Created",
          message: "Shipment SP123456 has been created and is awaiting pickup",
          priority: "medium" as const,
        },
        {
          type: "delivery" as const,
          title: "Package Delivered",
          message: "Package SP123455 has been successfully delivered to Jane Doe",
          priority: "high" as const,
        },
        {
          type: "alert" as const,
          title: "Delivery Delayed",
          message: "Shipment SP123454 is delayed due to weather conditions",
          priority: "high" as const,
        },
        {
          type: "system" as const,
          title: "System Update",
          message: "New tracking features are now available in your dashboard",
          priority: "low" as const,
        },
      ]

      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
      const newNotification: Notification = {
        id: Date.now().toString(),
        ...randomNotification,
        timestamp: new Date(),
        read: false,
        shipmentId:
          randomNotification.type === "shipment" || randomNotification.type === "delivery"
            ? `SP${Math.floor(Math.random() * 999999)}`
            : undefined,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 19)]) // Keep only 20 notifications

      // Show toast notification
      if (soundEnabled) {
        toast({
          title: newNotification.title,
          description: newNotification.message,
          duration: 5000,
        })
      }

      // Play notification sound (in a real app, you'd use Web Audio API)
      if (soundEnabled && typeof window !== "undefined") {
        // Simulate notification sound
        console.log("🔔 Notification sound played")
      }
    }, 15000) // New notification every 15 seconds

    return () => clearInterval(interval)
  }, [soundEnabled, toast])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "shipment":
        return <Package className="h-4 w-4" />
      case "delivery":
        return <Truck className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-600 bg-red-100"
    if (type === "delivery") return "text-green-600 bg-green-100"
    if (type === "shipment") return "text-blue-600 bg-blue-100"
    if (type === "alert") return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button variant="ghost" size="sm" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.div>
        )}
      </Button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-blue-600 hover:text-blue-700"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="p-2">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                        notification.read ? "bg-gray-50" : "bg-blue-50 border border-blue-200"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-1 rounded-full ${getNotificationColor(notification.type, notification.priority)}`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                            <div className="flex items-center space-x-2">
                              {notification.priority === "high" && (
                                <Badge variant="destructive" className="text-xs">
                                  High
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500">{notification.timestamp.toLocaleTimeString()}</p>
                            {notification.shipmentId && (
                              <Badge variant="outline" className="text-xs">
                                {notification.shipmentId}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
