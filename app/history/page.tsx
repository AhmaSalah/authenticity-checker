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
    const itemsPerPage = 10

    React.useEffect(() => {
        const storedHistory = localStorage.getItem("history")
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory))
        }
    }, [])

    const totalPages = Math.ceil(history.length / itemsPerPage)
    const currentItems = history.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleClearHistory = () => {
        localStorage.removeItem("history")
        setHistory([])
        setShowClearDialog(false)
        toast.success("History cleared successfully")
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Analysis History</h1>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowClearDialog(true)}
                    disabled={history.length === 0}
                    className="gap-2"
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
