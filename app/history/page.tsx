"use client"

import * as React from "react"
import { HistoryList } from "@/components/HistoryList"
import { HistoryItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function HistoryPage() {
    const [history, setHistory] = React.useState<HistoryItem[]>([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [showClearDialog, setShowClearDialog] = React.useState(false)
    const [deletedItem, setDeletedItem] = React.useState<HistoryItem | null>(null)
    const undoTimerRef = React.useRef<NodeJS.Timeout | null>(null)
    const toastIdRef = React.useRef<number | string | null>(null)
    const isUndoingRef = React.useRef<boolean>(false)
    const itemsPerPage = 10

    // Load history from localStorage on mount and deduplicate
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const storedHistory = localStorage.getItem("history")
                if (storedHistory) {
                    const parsedHistory = JSON.parse(storedHistory) as HistoryItem[]
                    
                    // Deduplicate by ID to prevent duplicate key errors
                    const seen = new Set<string>()
                    const uniqueHistory = parsedHistory.filter(item => {
                        if (seen.has(item.id)) {
                            console.warn(`Removing duplicate history item: ${item.id}`)
                            return false
                        }
                        seen.add(item.id)
                        return true
                    })

                    // If duplicates were found, save the cleaned version
                    if (uniqueHistory.length !== parsedHistory.length) {
                        localStorage.setItem("history", JSON.stringify(uniqueHistory))
                    }

                    setHistory(uniqueHistory)
                }
            } catch (error) {
                console.error("Error loading history from localStorage:", error)
                localStorage.removeItem("history")
            }
        }
    }, [])

    // Persist history to localStorage whenever it changes
    const persistHistory = React.useCallback((newHistory: HistoryItem[]) => {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem("history", JSON.stringify(newHistory))
            } catch (error) {
                console.error("Error saving history to localStorage:", error)
                toast.error("Failed to save history")
            }
        }
    }, [])

    const totalPages = Math.ceil(history.length / itemsPerPage)
    const currentItems = history.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleDeleteItem = React.useCallback((itemId: string) => {
        setHistory((prevHistory) => {
            const itemToDelete = prevHistory.find(item => item.id === itemId)
            if (!itemToDelete) return prevHistory

            // Remove item from history
            const updatedHistory = prevHistory.filter(item => item.id !== itemId)
            
            // Persist immediately
            persistHistory(updatedHistory)

            // Store deleted item for undo
            setDeletedItem(itemToDelete)

            // Clear any existing undo timer
            if (undoTimerRef.current) {
                clearTimeout(undoTimerRef.current)
                undoTimerRef.current = null
            }

            // Dismiss any existing toast
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current)
            }

            // Show toast with undo option
            const toastId = toast.success("Item deleted", {
                action: {
                    label: "Undo",
                    onClick: () => {
                        // Prevent double execution (React Strict Mode in dev can cause double renders)
                        if (isUndoingRef.current) {
                            return
                        }
                        isUndoingRef.current = true

                        // Clear timer and dismiss toast
                        if (undoTimerRef.current) {
                            clearTimeout(undoTimerRef.current)
                            undoTimerRef.current = null
                        }
                        toast.dismiss(toastId)
                        toastIdRef.current = null

                        // Use functional update to get latest state
                        setHistory((currentHistory) => {
                            // Check if item already exists to prevent duplicates
                            const itemExists = currentHistory.some(h => h.id === itemToDelete.id)
                            if (itemExists) {
                                isUndoingRef.current = false
                                toast.error("Item already exists in history")
                                setDeletedItem(null)
                                return currentHistory
                            }

                            // Restore item to beginning
                            const restoredHistory = [itemToDelete, ...currentHistory]
                            persistHistory(restoredHistory)
                            setDeletedItem(null)
                            setCurrentPage(1)
                            return restoredHistory
                        })

                        // Show success toast once, outside the setState callback
                        toast.success("Item restored")
                        
                        // Reset flag after a short delay to allow state update to complete
                        setTimeout(() => {
                            isUndoingRef.current = false
                        }, 100)
                    },
                },
                duration: 5000,
            })

            toastIdRef.current = toastId

            // Set timer to permanently delete after 5 seconds
            undoTimerRef.current = setTimeout(() => {
                setDeletedItem(null)
                toast.dismiss(toastId)
                toastIdRef.current = null
                undoTimerRef.current = null
            }, 5000)

            // Adjust page if needed
            setCurrentPage((prevPage) => {
                const newTotalPages = Math.ceil(updatedHistory.length / itemsPerPage)
                if (prevPage > newTotalPages && newTotalPages > 0) {
                    return newTotalPages
                }
                return prevPage
            })

            return updatedHistory
        })
    }, [persistHistory, itemsPerPage])

    // Cleanup timers on unmount
    React.useEffect(() => {
        return () => {
            if (undoTimerRef.current) {
                clearTimeout(undoTimerRef.current)
            }
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current)
            }
        }
    }, [])

    const handleClearHistory = () => {
        if (typeof window !== "undefined") {
            try {
                localStorage.removeItem("history")
                setHistory([])
                setShowClearDialog(false)
                // Clear any pending undo
                if (undoTimerRef.current) {
                    clearTimeout(undoTimerRef.current)
                    undoTimerRef.current = null
                }
                if (toastIdRef.current) {
                    toast.dismiss(toastIdRef.current)
                    toastIdRef.current = null
                }
                setDeletedItem(null)
                toast.success("History cleared successfully")
            } catch (error) {
                console.error("Error clearing history:", error)
                toast.error("Failed to clear history")
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">Analysis History</h1>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowClearDialog(true)}
                    disabled={history.length === 0}
                    className="gap-2 w-full sm:w-auto"
                >
                    <Trash2 className="h-4 w-4" />
                    Clear History
                </Button>
            </div>

            {history.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground">No analysis history found.</p>
                </div>
            ) : (
                <HistoryList
                    items={currentItems}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    onDeleteItem={handleDeleteItem}
                />
            )}

            <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Clear History</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to clear all analysis history? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowClearDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleClearHistory}>
                            Clear All
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
