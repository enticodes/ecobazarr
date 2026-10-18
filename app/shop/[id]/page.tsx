import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { ProductDetailView } from "@/components/shop";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return {
      title: "Product Not Found | Ecobazar",
      description: "The requested organic product could not be found.",
    };
  }

  return {
    title: `${product.name} - Ecobazar Organic Shop`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading product details...
        </div>
      }
    >
      <ProductDetailView productId={id} />
    </Suspense>
  );
}
