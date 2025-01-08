import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Sparkles } from 'lucide-react'

export default function IdentifyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Identification Method</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              AI Plant Doctor
            </CardTitle>
            <CardDescription>
            Check your plant’s health with our AI-powered Plant Doctor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                Quick and accurate disease diagnosis
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                Extensive disease database
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                Effective treatment advice
              </li>
            </ul>
            <Link href="/identify/digno">
              <Button className="w-full">Use Plant Doctor</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-green-600" />
              AI Plant Identifier
            </CardTitle>
            <CardDescription>
              Identify your plant type with our AI-powered Plant Identifier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                Advanced AI analysis
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                Detailed plant characteristics
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                Care recommendations
              </li>
            </ul>
            <Link href="/identify/gemini">
              <Button className="w-full">Use Plant Identifier</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

