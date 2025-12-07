"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Lock, Eye, CheckCircle, Server } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="space-y-12 md:space-y-16 pb-8 px-4">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12 md:py-20 bg-gradient-to-b from-background to-secondary/20 rounded-3xl">
                <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4 animate-in zoom-in duration-500">
                        <Shield className="h-12 w-12 text-primary" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Trust in the Digital Age
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                    We empower individuals and organizations to verify the authenticity of digital content with state-of-the-art AI detection technology.
                </p>
            </section>

            {/* Mission Section */}
            <section className="container max-w-5xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            In an era where generative AI is reshaping how content is created, distinguishing between human and machine-generated media has never been more critical.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Our mission is to provide accessible, transparent, and accurate tools that help restore trust in digital media. We believe everyone deserves to know the origin of the content they consume.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <Card className="bg-secondary/50 border-none">
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <Zap className="h-6 w-6 text-yellow-500" />
                                <CardTitle className="text-lg">Fast & Accurate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Real-time analysis with industry-leading accuracy rates.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-secondary/50 border-none">
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <Lock className="h-6 w-6 text-blue-500" />
                                <CardTitle className="text-lg">Secure & Private</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Your data is processed securely and never shared without consent.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-secondary/50 border-none">
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <Eye className="h-6 w-6 text-green-500" />
                                <CardTitle className="text-lg">Transparent</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Clear, explainable results that help you understand the "why".</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="container max-w-5xl mx-auto px-4 space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold">How It Works</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our multi-modal detection system analyzes content layers to find artifacts invisible to the human eye.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center space-y-4 p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">1</span>
                        </div>
                        <h3 className="text-xl font-semibold">Upload</h3>
                        <p className="text-muted-foreground">
                            Drag and drop your text, image, or video files. We support batch processing for efficiency.
                        </p>
                    </div>
                    <div className="text-center space-y-4 p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">2</span>
                        </div>
                        <h3 className="text-xl font-semibold">Analyze</h3>
                        <p className="text-muted-foreground">
                            Our AI models scan for linguistic patterns, noise artifacts, and temporal inconsistencies.
                        </p>
                    </div>
                    <div className="text-center space-y-4 p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">3</span>
                        </div>
                        <h3 className="text-xl font-semibold">Verify</h3>
                        <p className="text-muted-foreground">
                            Get a detailed report with a confidence score and highlighted signals of AI generation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="container max-w-4xl mx-auto px-4 py-12 bg-secondary/30 rounded-3xl text-center space-y-8">
                <h2 className="text-2xl font-bold">Trusted Technology</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <Server className="h-8 w-8 text-muted-foreground" />
                        <span className="font-medium">99.9% Uptime</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <CheckCircle className="h-8 w-8 text-muted-foreground" />
                        <span className="font-medium">95%+ Accuracy</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Lock className="h-8 w-8 text-muted-foreground" />
                        <span className="font-medium">End-to-End Encrypted</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Zap className="h-8 w-8 text-muted-foreground" />
                        <span className="font-medium">&lt;2s Processing</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
