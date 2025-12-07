"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, FileText, Image as ImageIcon, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface FileUploaderProps {
    onFilesSelected: (files: File[]) => void
    maxFiles?: number
    accept?: Record<string, string[]>
}

export function FileUploader({
    onFilesSelected,
    maxFiles = 5,
    accept = {
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
        "text/*": [".txt", ".md", ".json"],
        "video/*": [".mp4", ".webm"],
    },
}: FileUploaderProps) {
    const [files, setFiles] = React.useState<File[]>([])
    const [objectUrls, setObjectUrls] = React.useState<Map<File, string>>(new Map())

    const validateFile = React.useCallback((file: File) => {
        const isImage = file.type.startsWith("image/")
        const isVideo = file.type.startsWith("video/")
        const isText = file.type.startsWith("text/") || file.name.endsWith(".md") || file.name.endsWith(".json")

        if (isImage && file.size > 10 * 1024 * 1024) {
            toast.error(`${file.name} exceeds 10MB limit`)
            return false
        }
        if (isVideo && file.size > 50 * 1024 * 1024) {
            toast.error(`${file.name} exceeds 50MB limit`)
            return false
        }
        if (isText && file.size > 200 * 1024) {
            toast.error(`${file.name} exceeds 200KB limit`)
            return false
        }
        return true
    }, [])

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const validFiles = acceptedFiles.filter(validateFile)

            if (validFiles.length === 0) {
                return
            }

            // Update local state first
            setFiles((prev) => {
                return [...prev, ...validFiles].slice(0, maxFiles)
            })

            toast.success(`Added ${validFiles.length} file(s)`)
        },
        [maxFiles, validateFile]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles,
        accept,
    })

    const removeFile = React.useCallback((e: React.MouseEvent, index: number) => {
        e.stopPropagation()
        const newFiles = [...files]
        const removedFile = newFiles[index]
        newFiles.splice(index, 1)
        
        setFiles(newFiles)
        
        // Clean up object URL if it exists
        if (removedFile) {
            const objectUrl = objectUrls.get(removedFile)
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl)
                setObjectUrls(prev => {
                    const newMap = new Map(prev)
                    newMap.delete(removedFile)
                    return newMap
                })
            }
        }
    }, [files, objectUrls])

    // Sync files with parent component whenever files change
    React.useEffect(() => {
        onFilesSelected(files)
    }, [files, onFilesSelected])

    // Cleanup object URLs on unmount
    React.useEffect(() => {
        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url))
        }
    }, [objectUrls])

    const getFileIcon = React.useCallback((file: File) => {
        if (file.type.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
        if (file.type.startsWith("video/")) return <Film className="h-8 w-8 text-purple-500 dark:text-purple-400" />
        return <FileText className="h-8 w-8 text-orange-500 dark:text-orange-400" />
    }, [])


    return (
        <div className="w-full space-y-4">
            <div
                {...getRootProps()}
                className={cn(
                    "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-6 transition-all hover:bg-muted hover:border-primary/50",
                    isDragActive && "border-primary bg-primary/5 scale-[0.99]"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className={cn(
                        "rounded-full bg-background p-4 shadow-sm transition-transform duration-300",
                        isDragActive ? "scale-110" : ""
                    )}>
                        <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium">
                            {isDragActive ? "Drop files here" : "Drag & drop files here"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Max 10MB (Img), 50MB (Vid), 200KB (Text)
                        </p>
                    </div>
                </div>
            </div>

            {files.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {files.map((file, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={`${file.name}-${index}`}
                            className="relative flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm group"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted/50">
                                {file.type.startsWith("image/") ? (
                                    (() => {
                                        let objectUrl = objectUrls.get(file)
                                        if (!objectUrl) {
                                            objectUrl = URL.createObjectURL(file)
                                            setObjectUrls(prev => {
                                                const newMap = new Map(prev)
                                                newMap.set(file, objectUrl!)
                                                return newMap
                                            })
                                        }
                                        return (
                                            <img
                                                src={objectUrl}
                                                alt="preview"
                                                className="h-full w-full object-cover rounded-md"
                                            />
                                        )
                                    })()
                                ) : (
                                    getFileIcon(file)
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => removeFile(e, index)}
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove file</span>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
