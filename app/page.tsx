import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Zap, Lock, TrendingUp, CheckCircle2, BarChart3, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-8 py-16 md:py-24 lg:py-32 text-center px-4">
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:border-primary/30">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            v1.0 Now Available
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-foreground via-blue-500/70 dark:via-blue-400/80 to-foreground bg-clip-text text-transparent">
              Detect AI Content
            </span>
            <br />
            <span className="text-foreground">with Confidence</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground leading-relaxed">
            Analyze text, images, and videos to distinguish between human-created and AI-generated content. 
            Fast, accurate, and privacy-focused detection powered by state-of-the-art machine learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/analyze">
              <Button size="lg" className="h-12 px-8 text-base group">
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Powerful features designed to help you verify content authenticity
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Instant Analysis"
              description="Get results in seconds with our optimized detection engine. No waiting, no delays."
              color="text-yellow-500 dark:text-yellow-400"
              bgColor="bg-yellow-500/10 dark:bg-yellow-500/20"
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="High Accuracy"
              description="Powered by advanced multi-modal models achieving 95%+ accuracy rates."
              color="text-blue-500 dark:text-blue-400"
              bgColor="bg-blue-500/10 dark:bg-blue-500/20"
            />
            <FeatureCard
              icon={<Lock className="h-6 w-6" />}
              title="Privacy First"
              description="Your content is analyzed securely and never used for training. Your data stays yours."
              color="text-green-500 dark:text-green-400"
              bgColor="bg-green-500/10 dark:bg-green-500/20"
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Multi-Modal Support"
              description="Analyze text, images, and videos all in one platform. Comprehensive detection across formats."
              color="text-purple-500 dark:text-purple-400"
              bgColor="bg-purple-500/10 dark:bg-purple-500/20"
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Detailed Reports"
              description="Get comprehensive analysis with confidence scores and detailed explanations."
              color="text-orange-500 dark:text-orange-400"
              bgColor="bg-orange-500/10 dark:bg-orange-500/20"
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Easy to Use"
              description="Intuitive interface that makes content verification simple for everyone."
              color="text-pink-500 dark:text-pink-400"
              bgColor="bg-pink-500/10 dark:bg-pink-500/20"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/30 dark:bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">95%+</div>
              <div className="text-sm md:text-base text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">&lt;2s</div>
              <div className="text-sm md:text-base text-muted-foreground">Processing Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">100K+</div>
              <div className="text-sm md:text-base text-muted-foreground">Analyses Done</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm md:text-base text-muted-foreground">Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  bgColor,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  bgColor: string
}) {
  return (
    <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10">
      <CardContent className="p-6 space-y-4">
        <div className={`rounded-lg ${bgColor} w-12 h-12 flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
