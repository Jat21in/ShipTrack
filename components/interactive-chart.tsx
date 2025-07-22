"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChartData {
  date: string
  shipments: number
  revenue: number
  deliveryTime: number
}

interface InteractiveChartProps {
  data: ChartData[]
  title: string
  type: "shipments" | "revenue" | "deliveryTime"
}

export function InteractiveChart({ data, title, type }: InteractiveChartProps) {
  const [selectedMetric, setSelectedMetric] = useState(type)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getMaxValue = () => {
    switch (selectedMetric) {
      case "shipments":
        return Math.max(...data.map((d) => d.shipments))
      case "revenue":
        return Math.max(...data.map((d) => d.revenue))
      case "deliveryTime":
        return Math.max(...data.map((d) => d.deliveryTime))
      default:
        return 100
    }
  }

  const getValue = (item: ChartData) => {
    switch (selectedMetric) {
      case "shipments":
        return item.shipments
      case "revenue":
        return item.revenue
      case "deliveryTime":
        return item.deliveryTime
      default:
        return 0
    }
  }

  const formatValue = (value: number) => {
    switch (selectedMetric) {
      case "revenue":
        return `$${value.toLocaleString()}`
      case "deliveryTime":
        return `${value.toFixed(1)} days`
      default:
        return value.toString()
    }
  }

  const maxValue = getMaxValue()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shipments">Shipments</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="deliveryTime">Delivery Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          <div className="flex items-end justify-between h-full space-x-1">
            {data.map((item, index) => {
              const value = getValue(item)
              const height = (value / maxValue) * 100

              return (
                <motion.div
                  key={index}
                  className="flex-1 relative cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className={`w-full rounded-t ${
                      selectedMetric === "shipments"
                        ? "bg-blue-500"
                        : selectedMetric === "revenue"
                          ? "bg-green-500"
                          : "bg-purple-500"
                    } ${hoveredIndex === index ? "opacity-80" : "opacity-60"}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  />

                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10"
                    >
                      <div className="text-center">
                        <div>{new Date(item.date).toLocaleDateString()}</div>
                        <div className="font-bold">{formatValue(value)}</div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-12">
            <span>{formatValue(maxValue)}</span>
            <span>{formatValue(maxValue * 0.75)}</span>
            <span>{formatValue(maxValue * 0.5)}</span>
            <span>{formatValue(maxValue * 0.25)}</span>
            <span>0</span>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <span>{new Date(data[0]?.date).toLocaleDateString()}</span>
          <span>{new Date(data[Math.floor(data.length / 2)]?.date).toLocaleDateString()}</span>
          <span>{new Date(data[data.length - 1]?.date).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
