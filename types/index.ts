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

export type HistoryItem = DetectionResult & {
    id: string;
    timestamp: number;
    type: "text" | "image" | "video";
    preview: string; // Text snippet or image/video thumbnail URL
};
