"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { debounce } from "../../lib/utils/format";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  // Memoized debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(searchQuery)}&limit=5`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.products || []);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    router.push(`/products/${suggestion._id}`);
    setQuery("");
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (query.length > 0 || suggestions.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              {/* Ensure you have a spinner class in your global CSS or replace with a spinner component */}
              <div className="spinner mx-auto mb-2"></div>
              Searching...
            </div>
          ) : suggestions.length > 0 ? (
            <div>
              {suggestions.map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleSuggestionClick(product)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <Image
                    src={
                      product.images && product.images[0]
                        ? product.images[0]
                        : "/default-product.png"
                    }
                    alt={product.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded"
                    unoptimized={
                      product.images &&
                      product.images[0] &&
                      product.images[0].startsWith("http")
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ${product.price}
                    </p>
                  </div>
                </button>
              ))}
              <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={handleSearch}
                  className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-center py-1"
                >
                  View all results for "{query}"
                </button>
              </div>
            </div>
          ) : query.length > 1 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No products found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
