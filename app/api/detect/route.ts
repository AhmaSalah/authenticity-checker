import { NextResponse } from "next/server";
import { DetectionResult } from "@/types";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, content } = body;

        // Validate input
        if (!type || !content) {
            return NextResponse.json(
                { error: "Missing required fields: type and content" },
                { status: 400 }
            );
        }

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const isAI = Math.random() > 0.5;
        const confidence = 70 + Math.random() * 29; // 70-99%

        const result: DetectionResult = {
            label: isAI ? "AI" : "Real",
            confidence: parseFloat(confidence.toFixed(1)),
            model_hint: isAI ? "GPT-4" : null,
            explanation: isAI
                ? "The content exhibits high perplexity and consistent sentence structures typical of AI models."
                : "The content shows natural variation and human-like irregularities.",
            analysis_details: {
                text_signals: isAI ? ["low_perplexity", "repetitive_structure"] : [],
                image_signals: [],
                video_signals: [],
            },
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error in detect route:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
