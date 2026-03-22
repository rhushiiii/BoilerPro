import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "For validating your first SaaS idea.",
    features: ["Landing + auth pages", "Dashboard skeleton", "Tailwind + UI primitives"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$49",
    description: "For fast-growing teams shipping weekly.",
    features: ["Everything in Starter", "Priority support", "Advanced component patterns"],
    cta: "Start Pro Trial",
  },
  {
    name: "Scale",
    price: "$199",
    description: "For companies with larger workloads.",
    features: ["Everything in Pro", "Architecture support", "Integration guidance"],
    cta: "Contact Sales",
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Pricing</h1>
        <p className="text-muted-foreground">
          Transparent plans for every stage, from MVP to scale.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.name === "Pro" ? "border-primary shadow-sm" : undefined}>
            <CardHeader className="space-y-3">
              <CardTitle className="flex items-center justify-between text-xl">
                {plan.name}
                {plan.name === "Pro" ? (
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Popular
                  </span>
                ) : null}
              </CardTitle>
              <div>
                <p className="text-3xl font-bold">{plan.price}</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.name === "Pro" ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
