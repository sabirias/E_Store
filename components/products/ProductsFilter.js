"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

const ProductsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
    { id: "electronics", name: "Electronics", count: 0 },
    { id: "clothing", name: "Clothing", count: 0 },
    { id: "books", name: "Books", count: 0 },
    { id: "home-garden", name: "Home & Garden", count: 0 },
  ];

  const brands = [
    { id: "apple", name: "Apple", count: 0 },
    { id: "nike", name: "Nike", count: 0 },
    { id: "sony", name: "Sony", count: 0 },
    { id: "samsung", name: "Samsung", count: 0 },
    { id: "levis", name: "Levi's", count: 0 },
    { id: "ralph-lauren", name: "Ralph Lauren", count: 0 },
    { id: "north-face", name: "The North Face", count: 0 },
    { id: "kitchenaid", name: "KitchenAid", count: 0 },
  ];

  const ratings = [
    { value: "4", label: "4+ Stars" },
    { value: "3", label: "3+ Stars" },
    { value: "2", label: "2+ Stars" },
  ];

  useEffect(() => {
    // Initialize filters from URL params
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const rating = searchParams.get("rating");

    if (category) {
      setSelectedCategories([category]);
    }
    if (minPrice || maxPrice) {
      setPriceRange({ min: minPrice || "", max: maxPrice || "" });
    }
    if (rating) {
      setRatingFilter(rating);
    }
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    // Clear existing filters
    params.delete("category");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("rating");
    params.delete("brand");
    params.set("page", "1"); // Reset to first page

    // Apply new filters
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories[0]); // Single category for now
    }
    if (priceRange.min) {
      params.set("minPrice", priceRange.min);
    }
    if (priceRange.max) {
      params.set("maxPrice", priceRange.max);
    }
    if (ratingFilter) {
      params.set("rating", ratingFilter);
    }
    if (selectedBrands.length > 0) {
      params.set("brand", selectedBrands.join(","));
    }

    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: "", max: "" });
    setRatingFilter("");

    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("rating");
    params.delete("brand");
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId)
          : [categoryId] // Single selection for now
    );
  };

  const toggleBrand = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange.min ||
    priceRange.max ||
    ratingFilter;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Filter Content */}
      <div className={`lg:block ${isOpen ? "block" : "hidden"}`}>
        <div className="p-4 space-y-6">
          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Active Filters
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Price Range
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Brands
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {brands.map((brand) => (
                <label key={brand.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => toggleBrand(brand.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {brand.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Rating
            </h3>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <label key={rating.value} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={rating.value}
                    checked={ratingFilter === rating.value}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {rating.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={applyFilters}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
