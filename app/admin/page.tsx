"use client"

import * as React from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import { Activity, Users, FileCheck, Bot, UserCheck } from "lucide-react"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function AdminPage() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const [stats, setStats] = React.useState({
        totalScans: 1248,
        aiDetected: 432,
        humanVerified: 816,
        activeUsers: 156
    })
    const [selectedScan, setSelectedScan] = React.useState<{
        id: string
        type: string
        status: string
        confidence: string
        timestamp: string
    } | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, router])

    const handleViewDetails = React.useCallback((scan: {
        id: string
        type: string
        status: string
        confidence: string
        timestamp: string
    }) => {
        setSelectedScan(scan)
        setIsDetailsOpen(true)
    }, [])

    if (!isAuthenticated) return null

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground text-sm sm:text-base mt-1">
                        Overview of system performance and detection statistics.
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="px-3 py-1">
                        v1.0.0
                    </Badge>
                    <Badge className="bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30">
                        System Healthy
                    </Badge>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalScans.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Detected</CardTitle>
                        <Bot className="h-4 w-4 text-red-500 dark:text-red-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.aiDetected.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            34.6% detection rate
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Human Verified</CardTitle>
                        <UserCheck className="h-4 w-4 text-green-500 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.humanVerified.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            65.4% verification rate
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            +12 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                        Latest scans and their results.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Confidence</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3, 4, 5].map((i) => {
                                const scan = {
                                    id: Math.random().toString(36).substring(2, 11),
                                    type: i % 2 === 0 ? "Image" : "Text",
                                    status: i % 3 === 0 ? "AI Generated" : "Human",
                                    confidence: (85 + Math.random() * 14).toFixed(1),
                                    timestamp: new Date().toISOString()
                                }
                                return (
                                    <TableRow key={i}>
                                        <TableCell className="font-mono text-xs">
                                            {scan.id}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <FileCheck className="h-4 w-4 text-muted-foreground" />
                                                <span className="capitalize">{scan.type}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={scan.status === "AI Generated" ? "destructive" : "secondary"}>
                                                {scan.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{scan.confidence}%</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleViewDetails(scan)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Scan Details</DialogTitle>
                        <DialogDescription>
                            Detailed analysis results for ID: {selectedScan?.id}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedScan && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                                    <p>{selectedScan.type}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <Badge variant={selectedScan.status === "AI Generated" ? "destructive" : "secondary"}>
                                        {selectedScan.status}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                                    <p>{selectedScan.confidence}%</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                                    <p>{new Date(selectedScan.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="rounded-md bg-muted p-4">
                                <p className="text-sm font-mono text-muted-foreground">
                                    Analysis Metadata:
                                    <br />
                                    Model: v2.4.1
                                    <br />
                                    Processing Time: 1.2s
                                    <br />
                                    Flags: None
                                </p>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
