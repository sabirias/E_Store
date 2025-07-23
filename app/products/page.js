import { Suspense } from "react";
import ProductsList from "../../components/products/ProductsList";
import ProductsFilter from "../../components/products/ProductsFilter";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export const metadata = {
  title: "Products - E-Store",
  description:
    "Browse our wide selection of products across electronics, clothing, books, and home & garden categories.",
  keywords: "products, electronics, clothing, books, home & garden, shopping",
};

export default function ProductsPage({ searchParams }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing products at great prices
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductsFilter />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <Suspense fallback={<LoadingSpinner size="lg" />}>
              <ProductsList searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
