import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  "Next.js 14 App Router architecture",
  "Pre-wired Tailwind and shadcn-style UI",
  "Marketing, auth, and dashboard route groups",
  "Scalable folder structure for SaaS growth",
];

export default function LandingPage() {
  return (
    <div className="space-y-16">
      <section className="bg-grid relative overflow-hidden rounded-2xl border p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="relative max-w-3xl space-y-6">
          <span className="inline-flex rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            Next.js 14 SaaS Starter
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Ship your SaaS faster with a production-ready foundation.
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            BoilerPro gives you a clean architecture, responsive layouts, and reusable UI building blocks so you can focus on product, not setup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/signup">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                {feature}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Structured defaults that are easy to customize as your SaaS evolves.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
