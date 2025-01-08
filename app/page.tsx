import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Sprout, Leaf, Heart } from 'lucide-react'
import { EnvCheck } from "./components/env-check"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl" >
                Your Personal AI-Powered Garden
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                
AI-Powered Garden uses advanced technology to help you care for your plants efficiently. With intelligent analysis, it offers personalized recommendations for optimal plant health.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/identify">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Identification
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
              <EnvCheck />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2">Upload Photo</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Take a clear photo of the affected plant part and upload it
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Sprout className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2">Get Diagnosis</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI analyzes the image and identifies the disease
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-bold mb-2">Treatment Plan</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive detailed treatment recommendations and care instructions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Advanced Plant Disease Detection</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Our AI-powered system can identify hundreds of plant diseases with high accuracy.
                Get instant results and start treating your plants before it's too late.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  <span>Instant disease identification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  <span>Detailed treatment recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  <span>Prevention tips and best practices</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/plants.jpg "
                alt="Plant disease detection demonstration"
                fill
                className="object-fill"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-t from-lightGreen to-oliveGreen text-zinc-400">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for AI-Powered Gardening?</h2>
          <p className="mb-8 text-green-300">
          Ready to transform your space into a beautiful and healthy garden with the help of AI? Let’s make it happen!
          </p>
        </div>
      </section>
    </div>
  )
}

