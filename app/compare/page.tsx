import type { Metadata } from "next";
import { products } from "@/app/lib/products";
import CompareView from "@/app/components/Compareview";

export const metadata: Metadata = {
  title: "Compare models — Inokim 2026",
  description:
    "Side-by-side comparison of the 2026 Inokim lineup. Pick up to four scooters and compare specs, pricing, and B2B logistics.",
};

interface PageProps {
  searchParams: Promise<{ models?: string }>;
}

export default async function ComparePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const initialSlugs = sp.models?.split(",").filter(Boolean) ?? [];

  return <CompareView products={products} initialSlugs={initialSlugs} />;
}