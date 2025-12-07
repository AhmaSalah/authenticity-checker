"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ComparisonViewProps {
    originalContent: string | React.ReactNode
    detectedSignals: string[]
    type: "text" | "image" | "video"
}

export function ComparisonView({ originalContent, detectedSignals, type }: ComparisonViewProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">Original Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md bg-muted/50 p-4 min-h-[200px] max-h-[400px] overflow-auto">
                            {type === "text" ? (
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {originalContent}
                                </p>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-muted-foreground italic">
                                        {type === "image" ? "Image Preview" : "Video Preview"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="h-full border-primary/20 bg-primary/5 dark:bg-primary/10 dark:border-primary/30">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">Detected Signals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {detectedSignals.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {detectedSignals.map((signal, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="bg-background/50 dark:bg-background/80 border-primary/30 dark:border-primary/50 text-primary dark:text-primary px-3 py-1"
                                        >
                                            {signal}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">
                                    No specific signals detected.
                                </p>
                            )}

                            <div className="mt-6 p-4 rounded-md bg-background/50 border border-primary/10">
                                <h4 className="text-sm font-semibold mb-2">Analysis Summary</h4>
                                <p className="text-sm text-muted-foreground">
                                    The model identified {detectedSignals.length} potential indicators of AI generation in this content.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
