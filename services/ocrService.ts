import { mockOcrResults } from "@/mockData/ocr";

// This is a placeholder service for future OCR API integration
// In a real app, this would connect to an OCR API like Google Cloud Vision or Tesseract

export interface OcrTextBlock {
  text: string;
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface OcrResult {
  blocks: OcrTextBlock[];
  fullText: string;
}

export const extractTextFromImage = async (imageUri: string): Promise<OcrResult> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, we would send the image to an OCR API
      // For now, we'll return mock data
      
      // Get a random mock result
      const mockResult = mockOcrResults[Math.floor(Math.random() * mockOcrResults.length)];
      
      resolve(mockResult);
    }, 1500); // Simulate network delay
  });
};