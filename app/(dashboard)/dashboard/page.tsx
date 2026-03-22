import { Activity, CreditCard, Users } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  {
    title: "Active users",
    value: "2,341",
    description: "+18% from last month",
    icon: Users,
  },
  {
    title: "Monthly revenue",
    value: "$18,420",
    description: "+9% from last month",
    icon: CreditCard,
  },
  {
    title: "API requests",
    value: "8.9M",
    description: "99.98% success rate",
    icon: Activity,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">Your product pulse at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <CardDescription>{metric.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Replace this starter content with your real product data, auth state, and business logic.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
