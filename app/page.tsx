import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Zap, Lock, History } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12 text-center md:py-24">
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          v1.0 Now Available
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Detect AI Content with Confidence
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Analyze text, images, and videos to distinguish between human-created and AI-generated content. Fast, accurate, and privacy-focused.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link href="/analyze">
            <Button size="lg" className="h-12 px-8 text-base">
              Start Analysis
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-5xl w-full pt-12">
        <FeatureCard
          icon={<Zap className="h-10 w-10 text-yellow-500" />}
          title="Instant Analysis"
          description="Get results in seconds with our optimized detection engine."
        />
        <FeatureCard
          icon={<ShieldCheck className="h-10 w-10 text-blue-500" />}
          title="High Accuracy"
          description="Powered by advanced multi-modal models for reliable detection."
        />
        <FeatureCard
          icon={<Lock className="h-10 w-10 text-green-500" />}
          title="Privacy First"
          description="Your content is analyzed securely and never used for training."
        />
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="rounded-full bg-secondary/50 p-4">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
