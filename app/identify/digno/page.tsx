'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, Upload, Leaf, Loader2, XCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Types for better type safety
type DiagnosisResult = {
  plantName: string;
  scientificName?: string;
  family?: string;
  origin?: string;
  disease?: string;
  diseaseSeverity?: string;
  treatmentOptions?: string;
  preventionMeasures?: string;
  description: string;
};

export default function EnhancedPlantDiagnosis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Image validation function
  const validateImage = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPEG or PNG.');
      return false;
    }

    if (file.size > maxSize) {
      setError('Image is too large. Maximum file size is 5MB.');
      return false;
    }

    return true;
  };

  // Convert image to base64 for better compatibility
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!validateImage(file)) return;

      try {
        const base64Image = await convertToBase64(file);
        setSelectedImage(base64Image);
        await analyzePlant(base64Image);
      } catch (error: unknown) {
        console.error('Image processing error:', error);
        setError('Failed to process image. Please try again.');
      }
    }
  };

  const analyzePlant = async (base64Image: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('API Key is missing. Check your .env.local file.');
      }
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: 'Analyze this plant image and provide a detailed report including: 1) Plant Name, 2) Scientific Name, 3) Family, 4) Origin, 5) Potential Diseases (if any), 6) Disease Severity, 7) Treatment Options, 8) Prevention Measures, 9) Brief Plant Description. Limit each section to 1-2 sentences.' },
                { inlineData: { 
                  mimeType: 'image/jpeg', 
                  data: base64Data 
                }}
              ]
            }]
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText || 'Unknown error occurred'}`);
      }

      const data = await response.json();

      const plantInfo = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      const parseResponse = (text: string): DiagnosisResult => {
        const result: DiagnosisResult = {
          plantName: 'Unknown Plant',
          description: ''
        };

        const fields = [
          { key: 'plantName', regex: /(?:Plant Name|Name):\s*(.+?)[\n.]/i },
          { key: 'scientificName', regex: /(?:Scientific Name|Latin Name):\s*(.+?)[\n.]/i },
          { key: 'family', regex: /Family:\s*(.+?)[\n.]/i },
          { key: 'origin', regex: /Origin:\s*(.+?)[\n.]/i },
          { key: 'disease', regex: /(?:Potential Diseases|Diseases?):\s*(.+?)[\n.]/i },
          { key: 'diseaseSeverity', regex: /Disease Severity:\s*(.+?)[\n.]/i },
          { key: 'treatmentOptions', regex: /Treatment Options:\s*(.+?)[\n.]/i },
          { key: 'preventionMeasures', regex: /Prevention Measures:\s*(.+?)[\n.]/i },
          { key: 'description', regex: /(?:Brief Plant Description|Description):\s*(.+?)(?:\n|$)/i },
        ];

        fields.forEach(({ key, regex }) => {
          const match = text.match(regex);
          if (match) {
            result[key as keyof DiagnosisResult] = match[1].trim();
          }
        });

        return result;
      };

      const diagnosis = parseResponse(plantInfo);
      setDiagnosis(diagnosis);

    } catch (error: unknown) {
      console.error('Diagnosis Error:', error);
      
      setError(
        error instanceof Error && error.message.includes('Failed to fetch')
          ? 'Network error. Check your internet connection.'
          : `Analysis failed: ${String(error)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setDiagnosis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Leaf className="w-10 h-10 text-white/90 animate-bounce" />
            <CardTitle className="text-3xl font-bold text-white">Plant Doctor</CardTitle>
          </div>
          <CardDescription className="text-white/80">
            Diagnose your plant&apos;s health instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-100 p-4 rounded-lg flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <span>{error}</span>
            </div>
          )}

          {!selectedImage && !diagnosis && !isLoading && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png"
                onChange={handleImageCapture}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-3 py-3 bg-emerald-500 hover:bg-emerald-600 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Upload Image
              </Button>

              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gray-300 flex-grow"></div>
                <span className="text-gray-500">or</span>
                <div className="h-px bg-gray-300 flex-grow"></div>
              </div>

              <input
                type="file"
                ref={cameraInputRef}
                className="hidden"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
              />
              <Button
                onClick={() => cameraInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-3 py-3 bg-teal-500 hover:bg-teal-600 transition-colors"
              >
                <Camera className="w-5 h-5" />
                Take Photo
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto" />
              <p className="text-emerald-500 font-medium mt-2">Analyzing image...</p>
            </div>
          )}

          {selectedImage && !diagnosis && !isLoading && (
            <div className="relative">
              <Image
                src={selectedImage}
                alt="Uploaded Plant"
                width={400}
                height={400}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <Button
                onClick={resetAnalysis}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                size="icon"
              >
                <XCircle className="w-6 h-6 text-red-500" />
              </Button>
            </div>
          )}

          {diagnosis && (
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={selectedImage!}
                  alt="Diagnosed Plant"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <Button
                  onClick={resetAnalysis}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                  size="icon"
                >
                  <XCircle className="w-6 h-6 text-red-500" />
                </Button>
              </div>

              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3">Attribute</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Plant Name</TableCell>
                      <TableCell>{diagnosis.plantName}</TableCell>
                    </TableRow>
                    {diagnosis.scientificName && (
                      <TableRow>
                        <TableCell className="font-medium">Scientific Name</TableCell>
                        <TableCell>{diagnosis.scientificName}</TableCell>
                      </TableRow>
                    )}
                    {diagnosis.family && (
                      <TableRow>
                        <TableCell className="font-medium">Family</TableCell>
                        <TableCell>{diagnosis.family}</TableCell>
                      </TableRow>
                    )}
                    {diagnosis.origin && (
                      <TableRow>
                        <TableCell className="font-medium">Origin</TableCell>
                        <TableCell>{diagnosis.origin}</TableCell>
                      </TableRow>
                    )}
                    {diagnosis.disease && (
                      <TableRow>
                        <TableCell className="font-medium text-red-600 dark:text-red-400">Disease</TableCell>
                        <TableCell>{diagnosis.disease}</TableCell>
                      </TableRow>
                    )}
                    {diagnosis.diseaseSeverity && (
                      <TableRow>
                        <TableCell className="font-medium">Disease Severity</TableCell>
                        <TableCell>{diagnosis.diseaseSeverity}</TableCell>
                      </TableRow>
                    )}
                    {diagnosis.treatmentOptions && (
                      <TableRow>
                        <TableCell className="font-medium">Treatment Options</TableCell>
                        <TableCell>{diagnosis.treatmentOptions}</TableCell>
                      </TableRow>
                    )}
                    {diagnosis.preventionMeasures && (
                      <TableRow>
                        <TableCell className="font-medium">Prevention Measures</TableCell>
                        <TableCell>{diagnosis.preventionMeasures}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {diagnosis.description && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Plant Description</h3>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{diagnosis.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

