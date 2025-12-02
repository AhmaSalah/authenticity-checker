# API Contract for Authenticity Checker

This document defines the interface between the Next.js Frontend and the Backend (Node.js, .NET, Python, etc.).

## Base URL
The frontend is configured to send requests to the URL defined in `NEXT_PUBLIC_API_URL`.

## Endpoints

### 1. Detect Content
**Endpoint:** `POST /detect` (or full path defined in env)
**Content-Type:** `application/json`

#### Request Body

**Scenario A: Text Analysis**
```json
{
  "type": "text",
  "content": "The text content to be analyzed..."
}
```

**Scenario B: File Analysis**
*Note: For files, the frontend currently sends a placeholder or base64. Adjust based on backend preference (Multipart/Form-Data is recommended for large files).*
```json
{
  "type": "file",
  "content": "base64_string_or_file_reference"
}
```

#### Response Body (Expected Format)
The backend **MUST** return JSON in this exact format:

```json
{
  "label": "AI", // or "Real"
  "confidence": 98.5, // Number between 0-100
  "model_hint": "GPT-4", // Optional: string or null
  "explanation": "The text exhibits low perplexity...", // Explanation string
  "analysis_details": {
    "text_signals": ["repetitive_structure"], // Optional array of strings
    "image_signals": [],
    "video_signals": []
  }
}
```

## TypeScript Definition
For reference, here is the TypeScript type used in the frontend:

```typescript
export type DetectionResult = {
  label: "AI" | "Real";
  confidence: number;
  model_hint: string | null;
  explanation: string;
  analysis_details: {
    text_signals?: string[];
    image_signals?: string[];
    video_signals?: string[];
  };
};
```
