import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "../../../components/products/ProductDetail";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/products/${id}`
    );

    if (!response.ok) {
      return {
        title: "Product Not Found - E-Store",
        description: "The requested product could not be found.",
      };
    }

    const product = await response.json();

    return {
      title: `${product.name} - E-Store`,
      description: product.description,
      keywords: product.tags?.join(", ") || "",
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.images,
        type: "website", // changed from "product" to "website"
      },
    };
  } catch (_error) {
    return {
      title: "Product - E-Store",
      description: "Product details",
    };
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/products/${id}`
    );

    if (!response.ok) {
      notFound();
    }

    const product = await response.json();

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={<LoadingSpinner size="lg" />}>
            <ProductDetail product={product} />
          </Suspense>
        </div>
      </div>
    );
  } catch (_error) {
    console.error("Error fetching product:", _error);
    notFound();
  }
}
