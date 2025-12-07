"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUploader } from "@/components/FileUploader"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function AnalyzePage() {
    const router = useRouter()
    const [isAnalyzing, setIsAnalyzing] = React.useState(false)
    const [textInput, setTextInput] = React.useState("")
    const [files, setFiles] = React.useState<File[]>([])

    const handleAnalyze = React.useCallback(async (type: "text" | "file") => {
        if (type === "text" && textInput.length < 50) {
            toast.error("Text must be at least 50 characters")
            return
        }
        if (type === "file" && files.length === 0) {
            toast.error("Please select at least one file")
            return
        }

        setIsAnalyzing(true)

        // Determine API URL based on environment config
        const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true"
        const apiUrl = useMock ? "/api/detect" : (process.env.NEXT_PUBLIC_API_URL || "/api/detect")

        try {
            const content = type === "text" ? textInput : "file_content_placeholder"

            // For real implementation, you would loop through files or send them as FormData
            // Here we simulate analyzing the first file or text
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type,
                    content,
                    fileName: type === "file" ? files[0]?.name : undefined
                }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            // Store result in localStorage for the results page (simple state management)
            if (typeof window !== "undefined") {
                try {
                    localStorage.setItem("lastResult", JSON.stringify(result))

                    // Add to history
                    // Generate truly unique ID using timestamp, random string, and performance.now for extra uniqueness
                    const uniqueId = `${Date.now()}-${performance.now()}-${Math.random().toString(36).substring(2, 11)}`
                    const historyItem = {
                        ...result,
                        id: uniqueId,
                        timestamp: Date.now(),
                        type: type === "text" ? "text" : files[0]?.type.startsWith("image") ? "image" : "video",
                        preview: type === "text" ? textInput.slice(0, 50) + "..." : `${files.length} file(s): ${files[0]?.name}...`,
                    }

                    const history = JSON.parse(localStorage.getItem("history") || "[]")
                    localStorage.setItem("history", JSON.stringify([historyItem, ...history]))
                } catch (error) {
                    console.error("Error saving to localStorage:", error)
                }
            }

            toast.success("Analysis complete!")
            router.push("/results")
        } catch (error) {
            console.error("Analysis failed:", error)
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
            toast.error(`Analysis failed: ${errorMessage}`)
        } finally {
            setIsAnalyzing(false)
        }
    }, [textInput, files])

    return (
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div className="text-center space-y-2 px-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Analyze Content</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Upload files or paste text to check for AI generation.
                </p>
            </div>

            <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text">Text Analysis</TabsTrigger>
                    <TabsTrigger value="file">File Upload</TabsTrigger>
                </TabsList>

                <TabsContent value="text">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paste Text</CardTitle>
                            <CardDescription>
                                Analyze articles, essays, or social media posts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="text-input">Content</Label>
                                <Textarea
                                    id="text-input"
                                    placeholder="Paste your text here (min 50 characters)..."
                                    className="min-h-[200px]"
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                />
                            </div>
                            <Button
                                className="w-full"
                                disabled={textInput.length < 50 || isAnalyzing}
                                onClick={() => handleAnalyze("text")}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    "Analyze Text"
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="file">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Files</CardTitle>
                            <CardDescription>
                                Support for Images (JPG, PNG) and Videos (MP4). Max 5 files.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FileUploader
                                onFilesSelected={setFiles}
                                maxFiles={5}
                                accept={{
                                    "image/*": [".png", ".jpg", ".jpeg", ".webp"],
                                    "video/*": [".mp4", ".webm"],
                                }}
                            />
                            <Button
                                className="w-full"
                                disabled={files.length === 0 || isAnalyzing}
                                onClick={() => handleAnalyze("file")}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing ({files.length} files)...
                                    </>
                                ) : (
                                    `Analyze ${files.length > 0 ? `${files.length} File(s)` : "Files"}`
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
