"use client"

import * as React from "react"
import { HistoryItem } from "@/types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

interface HistoryListProps {
    items: HistoryItem[]
    onPageChange: (page: number) => void
    currentPage: number
    totalPages: number
    onDeleteItem?: (itemId: string) => void
}

export function HistoryList({
    items,
    onPageChange,
    currentPage,
    totalPages,
    onDeleteItem,
}: HistoryListProps) {
    const [searchQuery, setSearchQuery] = React.useState("")

    // Filter items based on search query and ensure unique keys
    const filteredItems = React.useMemo(() => {
        let result = items

        // Apply search filter if query exists
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = items.filter(item =>
                item.preview.toLowerCase().includes(query) ||
                item.type.toLowerCase().includes(query) ||
                item.label.toLowerCase().includes(query)
            )
        }

        // Deduplicate by ID to prevent duplicate key errors
        const seen = new Set<string>()
        return result.filter(item => {
            if (seen.has(item.id)) {
                console.warn(`Duplicate history item ID detected: ${item.id}`)
                return false
            }
            seen.add(item.id)
            return true
        })
    }, [items, searchQuery])

    const handleExportCSV = React.useCallback(() => {
        if (filteredItems.length === 0) {
            toast.error("No items to export")
            return
        }

        try {
            const headers = ["ID", "Type", "Result", "Confidence", "Date", "Preview"]
            const csvContent = [
                headers.join(","),
                ...filteredItems.map(item => [
                    item.id,
                    item.type,
                    item.label,
                    `${item.confidence.toFixed(1)}%`,
                    new Date(item.timestamp).toLocaleDateString(),
                    `"${item.preview.replace(/"/g, '""')}"` // Escape quotes
                ].join(","))
            ].join("\n")

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
            const link = document.createElement("a")
            const url = URL.createObjectURL(blob)
            link.setAttribute("href", url)
            link.setAttribute("download", `authenticity_history_${new Date().toISOString().split('T')[0]}.csv`)
            link.style.visibility = "hidden"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            // Clean up object URL
            setTimeout(() => URL.revokeObjectURL(url), 100)
            toast.success("History exported to CSV")
        } catch (error) {
            console.error("Error exporting CSV:", error)
            toast.error("Failed to export CSV")
        }
    }, [filteredItems])

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Recent Analysis</h2>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search history..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" onClick={handleExportCSV} className="w-full sm:w-auto">
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Preview</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Confidence</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                            {onDeleteItem && <TableHead className="w-[80px]">Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={onDeleteItem ? 6 : 5} className="text-center text-muted-foreground py-8">
                                    No results found
                                </TableCell>
                            </TableRow>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((item) => {
                                    const MotionTableRow = motion(TableRow as React.ComponentType<React.HTMLAttributes<HTMLTableRowElement>>)
                                    return (
                                        <MotionTableRow
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.2 }}
                                            className="transition-colors hover:bg-muted/50"
                                        >
                                            <TableCell className="font-medium capitalize">{item.type}</TableCell>
                                            <TableCell className="max-w-[200px] truncate">
                                                {item.preview}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={item.label === "AI" ? "destructive" : "secondary"}
                                                    className={item.label === "Real" ? "bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:text-green-400" : ""}
                                                >
                                                    {item.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{item.confidence.toFixed(1)}%</TableCell>
                                            <TableCell className="text-right text-muted-foreground">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </TableCell>
                                            {onDeleteItem && (
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                                                        onClick={() => onDeleteItem(item.id)}
                                                        aria-label={`Delete ${item.type} analysis`}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            )}
                                        </MotionTableRow>
                                    )
                                })}
                            </AnimatePresence>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>
                <div className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
