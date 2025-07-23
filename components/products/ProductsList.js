"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../ui/LoadingSpinner";

const ProductsList = ({ searchParams }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [viewMode, setViewMode] = useState("grid");
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParamsHook);
        const response = await fetch(`/api/products?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products || []);
        setPagination(data.pagination || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParamsHook]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParamsHook);
    params.set("page", page);
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (sortBy, sortOrder) => {
    const params = new URLSearchParams(searchParamsHook);
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1"); // Reset to first page
    router.push(`/products?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading products: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
        <p className="text-gray-400">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
          {Math.min(
            pagination.currentPage * pagination.limit,
            pagination.totalProducts
          )}{" "}
          of {pagination.totalProducts} products
        </div>

        {/* View Mode and Sort */}
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split("-");
              handleSortChange(sortBy, sortOrder);
            }}
            value={`${searchParamsHook.get("sortBy") || "createdAt"}-${
              searchParamsHook.get("sortOrder") || "desc"
            }`}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="rating.average-desc">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProductCard product={product} viewMode={viewMode} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8">
          <nav className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((page) => {
                const current = pagination.currentPage;
                const total = pagination.totalPages;
                return (
                  page === 1 ||
                  page === total ||
                  (page >= current - 1 && page <= current + 1)
                );
              })
              .map((page, index, array) => (
                <div key={page} className="flex items-center">
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 text-gray-500">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
                      page === pagination.currentPage
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {page}
                  </button>
                </div>
              ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
