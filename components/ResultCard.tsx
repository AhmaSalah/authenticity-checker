import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ConfidenceMeter } from "@/components/ConfidenceMeter"
import { DetectionResult } from "@/types"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Bot } from "lucide-react"

interface ResultCardProps {
    result: DetectionResult
    className?: string
}

import { Button } from "@/components/ui/button"
import { Share2, Eye, EyeOff, Copy } from "lucide-react"
import { toast } from "sonner"
import { ComparisonView } from "@/components/ComparisonView"

export function ResultCard({ result, className }: ResultCardProps) {
    const isAI = result.label === "AI"
    const [showComparison, setShowComparison] = React.useState(false)

    const handleShare = () => {
        // In a real app, this would generate a shareable link
        const textToShare = `Authenticity Check Result: ${result.label} (${result.confidence.toFixed(1)}% confidence)`
        navigator.clipboard.writeText(textToShare)
        toast.success("Result copied to clipboard!")
    }

    const detectedSignals = [
        ...(result.analysis_details.text_signals || []),
        ...(result.analysis_details.image_signals || []),
        ...(result.analysis_details.video_signals || []),
    ]

    return (
        <div className="space-y-6">
            <Card className={cn("overflow-hidden border-2", isAI ? "border-red-500/20" : "border-green-500/20", className)}>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {isAI ? (
                                <Bot className="h-6 w-6 text-red-500" />
                            ) : (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                            )}
                            <CardTitle className={cn("text-xl", isAI ? "text-red-500" : "text-green-500")}>
                                {result.label === "AI" ? "AI-Generated" : "Human / Real"}
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            {result.model_hint && (
                                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                                    Hint: {result.model_hint}
                                </span>
                            )}
                            <Button variant="ghost" size="icon" onClick={handleShare} title="Share Result">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <CardDescription>
                        Analysis completed successfully
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <ConfidenceMeter score={result.confidence} label={result.label} />

                    <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-sm leading-relaxed text-foreground">
                            {result.explanation}
                        </p>
                    </div>

                    {/* Signals Section */}
                    {detectedSignals.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-muted-foreground">Detected Signals</h4>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 text-xs"
                                    onClick={() => setShowComparison(!showComparison)}
                                >
                                    {showComparison ? (
                                        <>
                                            <EyeOff className="mr-2 h-3 w-3" />
                                            Hide Details
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="mr-2 h-3 w-3" />
                                            View Details
                                        </>
                                    )}
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {detectedSignals.map((signal, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center rounded-md border border-input bg-background px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    >
                                        {signal.replace(/_/g, " ")}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {showComparison && (
                <ComparisonView
                    originalContent="Content preview not available in this view mode."
                    detectedSignals={detectedSignals}
                    type="text" // Defaulting to text for now, should be dynamic
                />
            )}
        </div>
    )
}
