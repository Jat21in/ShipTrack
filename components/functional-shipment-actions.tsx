"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit, Trash2, MapPin, Phone, MessageSquare, Package, Clock, User, Navigation } from "lucide-react"

interface Shipment {
  id: string
  from: string
  to: string
  status: string
  progress: number
  eta: string
  recipient: string
  value: string
  priority: string
  lastUpdate: string
  phone?: string
  email?: string
  description?: string
  weight?: string
  dimensions?: string
}

interface FunctionalShipmentActionsProps {
  shipment: Shipment
  onUpdate: (shipmentId: string, updates: Partial<Shipment>) => void
  onDelete: (shipmentId: string) => void
}

export function FunctionalShipmentActions({ shipment, onUpdate, onDelete }: FunctionalShipmentActionsProps) {
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editData, setEditData] = useState<Partial<Shipment>>(shipment)
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleViewDetails = () => {
    setIsViewOpen(true)
    toast({
      title: "Shipment Details",
      description: `Viewing details for ${shipment.id}`,
    })
  }

  const handleEdit = () => {
    setEditData(shipment)
    setIsEditOpen(true)
  }

  const handleSaveEdit = async () => {
    setIsUpdating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onUpdate(shipment.id, editData)
    setIsEditOpen(false)
    setIsUpdating(false)

    toast({
      title: "Shipment Updated",
      description: `${shipment.id} has been successfully updated.`,
    })
  }

  const handleDelete = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onDelete(shipment.id)

    toast({
      title: "Shipment Cancelled",
      description: `${shipment.id} has been cancelled and removed.`,
      variant: "destructive",
    })
  }

  const handleTrackLive = () => {
    toast({
      title: "Live Tracking",
      description: `Opening live tracking for ${shipment.id}`,
    })
    // In a real app, this would navigate to the tracking page
    window.open(`/track?id=${shipment.id}`, "_blank")
  }

  const handleCall = () => {
    if (shipment.phone) {
      window.open(`tel:${shipment.phone}`)
      toast({
        title: "Calling Recipient",
        description: `Calling ${shipment.recipient} at ${shipment.phone}`,
      })
    } else {
      toast({
        title: "No Phone Number",
        description: "Phone number not available for this shipment.",
        variant: "destructive",
      })
    }
  }

  const handleMessage = () => {
    if (shipment.phone) {
      window.open(`sms:${shipment.phone}`)
      toast({
        title: "Sending Message",
        description: `Opening SMS to ${shipment.recipient}`,
      })
    } else {
      toast({
        title: "No Phone Number",
        description: "Phone number not available for messaging.",
        variant: "destructive",
      })
    }
  }

  const handleNavigate = () => {
    const destination = encodeURIComponent(shipment.to)
    window.open(`https://maps.google.com/maps?daddr=${destination}`, "_blank")
    toast({
      title: "Navigation Started",
      description: `Opening directions to ${shipment.to}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in transit":
        return "bg-blue-100 text-blue-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Quick Actions */}
      <Button variant="outline" size="sm" onClick={handleCall}>
        <Phone className="h-3 w-3" />
      </Button>

      <Button variant="outline" size="sm" onClick={handleMessage}>
        <MessageSquare className="h-3 w-3" />
      </Button>

      <Button variant="outline" size="sm" onClick={handleNavigate}>
        <Navigation className="h-3 w-3" />
      </Button>

      {/* View Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Shipment Details - {shipment.id}</span>
            </DialogTitle>
            <DialogDescription>Complete information about this shipment</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Status</Label>
                <Badge className={`mt-1 ${getStatusColor(shipment.status)}`}>{shipment.status}</Badge>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Route</Label>
                <p className="text-sm text-gray-900 mt-1">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  {shipment.from} → {shipment.to}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Recipient</Label>
                <p className="text-sm text-gray-900 mt-1">
                  <User className="h-3 w-3 inline mr-1" />
                  {shipment.recipient}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Value</Label>
                <p className="text-sm text-gray-900 mt-1">{shipment.value}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Progress</Label>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion</span>
                    <span>{shipment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${shipment.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">ETA</Label>
                <p className="text-sm text-gray-900 mt-1">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {shipment.eta}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Priority</Label>
                <Badge variant={shipment.priority === "high" ? "destructive" : "outline"} className="mt-1">
                  {shipment.priority}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Last Update</Label>
                <p className="text-sm text-gray-900 mt-1">{shipment.lastUpdate}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={handleTrackLive}>
              <MapPin className="h-4 w-4 mr-2" />
              Track Live
            </Button>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Shipment - {shipment.id}</DialogTitle>
            <DialogDescription>Update shipment information and delivery details</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient">Recipient Name</Label>
                <Input
                  id="recipient"
                  value={editData.recipient || ""}
                  onChange={(e) => setEditData({ ...editData, recipient: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={editData.phone || ""}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={editData.status} onValueChange={(value) => setEditData({ ...editData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Picked Up">Picked Up</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={editData.priority}
                  onValueChange={(value) => setEditData({ ...editData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="value">Package Value</Label>
                <Input
                  id="value"
                  value={editData.value || ""}
                  onChange={(e) => setEditData({ ...editData, value: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="eta">Estimated Delivery</Label>
                <Input
                  id="eta"
                  value={editData.eta || ""}
                  onChange={(e) => setEditData({ ...editData, eta: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Special Instructions</Label>
            <Textarea
              id="description"
              value={editData.description || ""}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              placeholder="Add any special delivery instructions..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
            <Trash2 className="h-3 w-3 mr-1" />
            Cancel
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Shipment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel shipment {shipment.id}? This action cannot be undone. The recipient will
              be notified of the cancellation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Shipment</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Cancel Shipment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
