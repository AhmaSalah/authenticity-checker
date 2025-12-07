"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ResultCard } from "@/components/ResultCard"
import { DetectionResult } from "@/types"
import { ArrowLeft, RotateCcw } from "lucide-react"

export default function ResultsPage() {
    const router = useRouter()
    const [result, setResult] = React.useState<DetectionResult | null>(null)

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const storedResult = localStorage.getItem("lastResult")
                if (storedResult) {
                    setResult(JSON.parse(storedResult))
                } else {
                    router.push("/analyze")
                }
            } catch (error) {
                console.error("Error loading result from localStorage:", error)
                router.push("/analyze")
            }
        }
    }, [router])

    if (!result) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <p className="text-muted-foreground">Loading results...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Link href="/analyze">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Analyze
                    </Button>
                </Link>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">Analysis Results</h1>
            </div>

            <ResultCard result={result} />

            <div className="flex justify-center gap-4">
                <Link href="/analyze">
                    <Button size="lg" className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Analyze Another
                    </Button>
                </Link>
                <Link href="/history">
                    <Button variant="outline" size="lg">
                        View History
                    </Button>
                </Link>
            </div>
        </div>
    )
}
