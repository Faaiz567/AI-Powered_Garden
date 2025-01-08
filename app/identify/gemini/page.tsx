"use client";

import { useState, ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Camera, Upload, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface ImageState {
  file: File | null;
  preview: string | null;
}

interface PlantDetails {
  name: string;
  scientificName: string;
  description: string;
  details: {
    family: string;
    nativeRegion: string;
    growthHabit: string;
    flowerColor: string;
    leafType: string;
    soilType: string;
    waterNeeds: string;
    sunlightRequirements: string;
    temperatureTolerance: string;
    uses: string;
    toxicity: string;
  };
}

export default function GeminiIdentifier() {
  const [imageState, setImageState] = useState<ImageState>({
    file: null,
    preview: null
  });
  const [result, setResult] = useState<PlantDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const extractJSONFromText = (text: string): string => {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}') + 1;
    if (start === -1 || end === 0) {
      throw new Error('No valid JSON found in response');
    }
    return text.slice(start, end);
  };

  const processImage = async (file: File) => {
    setImageState({
      file,
      preview: URL.createObjectURL(file)
    });
    setResult(null);
    setError(null);

    try {
      setLoading(true);

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is not set');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = async () => {
        try {
          if (typeof fileReader.result !== 'string') {
            throw new Error('Failed to read image file');
          }

          const imageData = fileReader.result.split(',')[1];

          const response = await model.generateContent([
            "Analyze this plant image and provide ONLY a JSON response in exactly this format without any additional text or code blocks:\n" +
            "{\n" +
            '  "name": "Common Name",\n' +
            '  "scientificName": "Scientific Name",\n' +
            '  "description": "Brief description of the plant",\n' +
            '  "details": {\n' +
            '    "family": "Plant Family",\n' +
            '    "nativeRegion": "Native Region",\n' +
            '    "growthHabit": "Growth Habit",\n' +
            '    "flowerColor": "Flower Color",\n' +
            '    "leafType": "Leaf Type",\n' +
            '    "soilType": "Soil Type",\n' +
            '    "waterNeeds": "Water Needs",\n' +
            '    "sunlightRequirements": "Sunlight Requirements",\n' +
            '    "temperatureTolerance": "Temperature Tolerance",\n' +
            '    "uses": "Common Uses",\n' +
            '    "toxicity": "Toxicity Details"\n' +
            "  }\n" +
            "}",
            {
              inlineData: {
                data: imageData,
                mimeType: "image/jpeg"
              }
            }
          ]);

          const text = response.response.text();
          const jsonString = extractJSONFromText(text);
          const plantData: PlantDetails = JSON.parse(jsonString);
          setResult(plantData);
        } catch (err) {
          console.error('Error processing response:', err);
          setError(err instanceof Error ? err.message : 'An error occurred during plant identification');
        } finally {
          setLoading(false);
        }
      };
    } catch (err) {
      console.error('Error in main process:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const resetState = () => {
    setImageState({ file: null, preview: null });
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/identify" className="flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Identifier Selection
          </Link>
          <Badge variant="secondary" className="text-xs">Powered by AI</Badge>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-green-800">Plant Identifier (AI)</CardTitle>
            <CardDescription>Upload or take a photo of a plant to identify it using advanced AI technology</CardDescription>
          </CardHeader>
          <CardContent>
            {!imageState.preview ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  variant="outline"
                  className="h-32 flex flex-col items-center justify-center"
                >
                  <Camera className="h-8 w-8 mb-2" />
                  <span>Take a Photo</span>
                </Button>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="h-32 flex flex-col items-center justify-center"
                >
                  <Upload className="h-8 w-8 mb-2" />
                  <span>Upload Photo</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative w-full h-64 md:h-96">
                  <Image
                    src={imageState.preview}
                    alt="Plant preview"
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
                {loading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600 mr-2" />
                    <span className="text-green-600 font-medium">Identifying your plant...</span>
                  </div>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
          </CardContent>
          {(error || result) && (
            <CardFooter>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {result && (
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-green-700 mb-2">{result.name}</h2>
                  <p className="text-gray-600 italic mb-4">{result.scientificName}</p>
                  <p className="text-gray-700 mb-6">{result.description}</p>
                  <h3 className="text-xl font-semibold text-green-600 mb-4">Plant Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(result.details).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-2">
                        <span className="text-gray-600 capitalize font-medium block">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardFooter>
          )}
        </Card>
        {(result || error) && (
          <div className="text-center mt-4">
            <Button onClick={resetState} variant="outline">
              Identify Another Plant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
