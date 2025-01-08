import { Leaf, Shield, Sparkles, Sprout } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          About AI-Powered Graden
        </h1>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-xl text-muted-foreground text-center mb-12">
            The Plant Doctor is your ultimate companion for understanding and
            caring for plants. With this tool, you can simply upload or take a
            picture of any plant to instantly identify it and gain detailed
            information about its species, care requirements, and
            characteristics.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <Sparkles className="w-10 h-10 text-green-600 mb-2" />
              <CardTitle>AI-Powered Analysis</CardTitle>
              <CardDescription>
                Utilizing AI for accurate plant identification
                and disease diagnosis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 text-green-600 mb-2" />
              <CardTitle>Privacy First</CardTitle>
              <CardDescription>
                Your plant images are processed securely and never stored
                without permission
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Leaf className="w-10 h-10 text-green-600 mb-2" />
              <CardTitle>Comprehensive Results</CardTitle>
              <CardDescription>
                Get detailed information about plant species, diseases, and
                treatment recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Sprout className="w-10 h-10 text-green-600 mb-2" />
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                Simply upload a photo or take a picture to get instant plant
                health analysis
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            We're dedicated to making plant care accessible to everyone. By
            combining cutting-edge AI technology with user-friendly design, we
            help plant lovers identify and treat plant diseases quickly and
            effectively. Our goal is to promote plant health and support
            sustainable gardening practices worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}
