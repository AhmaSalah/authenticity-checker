"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 px-4">
            <div className="space-y-4">
                <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                    404
                </h1>
                <h2 className="text-3xl font-bold">Page Not Found</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                </p>
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
                <Button onClick={() => window.history.back()} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>
                <Button asChild>
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>

            <div className="pt-8 border-t w-full max-w-md">
                <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                    <Link href="/analyze" className="text-primary hover:underline">
                        Analyze Content
                    </Link>
                    <Link href="/about" className="text-primary hover:underline">
                        About
                    </Link>
                    <Link href="/contact" className="text-primary hover:underline">
                        Contact
                    </Link>
                    <Link href="/faq" className="text-primary hover:underline">
                        FAQ
                    </Link>
                </div>
            </div>
        </div>
    )
}
