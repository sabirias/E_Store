"use client";
import React from "react";
import useWishlistStore from "../../lib/store/wishlist";
import ProductCard from "../../components/products/ProductCard";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
