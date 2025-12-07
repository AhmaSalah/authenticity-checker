"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ConfidenceMeterProps {
    score: number // 0-100
    label: "AI" | "Real"
    className?: string
}

export function ConfidenceMeter({ score, label, className }: ConfidenceMeterProps) {
    // Determine color based on label and score
    // If AI and high score -> Red/Warning
    // If Real and high score -> Green/Success
    // If unsure (around 50%) -> Yellow/Warning

    const getColor = () => {
        if (label === "AI") {
            return score > 80 ? "bg-red-500 dark:bg-red-600" : "bg-orange-500 dark:bg-orange-600"
        }
        return score > 80 ? "bg-green-500 dark:bg-green-600" : "bg-blue-500 dark:bg-blue-600"
    }

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-end justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                    Confidence
                </span>
                <span className="text-2xl font-bold">
                    {score.toFixed(1)}%
                </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                <div
                    className={cn("h-full transition-all duration-1000 ease-out", getColor())}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    )
}
