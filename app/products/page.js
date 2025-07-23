import ProductsFilter from "../../components/products/ProductsFilter";
import ProductsList from "../../components/products/ProductsList";

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
          <div className="lg:w-1/4">
            <ProductsFilter searchParams={searchParams} />
          </div>
          <div className="lg:w-3/4">
            <ProductsList searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
