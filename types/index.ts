export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export type MetricCard = {
  title: string;
  value: string;
  description: string;
};

export type { Database, Inserts, Json, Tables, Updates } from "@/types/database";
