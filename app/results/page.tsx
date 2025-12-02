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
        const storedResult = localStorage.getItem("lastResult")
        if (storedResult) {
            setResult(JSON.parse(storedResult))
        } else {
            router.push("/analyze")
        }
    }, [router])

    if (!result) {
        return null
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/analyze">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Analyze
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Analysis Results</h1>
                <div className="w-[100px]" /> {/* Spacer for centering */}
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
