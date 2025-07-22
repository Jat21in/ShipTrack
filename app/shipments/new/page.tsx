"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Package, User, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const steps = [
  { id: 1, title: "Sender Info", icon: User },
  { id: 2, title: "Receiver Info", icon: User },
  { id: 3, title: "Package Details", icon: Package },
  { id: 4, title: "Pickup & Delivery", icon: MapPin },
  { id: 5, title: "Review & Confirm", icon: CheckCircle },
]

export default function NewShipmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Sender Info
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderZip: "",

    // Receiver Info
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverZip: "",

    // Package Details
    packageType: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    value: "",
    description: "",

    // Pickup & Delivery
    pickupDate: "",
    pickupTime: "",
    deliveryType: "",
    specialInstructions: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Shipment created:", formData)
    // Handle form submission
  }

  const progress = (currentStep / steps.length) * 100

  const StepIcon = steps[currentStep - 1].icon
  const StepTitle = steps[currentStep - 1].title

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/shipments">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Create New Shipment</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <motion.div className="mb-8" {...fadeInUp}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 mb-6" />

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`p-2 rounded-full ${
                    currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <span className={`text-xs mt-2 ${currentStep >= step.id ? "text-blue-600" : "text-gray-400"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Steps */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <StepIcon className="h-5 w-5" />
                <span>{StepTitle}</span>
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Enter the sender's information"}
                {currentStep === 2 && "Enter the receiver's information"}
                {currentStep === 3 && "Provide package details and specifications"}
                {currentStep === 4 && "Set pickup and delivery preferences"}
                {currentStep === 5 && "Review all information before submitting"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Sender Info */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Full Name *</Label>
                    <Input
                      id="senderName"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleInputChange}
                      placeholder="Enter sender's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Email Address *</Label>
                    <Input
                      id="senderEmail"
                      name="senderEmail"
                      type="email"
                      value={formData.senderEmail}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderPhone">Phone Number *</Label>
                    <Input
                      id="senderPhone"
                      name="senderPhone"
                      type="tel"
                      value={formData.senderPhone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="senderAddress">Street Address *</Label>
                    <Input
                      id="senderAddress"
                      name="senderAddress"
                      value={formData.senderAddress}
                      onChange={handleInputChange}
                      placeholder="Enter street address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderCity">City *</Label>
                    <Input
                      id="senderCity"
                      name="senderCity"
                      value={formData.senderCity}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderState">State *</Label>
                    <Input
                      id="senderState"
                      name="senderState"
                      value={formData.senderState}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderZip">ZIP Code *</Label>
                    <Input
                      id="senderZip"
                      name="senderZip"
                      value={formData.senderZip}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Receiver Info */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="receiverName">Full Name *</Label>
                    <Input
                      id="receiverName"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleInputChange}
                      placeholder="Enter receiver's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiverEmail">Email Address *</Label>
                    <Input
                      id="receiverEmail"
                      name="receiverEmail"
                      type="email"
                      value={formData.receiverEmail}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiverPhone">Phone Number *</Label>
                    <Input
                      id="receiverPhone"
                      name="receiverPhone"
                      type="tel"
                      value={formData.receiverPhone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="receiverAddress">Street Address *</Label>
                    <Input
                      id="receiverAddress"
                      name="receiverAddress"
                      value={formData.receiverAddress}
                      onChange={handleInputChange}
                      placeholder="Enter street address"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiverCity">City *</Label>
                    <Input
                      id="receiverCity"
                      name="receiverCity"
                      value={formData.receiverCity}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiverState">State *</Label>
                    <Input
                      id="receiverState"
                      name="receiverState"
                      value={formData.receiverState}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiverZip">ZIP Code *</Label>
                    <Input
                      id="receiverZip"
                      name="receiverZip"
                      value={formData.receiverZip}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Package Details */}
              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="packageType">Package Type *</Label>
                    <Select
                      value={formData.packageType}
                      onValueChange={(value) => handleSelectChange("packageType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select package type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="envelope">Envelope</SelectItem>
                        <SelectItem value="small-box">Small Box</SelectItem>
                        <SelectItem value="medium-box">Medium Box</SelectItem>
                        <SelectItem value="large-box">Large Box</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs) *</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="Enter weight"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="length">Length (inches)</Label>
                    <Input
                      id="length"
                      name="length"
                      type="number"
                      value={formData.length}
                      onChange={handleInputChange}
                      placeholder="Enter length"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (inches)</Label>
                    <Input
                      id="width"
                      name="width"
                      type="number"
                      value={formData.width}
                      onChange={handleInputChange}
                      placeholder="Enter width"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (inches)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="Enter height"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Declared Value ($)</Label>
                    <Input
                      id="value"
                      name="value"
                      type="number"
                      step="0.01"
                      value={formData.value}
                      onChange={handleInputChange}
                      placeholder="Enter package value"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Package Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the contents of your package"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Pickup & Delivery */}
              {currentStep === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">Pickup Date *</Label>
                    <Input
                      id="pickupDate"
                      name="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Pickup Time *</Label>
                    <Select
                      value={formData.pickupTime}
                      onValueChange={(value) => handleSelectChange("pickupTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                        <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="deliveryType">Delivery Type *</Label>
                    <Select
                      value={formData.deliveryType}
                      onValueChange={(value) => handleSelectChange("deliveryType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (3-5 business days)</SelectItem>
                        <SelectItem value="express">Express (1-2 business days)</SelectItem>
                        <SelectItem value="overnight">Overnight</SelectItem>
                        <SelectItem value="same-day">Same Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      placeholder="Any special handling instructions or delivery notes"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Review & Confirm */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sender Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Sender Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>
                          <strong>Name:</strong> {formData.senderName}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.senderEmail}
                        </p>
                        <p>
                          <strong>Phone:</strong> {formData.senderPhone}
                        </p>
                        <p>
                          <strong>Address:</strong> {formData.senderAddress}
                        </p>
                        <p>
                          {formData.senderCity}, {formData.senderState} {formData.senderZip}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Receiver Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Receiver Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>
                          <strong>Name:</strong> {formData.receiverName}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.receiverEmail}
                        </p>
                        <p>
                          <strong>Phone:</strong> {formData.receiverPhone}
                        </p>
                        <p>
                          <strong>Address:</strong> {formData.receiverAddress}
                        </p>
                        <p>
                          {formData.receiverCity}, {formData.receiverState} {formData.receiverZip}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Package Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Package Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>
                          <strong>Type:</strong> {formData.packageType}
                        </p>
                        <p>
                          <strong>Weight:</strong> {formData.weight} lbs
                        </p>
                        {formData.length && (
                          <p>
                            <strong>Dimensions:</strong> {formData.length}" x {formData.width}" x {formData.height}"
                          </p>
                        )}
                        {formData.value && (
                          <p>
                            <strong>Value:</strong> ${formData.value}
                          </p>
                        )}
                        {formData.description && (
                          <p>
                            <strong>Description:</strong> {formData.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Delivery Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Delivery Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>
                          <strong>Pickup Date:</strong> {formData.pickupDate}
                        </p>
                        <p>
                          <strong>Pickup Time:</strong> {formData.pickupTime}
                        </p>
                        <p>
                          <strong>Delivery Type:</strong> {formData.deliveryType}
                        </p>
                        {formData.specialInstructions && (
                          <p>
                            <strong>Special Instructions:</strong> {formData.specialInstructions}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Estimated Cost */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-blue-900">Estimated Cost</h3>
                          <p className="text-blue-700">Based on package details and delivery type</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-900">$24.99</p>
                          <p className="text-sm text-blue-700">+ taxes and fees</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Create Shipment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
