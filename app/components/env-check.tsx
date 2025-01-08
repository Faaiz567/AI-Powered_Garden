"use client"

import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function EnvCheck() {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Missing API Key</AlertTitle>
        <AlertDescription>
          Please set the NEXT_API_KEY environment variable to use the plant identification feature.
        </AlertDescription>
      </Alert>
    )
  }
  return null
}

