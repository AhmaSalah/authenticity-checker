"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export default function FAQPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 px-4">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                        <HelpCircle className="h-8 w-8 text-primary" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Find answers to common questions about our AI detection technology, privacy policies, and usage limits.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>General</CardTitle>
                    <CardDescription>Basic information about the Authenticity Checker.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is Authenticity Checker?</AccordionTrigger>
                            <AccordionContent>
                                Authenticity Checker is an advanced tool designed to detect AI-generated content in text, images, and videos. It uses state-of-the-art machine learning models to analyze patterns and artifacts that are characteristic of AI generation.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it free to use?</AccordionTrigger>
                            <AccordionContent>
                                Yes, the basic version is free to use for individual users. We also offer premium plans for businesses and high-volume users requiring API access and advanced features.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How accurate is the detection?</AccordionTrigger>
                            <AccordionContent>
                                Our models are trained on vast datasets and achieve high accuracy rates (typically over 95%). However, like all AI detection tools, false positives and negatives can occur. We recommend using the results as one of several indicators rather than definitive proof.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Technical & Limits</CardTitle>
                    <CardDescription>File sizes, formats, and API usage.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-4">
                            <AccordionTrigger>What file formats are supported?</AccordionTrigger>
                            <AccordionContent>
                                We support a wide range of formats including JPG, PNG, WEBP for images; MP4, WEBM for videos; and TXT, MD, JSON for text files.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>What are the file size limits?</AccordionTrigger>
                            <AccordionContent>
                                Currently, we support images up to 10MB, videos up to 50MB, and text files up to 200KB.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger>Do you offer an API?</AccordionTrigger>
                            <AccordionContent>
                                Yes, we provide a robust REST API for developers. Please contact our sales team or check the documentation for integration details.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>How we handle your data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-7">
                            <AccordionTrigger>Is my data stored?</AccordionTrigger>
                            <AccordionContent>
                                We prioritize your privacy. Uploaded files are processed in memory and are not permanently stored on our servers unless you explicitly opt-in for data contribution to improve our models.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-8">
                            <AccordionTrigger>Can I delete my history?</AccordionTrigger>
                            <AccordionContent>
                                Yes, you have full control over your analysis history. You can clear your local history at any time from the History page or your Profile settings.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
