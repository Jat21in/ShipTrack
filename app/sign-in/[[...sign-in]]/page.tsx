"use client"

import { SignIn } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Truck } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto p-3 bg-blue-100 rounded-full w-fit mb-4"
          >
            <Truck className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your ShipTrack account</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-2xl border-0 bg-white/80 backdrop-blur-sm",
                headerTitle: "text-2xl font-bold text-gray-900",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
                socialButtonsBlockButtonText: "font-medium",
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors",
                formFieldInput:
                  "border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                formFieldLabel: "text-sm font-medium text-gray-700",
                footerActionLink: "text-blue-600 hover:text-blue-700 font-medium",
              },
              layout: {
                socialButtonsPlacement: "top",
              },
            }}
            redirectUrl="/dashboard"
            signUpUrl="/sign-up"
          />
        </motion.div>
      </div>
    </div>
  )
}
