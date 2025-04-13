import { OcrResult } from "@/services/ocrService";

// Mock OCR results for testing
// In a real app, these would come from an OCR API

export const mockOcrResults: OcrResult[] = [
    {
        blocks: [
            {
                text: "apple banana orange",
                confidence: 0.95,
                boundingBox: { x: 10, y: 10, width: 200, height: 30 },
            },
            {
                text: "grape watermelon",
                confidence: 0.92,
                boundingBox: { x: 10, y: 50, width: 180, height: 30 },
            },
            {
                text: "strawberry blueberry",
                confidence: 0.88,
                boundingBox: { x: 10, y: 90, width: 190, height: 30 },
            },
        ],
        fullText: "apple banana orange\ngrape watermelon\nstrawberry blueberry",
    },
    {
        blocks: [
            {
                text: "cat dog bird",
                confidence: 0.94,
                boundingBox: { x: 10, y: 10, width: 150, height: 30 },
            },
            {
                text: "fish hamster rabbit",
                confidence: 0.91,
                boundingBox: { x: 10, y: 50, width: 200, height: 30 },
            },
            {
                text: "turtle snake lizard",
                confidence: 0.87,
                boundingBox: { x: 10, y: 90, width: 190, height: 30 },
            },
        ],
        fullText: "cat dog bird\nfish hamster rabbit\nturtle snake lizard",
    },
    {
        blocks: [
            {
                text: "house apartment building",
                confidence: 0.93,
                boundingBox: { x: 10, y: 10, width: 250, height: 30 },
            },
            {
                text: "mansion cottage cabin",
                confidence: 0.9,
                boundingBox: { x: 10, y: 50, width: 230, height: 30 },
            },
            {
                text: "villa bungalow",
                confidence: 0.89,
                boundingBox: { x: 10, y: 90, width: 150, height: 30 },
            },
        ],
        fullText:
            "house apartment building\nmansion cottage cabin\nvilla bungalow",
    },
    {
        blocks: [
            {
                text: "red blue green",
                confidence: 0.96,
                boundingBox: { x: 10, y: 10, width: 150, height: 30 },
            },
            {
                text: "yellow purple orange",
                confidence: 0.93,
                boundingBox: { x: 10, y: 50, width: 220, height: 30 },
            },
            {
                text: "black white gray",
                confidence: 0.94,
                boundingBox: { x: 10, y: 90, width: 180, height: 30 },
            },
        ],
        fullText: "red blue green\nyellow purple orange\nblack white gray",
    },
    {
        blocks: [
            {
                text: "Monday Tuesday Wednesday",
                confidence: 0.95,
                boundingBox: { x: 10, y: 10, width: 280, height: 30 },
            },
            {
                text: "Thursday Friday",
                confidence: 0.94,
                boundingBox: { x: 10, y: 50, width: 180, height: 30 },
            },
            {
                text: "Saturday Sunday",
                confidence: 0.96,
                boundingBox: { x: 10, y: 90, width: 170, height: 30 },
            },
        ],
        fullText: "Monday Tuesday Wednesday\nThursday Friday\nSaturday Sunday",
    },
];
